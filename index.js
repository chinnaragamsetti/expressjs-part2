const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbpath = path.join(__dirname, "goodreads.db");

let db = null;

const initializerDbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
app.listen(3000, () => {
  console.log("server is running");
});

initializerDbAndServer();

app.get("/books/", async (request, response) => {
  const getbookarray = `
    Selection
    *
    FROM 
    book
    ORDER BY
    book_id;`;
  const bookarray = await db.all(getbookarray);
  resonse.send(bookarray);
});
