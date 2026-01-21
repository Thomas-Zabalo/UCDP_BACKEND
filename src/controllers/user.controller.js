import User from "../models/User.js";
import bcrypt from "bcrypt";
import RevokedToken from "../models/RevokedTokens.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (exists) {
            return res.status(409).json({ message: "Utilisateur déjà existant" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Utilisateur créé",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

export const logout = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];

        const decoded = jwt.decode(token);

        await RevokedToken.create({
            token,
            expiresAt: new Date(decoded.exp * 1000)
        });

        res.json({ message: "Déconnexion réussie" });
    } catch (error) {
        console.error("LOGOUT ERROR:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        return res.json({ user });
    } catch (error) {
        console.error("GET PROFILE ERROR:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};
export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const games = await Game.find({
            createdBy: user._id,
            visibility: "public"
        });

        return res.json({ user, games });
    } catch (error) {
        console.error("Problème user id:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};
