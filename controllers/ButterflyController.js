import ButterflyModel from "../models/ButterflyModel.js";

//GET - Trae todas las mariposas
export const getAllButterflies = async (req, res) => {
    try {
        const butterflies = await ButterflyModel.findAll();
        res.status(200).json(butterflies);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las mariposas" });
    }
};

// GET - get one butterfly by ID
export const getOneButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    const butterfly = await ButterflyModel.findByPk(id);

    if (!butterfly) {
      return res.status(404).json({ message: "Mariposa no encontrada" });
    }

    res.status(200).json(butterfly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - create butterfly
export const createButterfly = async (req, res) => {    // con export const createButterfly: se crea y exporta la función llamada createButterfly para poder usarla en otros archivos y async (req, res) => { ... }: es una función asíncrona que recibe dos objetos de Express req (request): contiene información de la solicitud, como headers, body y params. res (response): sirve para enviar la respuesta de vuelta al cliente.
  try {      //inicia un bloque try/catch para manejar errores. Todo lo que esté dentro de try se intenta ejecutar normalmente; si hay un error, se pasa al catch
    const butterfly = await ButterflyModel.create(req.body);    //crea un nuevo registro en la base de datos usando Mongoose (ButterflyModel). req.body contiene los datos que envió el cliente (el JSON), La variable butterfly guarda el registro que se creó, incluyendo su id generado automáticamente
    res.status(201).json(butterfly);    // esto envia la respuesta al cliente, status(201): indica creación exitosa .json(butterfly): envía el objeto creado en formato JSON. Esto le dice al cliente que la mariposa se creó correctamente y le devuelve los datos completos.
  } catch (error) {    
    res.status(500).json({ message: error.message });  //Envía un mensaje de error al cliente: status(500): error del servidor.  .json({ message: error.message }): devuelve un JSON con el detalle del error.  Esto evita que la aplicación se caiga y permite informar al cliente de forma controlada.
  }
};

// DELETE - delete butterfly
export const deleteButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    const butterfly = await ButterflyModel.findByPk(id);

    if (!butterfly) {
      return res.status(404).json({ message: "Butterfly not found" });
    }

    await butterfly.destroy();
    res.status(200).json({ message: "Butterfly deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};