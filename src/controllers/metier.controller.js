import Metier from "../models/Metier.js";

export const getAllMetier = async (req, res) => {
    try {
        const offres = await Metier.getAll();
        res.json(offres);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des offres" });
    }
};

