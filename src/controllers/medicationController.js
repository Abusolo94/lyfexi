import { db } from "../config/firebaseAdmin.js";

export const saveMedicationReminder = async (req, res) => {
  try {
    const uid = req.user.uid;
    const reminderId =
      req.body.reminderId || db.collection("medicationReminders").doc().id;

    const reminder = {
      ...req.body,
      reminderId,
      userId: uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db
      .collection("users")
      .doc(uid)
      .collection("medicationReminders")
      .doc(reminderId)
      .set(reminder, { merge: true });

    res.status(200).json({
      message: "Medication reminder saved successfully",
      reminder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to save medication reminder",
    });
  }
};