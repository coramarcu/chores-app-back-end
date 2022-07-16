const getDb = require("../services/db");

exports.createUser = async (req, res) => {
  const db = await getDb();
  const { familyID } = req.params;
  const { email, name, role } = req.body;
  const newRole = role ? role : "parent";

  console.log("Logging ROLE: " + role);

  try {
    await db.query(
      `INSERT INTO User (familyID, email, name, role) VALUES (?, ?, ?, ?)`,
      [familyID, email, name, newRole]
    );

    res.status(201);
    res.send({
      familyID: familyID,
      email: email,
      name: name,
      role: newRole,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }

  db.close();
};
