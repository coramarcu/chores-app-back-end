const getDb = require("../services/db");

exports.createUser = async (req, res) => {
  const db = await getDb();
  const { familyID } = req.params;
  const { email, name } = req.body;

  try {
    await db.query(
      `INSERT INTO User (familyID, email, name) VALUES (?, ?, ?)`,
      [familyID, email, name]
    );

    res.status(201);
    res.send({
      email: email,
      name: name,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }

  db.close();
};
