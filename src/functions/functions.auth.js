const jwt = require("jsonwebtoken");
const { connect, saveToken,getToken,closeConnection,} = require("../token/redisToken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkToken(user) {

  await connect();
  let resToken = await getToken(user.email);
  await closeConnection();
  console.log(" Recuperado Token: " + resToken);

  return resToken;

}

async function checkUser(user) {

  const existingEmail = await prisma.userBicyrent.findUnique({
    where: { email: user.email },
  });

  return !!existingEmail;

}

async function generateToken(user) {
  //const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: 10});
  const token = jwt.sign(user, 'SecretToken');
  await connect();
  let resToken = await saveToken(user.email, token);
  await closeConnection();

  console.log(" Resultado del almacenamiento:", resToken);

  return token;

}


async function createUser(user) {

  const newUser = await prisma.userBicyrent.create({ data: user });
  console.log(" Ingresando nuevo Usuario");

  return newUser;

}

module.exports ={checkToken,checkUser,generateToken,createUser}