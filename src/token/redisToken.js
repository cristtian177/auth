const { createClient } = require("@redis/client");

let client;

async function connect() {
    client = createClient();
    client.on("error", (err) => {
        console.error("Error en el cliente de Redis:", err);
    });
    await client.connect();
}

async function saveToken(email,token) {
    try {
        await client.set(email, token, "EX", 3600);
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
