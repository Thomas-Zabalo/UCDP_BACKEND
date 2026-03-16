import Message from "../models/Message.js";

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Message.getConversationList(userId);
    res.json(conversations);
  } catch (err) {
    console.error("Erreur getConversations:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
