import db from "../config/db.js";

const User = {
    // utilisateur.model.js
    findById: async (id) => {
        try {
            const result = await db.query(
                "SELECT * FROM utilisateur WHERE id_utilisateur = $1",
                [id]
            );
            return result.rows[0];
        } catch (err) {
            // C'EST CE LOG QUI VA NOUS DONNER LA RÉPONSE
            console.error("Erreur d'exécution de la requête SQL dans Node:", err);
            throw err; // On propage pour que le controller reçoive l'erreur
        }
    },

    register: async ({nom, prenom, password, email, telephone, adresse, code_postal, ville, raison_sociale}) => {
        const result = await db.query(
            `INSERT INTO utilisateur (nom, prenom, mdp, mail, telephone, adresse, code_postal, ville, raison_sociale)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id_utilisateur,mail`,
            [nom, prenom, password, email, telephone, adresse, code_postal, ville, raison_sociale]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        await db.query("DELETE FROM utilisateur WHERE id = $1", [id]);
    },

    update: async ({nom, prenom, email, password, telephone, adresse, code_postal, ville, raison_sociale}) => {
        const result = await db.query(
            `UPDATE utilisateur
             SET nom = $1,
                 prenom = $2,
                 mdp = $3,
                 mail = $4,
                 telephone = $5,
                 adresse = $6,
                 code_postal = $7,
                 ville = $8,
                 raison_sociale = $9
             WHERE id_utilisateur = $10 RETURNING id_utilisateur, mail`,
            [nom, prenom, password, email, telephone, adresse, code_postal, ville, raison_sociale]
        );
        return result.rows[0];
    }
};


export default User;
