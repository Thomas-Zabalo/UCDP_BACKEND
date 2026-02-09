import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const findByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

export const register = async (req, res) => {
  const { nom, prenom, email, password, telephone, adresse, code_postal, ville, raison_sociale } = req.body;
  try {
    // Vérification champs obligatoires
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe requis",
      });
    }

    // Email déjà utilisé
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "Email déjà utilisé",
      });
    }

    // Hash mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création utilisateur
    const newUser = await User.register({
      nom,
      prenom,
      email,
      password: hashedPassword,
      telephone,
      adresse,
      code_postal,
      ville,
      raison_sociale,
    });

    // Vérification JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET manquant");
      return res.status(500).json({
        message: "Configuration serveur invalide",
      });
    }

    // Génération du token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.mail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    // Erreur PostgreSQL (email unique, etc.)
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email déjà utilisé",
      });
    }

    // Erreur JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(500).json({
        message: "Erreur lors de la génération du token",
      });
    }

    // Erreur bcrypt
    if (error.message?.includes("bcrypt")) {
      return res.status(500).json({
        message: "Erreur lors du chiffrement du mot de passe",
      });
    }

    // Erreur inconnue
    return res.status(500).json({
      message: "Erreur interne du serveur",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1 Weeks" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
};