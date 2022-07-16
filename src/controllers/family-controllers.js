const getDB = require("../services/db");

exports.createFamily = async (req, res) => {
  const db = await getDB();
  const { familyName } = req.body;

  try {
    await db.query(`INSERT INTO Family (familyName) VALUES (?)`, [familyName]);

    res.status(201);
    res.send({ familyName: familyName });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }

  db.close();
};
