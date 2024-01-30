const express = require("express");
const { Note } = require("../Schema/noteSchema");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");
const {auth} = require("../middleware/auth.middleware");
const Try = require("../middleware/try.middleware");

noteRouter.post("/add", auth, async (req, res) => {
  const { title, description ,userID,name } = req.body;
  try {
    const note = new Note({
      title,
      description,
      userID,
      name
    });

    await note.save();
    res.send({
      message: "note added successfully",
    });
  } catch (error) {
    console.log('didnt work')
    res.send(error);
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({
      userID: req.body.userID,
    });
    res.send(notes);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

noteRouter.patch("/update/:id",auth, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    res.send({
      message: "note updated successfully",
      note: note,
    });
  } catch (error) {}
});

noteRouter.delete("/delete/:id",auth, async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndDelete(id);
    res.send({
      message: "note deleted successfully",
      note: note,
    });
  }
   catch (error) {
    res.send({
      message: error.message,
    });
  }

})

module.exports = noteRouter;
