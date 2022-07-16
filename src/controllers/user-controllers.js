const getDb = require("../services/db");

exports.createUser = async (req, res) => {
  const db = await getDb();
  const { familyID } = req.params;
  const { email, name } = req.body;

  console.log("FROM CONTROLLER:" + email + name + familyID);

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
    console.log(err.message);
    res.sendStatus(500).json(err);
  }

  db.close();
};
