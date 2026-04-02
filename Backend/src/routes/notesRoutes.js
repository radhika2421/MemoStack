import express from 'express'
import { getAllNotes, getNoteById, createNote, deleteNote, editNote } from '../controllers/notesControllers.js';

const router=express.Router();

// index route
router.get("/",getAllNotes)
// get a particular note
router.get("/:id",getNoteById)
// create note
router.post("/create",createNote)
// deleted note
router.delete("/delete/:id",deleteNote)
// edit note
router.put("/edit/:id",editNote)

export default router;