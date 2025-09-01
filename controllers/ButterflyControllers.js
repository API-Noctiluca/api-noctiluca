import ButterflyModel from "../models/";


// POST - create butterfly
export const createButterfly = async (req, res) => {
  try {
    const butterfly = await ButterflyModel.create(req.body);
    res.status(201).json(butterfly);
  } catch (error) {
    res.status(500).json({ message: error.message });
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