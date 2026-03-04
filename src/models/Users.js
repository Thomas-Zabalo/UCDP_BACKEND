import db from "../config/db.js";

const User = {
  findByEmail: async (email) => {
    const result = await db.query(
      "SELECT * FROM utilisateur WHERE mail = $1",
      [email]
    );
    return result.rows[0];
  },

  register: async ({ nom, prenom, password, email, telephone, adresse, code_postal, ville, raison_sociale }) => {
    const result = await db.query(
      `INSERT INTO utilisateur (nom,prenom,mdp,mail,telephone,adresse,code_postal,ville,raison_sociale)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id_utilisateur,mail`,
      [nom, prenom, password, email, telephone, adresse, code_postal, ville, raison_sociale]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query("DELETE FROM utilisateur WHERE id = $1", [id]);
  },
};

export default User;
