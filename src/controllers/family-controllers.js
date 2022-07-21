const getDB = require("../services/db");

exports.createFamily = async (req, res) => {
  const db = await getDB();
  const { familyName } = req.body;

  try {
    await db.query(`INSERT INTO Family (familyName) VALUES (?)`, [familyName]);
    const [[family]] = await db.query(
      `SELECT * FROM Family ORDER BY familyID DESC LIMIT 1`
    );

    res.status(201);
    res.send({ familyName: family.familyName, familyID: family.familyID });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }

  db.close();
};
