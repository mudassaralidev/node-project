import express from "express"

const app = express();

const server = app.listen(
  5000,
  console.log("Server running in development mode on port 5000")
);