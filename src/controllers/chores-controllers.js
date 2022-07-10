const getDb = require("../services/db");

exports.createChores = async (req, res) => {
  const db = await getDb();
  const { name, price } = req.body;
  console.log("Hello controller!");

  try {
    await db.query(
      `INSERT INTO Chores (name, price) VALUES ('${name}', '${price}')`
    );
    res.status(201);
    res.send("Entry in table successful!");
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};
