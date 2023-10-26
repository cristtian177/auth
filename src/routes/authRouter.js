const express = require("express");
const passport = require("passport");
const session = require("express-session");
const router = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.use(express.json());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.use(session({secret: "mysecret",resave: false,cookie: { secure: false },}));
router.use(passport.initialize());
router.use(passport.session());

router.get("/google",passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/google/callback",passport.authenticate("google", {
    successRedirect: "/auth/proteced",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/getusers", async (req, res) => {
  try {
    const users = await prisma.userBicyrent.findMany();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

const {checkToken,checkUser,generateToken,createUser} = require('../functions/functions.auth')

router.get("/proteced", isLoggedIn, async (req, res) => {
  try {

    // Si existe el usuario, genera token y devuelve como respuesta

    const exists = await checkUser(req.user);

    if (exists) {

      // Revisa si hay un token guardado
      console.log("2 - El correo electrónico ya está registrado.");
      const token = await checkToken(req.user);
      if (token) {
        console.log(" ");
        return res.status(200).json({ token: token });
      }

      console.log("2 - Generado Token");
      const newToken = await generateToken(req.user);
      console.log("2 - Token Guardado - Inicio de sesión exitoso");
      console.log(" ");
      return res.status(200).json({ token: newToken });
    }

    // Si no existe el usuario, crea y generar un token 
    const newUser = await createUser(req.user);
    if(newUser){
      // Revisa si hay un token guardado
      const token = await checkToken(req.user);
      if (token) return res.status(200).json({ token: token });
      console.log(" ");
    }
    
    console.log("3 - Generado Token ");
    const newToken = await generateToken(req.user);
    console.log("3 - Usuario creado")
    return  [console.log(" ") ,res.status(200).json( {token: newToken} )]
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

router.get("/google/failure", isLoggedIn, (req, res) => {
  res.send("Something went wrong");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  res.send("See you again");
});

module.exports = router;
