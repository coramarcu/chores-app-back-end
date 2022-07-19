const db = require("../services/db");
const getDb = require("../services/db");

exports.createUser = async (req, res) => {
  const db = await getDb();
  const { familyID } = req.params;
  const { email, name, role } = req.body;
  const newRole = role ? role : "parent";

  try {
    await db.query(
      `INSERT INTO User (familyID, email, name, role) VALUES (?, ?, ?, ?)`,
      [familyID, email, name, newRole]
    );

    const [newUser] = await db.query(
      `SELECT * FROM User WHERE email = "${email}"`
    );

    res.status(201);
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.readUser = async (req, res) => {
  const db = await getDb();
  const { familyID, email, role } = req.query;
  const queryString = role
    ? `SELECT * FROM User WHERE familyID = ${familyID} AND role = "${role}"`
    : `SELECT * FROM User WHERE email = "${email}"`;
  try {
    const [foundUsers] = await db.query(queryString);

    res.status(201);
    res.send(foundUsers);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }

  db.close();
};


exports.updateUser = async (req, res) => {
  const db = await getDb();
  const { name, firebaseID } = req.body;
  const { userID } = req.params;

  const newName = name ? ` name = "${name}",` : "";
  const newFirebaseID = firebaseID ? ` firebaseID = "${firebaseID}",` : "";

  const queryString = `UPDATE User SET${newName}${newFirebaseID}`;
  const formattedQueryString = queryString.substring(0, queryString.length - 1);
  const finalQueryString = formattedQueryString.concat(
    ` WHERE userID = ${userID};`
  );

  try {
    const [updatedUser] = await db.query(finalQueryString);

    res.status(201);
    res.send(updatedUser);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }

  db.close();
};
