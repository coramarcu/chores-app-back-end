const getDb = require("../services/db");

exports.createChore = async (req, res) => {
  const db = await getDb();
  const { name, price, status, familyID } = req.body;

  try {
    await db.query(
      `INSERT INTO Chores (name, price, status, familyID) VALUES (?, ?, ?, ?)`,
      [name, price, status, familyID]
    );

    res.status(201);
    res.send({
      name: name,
      price: price,
      status: status,
      familyID: familyID,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.readChores = async (req, res) => {
  const db = await getDb();
  const { familyID } = req.params;

  try {
    const [chores] = await db.query(`SELECT * FROM Chores WHERE familyID = ?`, [
      familyID,
    ]);

    console.log("From Controller:" + chores);

    res.status(200);
    res.send(chores);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }
};
