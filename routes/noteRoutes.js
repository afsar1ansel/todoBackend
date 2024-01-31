const express = require("express");
const { Note } = require("../Schema/noteSchema");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");
const {auth} = require("../middleware/auth.middleware");
const Try = require("../middleware/try.middleware");

/**
 * @swagger
 * components:
 *  schemas:
 *      NoteResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: A message indicating the status of the operation
 *              note:
 *                  $ref: '#/components/schemas/Note'
 * 
 *      Note:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: Title of the note
 *              description:
 *                  type: string
 *                  description: Description of the note
 *              userID:
 *                  type: string
 *                  description: ID of the user associated with the note
 *              name:
 *                  type: string
 *                  description: Name of the user associated with the note
 * 
 *  responses:
 *      UnauthorizedError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: Error message indicating unauthorized access
 * 
 *      NotFoundError:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: Error message indicating that the resource was not found
 * 
*/

/**
 * @swagger
 * /note/add:
 *  post:
 *      summary: Add a new note
 *      tags: [Notes]
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *      responses:
 *        200:
 *          description: Note added successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NoteResponse'
 *        401:
 *          discription: Unauthorized access
 */

/**
 * @swagger
 * /note:
 *  get:
 *      summary: Get all notes for a user
 *      tags: [Notes]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: List of notes retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Note'
 *        401:
 *         discription: Unauthorized access
 */

/**
 * @swagger
 * /note/update/{id}:
 *  patch:
 *      summary: Update a note by ID
 *      tags: [Notes]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the note to be updated
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *      responses:
 *        200:
 *          description: Note updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NoteResponse'
 *        401:
 *          discription: Unauthorized access
 *        404:
 *          discription: Note not found
 */

/**
 * @swagger
 * /note/delete/{id}:
 *  delete:
 *      summary: Delete a note by ID
 *      tags: [Notes]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the note to be deleted
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Note deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NoteResponse'
 *        401:
 *          discription: Unauthorized access
 *        404:
 *         discription: Note not found
 */




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
