// const express = require("express");
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// Conectar a la base de datos
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set("view engine", "pug");

// Obtener el año actual
app.use((req, res, next) => {
  // console.log(req);
  const year = new Date().getFullYear();
  res.locals.actualYear = year;
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(express.static("public"));

// Agregar router
app.use("/", router);

// app.get("/", (req, res) => {
//   // req, lo que enviamos. res, lo que nos devuelve express
//   res.send("Hola Mundo");
//   // res.render() // Para mostrar una vista
//   // res.json({
//   //   id: "1",
//   // });
// });

// app.get("/nosotros", (req, res) => res.send("Nosotros"));
// app.get("/contacto", (req, res) => res.send("Contacto"));

app.listen(port, () =>
  console.log(`El servidor está funcionando en el puerto ${port}`)
);
