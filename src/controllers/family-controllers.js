const getDb = require("../services/db");

exports.createFamily = async (req, res) => {
  const db = await getDb();
  const { familyID, familyName } = req.body;

  try {
    await db.query(`INSERT INTO Family (familyID, familyName) VALUES (?, ?)`, [
      familyID,
      familyName,
    ]);

    res.status(201);
    res.send({ familyID: familyID, familyName: familyName });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }

  db.close();
};
