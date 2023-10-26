const { createClient } = require("@redis/client");

let client;

async function connect() {
    client = createClient();
    client.on("error", (err) => {
        console.error("Error en el cliente de Redis:", err);
    });
    await client.connect();
}

async function saveToken(email, token) {
  try {
    client.SETEX(email, 10, token, (err, reply) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`El token se ha guardado en redis: ${reply}`);
      }
    });
    return true;
  } catch (err) {
    console.error("Error al almacenar el token:", err);
    return false;
  }
}

async function getToken(email) {
  try {
    const token = await client.get(email);
    return token;
  } catch (err) {
    console.error("Error al extraer el token:", err);
    return null;
  }
}

async function closeConnection() {
  await client.quit();
}

module.exports = { connect, saveToken, getToken, closeConnection };