const express = require("express");
const dbConnect = require("./db");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

app.use(cookieParser("token"));
app.use("/user", userRouter);
app.use("/note", noteRouter);


app.get("/", (req, res) => {
  res.send("hello world");
});


app.listen(7777, async () => {
    await dbConnect();
    console.log("server is running on port 7777");
})
