import { db } from "../config/firebaseAdmin.js";

export const saveHumanProfile = async (req, res) => {
  try {
    const uid = req.user.uid;

    const profile = {
      ...req.body,
      uid,
      updatedAt: new Date(),
    };

    await db.collection("humanProfiles").doc(uid).set(profile, { merge: true });

    res.status(200).json({
      message: "Human profile saved successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to save human profile",
    });
  }
};