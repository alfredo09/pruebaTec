const express = require('express');
const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades
const api = require('./api');
// Middleware para procesar el cuerpo de las solicitudes JSON
app.use(express.json());

app.use("/api", api);
// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});