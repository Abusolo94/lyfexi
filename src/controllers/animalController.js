import { db } from "../config/firebaseAdmin.js";

export const saveAnimalProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const animalId = req.body.animalId || db.collection("animals").doc().id;

    const profile = {
      ...req.body,
      animalId,
      ownerId: uid,
      updatedAt: new Date(),
    };

    await db
      .collection("users")
      .doc(uid)
      .collection("animals")
      .doc(animalId)
      .set(profile, { merge: true });

    res.status(200).json({
      message: "Animal profile saved successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to save animal profile",
    });
  }
};