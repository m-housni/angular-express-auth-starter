const express = require("express");
const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200", // Angular dev server
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
