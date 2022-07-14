const getDb = require("../services/db");

exports.signInUser = async (req, res,) => {
    const db = await getDb();
    const {email, password} = req.body;

  try {
    await db.query('
    SELECT DISTINCT User WHERE `${Email}` = email AND `${Password}` = password VALUES (?,?)'); 
  }}


exports.createUser = async (req, res) => {
  const db = await getDb();
  const { name, price, status, owner, familyID } = req.body;

  try {
    const user = await db.query(
      `INSERT INTO User (name, price, status, owner, familyID) VALUES (?, ?, ?, ?, ?)`,
      [name, price, status, owner, familyID]
    );

    console.log(user);


    console.log(
      `you entered this data into the Chores table: {name: '${name}', price: '${price}', status: '${status}', owner: '${owner}, familyID: '${familyID}''}`
    );
    res.status(201);
    res.send("Entry in table successful!");
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500).json(err);
  }

  db.close();
};