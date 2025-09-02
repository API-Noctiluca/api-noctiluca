import ButterflyModel from "../models/ButterflyModel.js";

//Método GET - Trae todas las mariposas
export const getAllButterflies = async (req, res) => {
    try {
        const butterflies = await ButterflyModel.findAll();
        res.status(200).json(butterflies);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las mariposas" });
    }
};
