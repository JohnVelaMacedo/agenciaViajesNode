import { Testimoniales } from "../models/Testimoniales.js";
import { Viaje } from "../models/Viaje.js";

const paginaInicio = async (req, res) => {
  try {
    // Consultar 3 viajes del modelo Viaje
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimoniales.findAll({ limit: 3 }));

    const respuesta = await Promise.all(promiseDB);
    const [viajes, testimoniales] = respuesta;
    // const viajes = await Viaje.findAll({ limit: 3 });
    // const testimoniales = await Testimoniales.findAll({ limit: 3 });
    // res.send("Hola Mundo");
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes,
      testimoniales,
    });
  } catch (error) {
    console.error(error);
  }
};

const paginaNosotros = (req, res) => {
  // res.send("Nosotros");
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaContacto = (req, res) => res.render("contacto");

const paginaViajes = async (req, res) => {
  // Consultar BD
  const viajes = await Viaje.findAll();

  res.render("viajes", { pagina: "Próximos Viajes", viajes });
};

const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
    const resultado = await Viaje.findOne({ where: { slug } });
    res.render("viaje", {
      pagina: "Informacion Viaje",
      viaje: resultado,
    });
  } catch (error) {
    console.error(error);
  }
};

const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimoniales.findAll();
    res.render("testimoniales", { pagina: "Testimoniales", testimoniales });
  } catch (error) {
    console.error(error);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaContacto,
  paginaViajes,
  paginaDetalleViaje,
  paginaTestimoniales,
};
