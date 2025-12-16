const express = require('express');
const router = express.Router();

const NoteObject = require("../models/Note");

const config = require("../config");

// Note by id
router.get("/:id", async (req, res) => {
    try {
        const note = await NoteObject.findById(req.params.id);
        if (!note) {
            res.status(404).send({ ok: false, message: "Note not found" });
        }
        res.status(200).send({ ok: true, data: note });
    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
    }
});

// All notes
router.get("", async (req, res) => {
    try {
        const allNotes = await NoteObject.find();

        if (!allNotes) {
            res.status(404).send({ ok: false, message: "No notes found" });
        }
        res.status(200).send({ ok: true, data: allNotes });
    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
    }
});

// All notes by a user
router.get("/user/:user_id", async (req, res) => {
    try {
        const allNotes = await NoteObject.find({ user_id: req.params.user_id });

        if (!allNotes) {
            res.status(404).send({ ok: false, message: "No notes found" });
        }
        res.status(200).send({ ok: true, data: allNotes });
    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
    }
});

// Create note
router.post("",
    async (req, res) => {
        const { title, body, user_id } = req.body;

        if (!title || !body || !user_id )
        return res.status(400).send({
            ok: false,
            code: "MISSING DATA",
            message: "should i prefill some ?",
        });

        try {
            const note = new NoteObject({
                title: title,
                body: body,
                user_id: user_id
            });
            await note.save();
            res.status(200).send({ ok: true, data: note });
        } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// Update note
router.put("/:id",
    async (req, res) => {
        try {
        const note = await NoteObject.findById(req.params.id);
        const { title, body } = req.body;
        if (title) note.set({ title: title });
        if (body) note.set({ body: body });
        note.set({ lastEdited: Date.now() });
        await note.save();
        res.status(200).send({ ok: true, data: note });

        } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// Delete note
router.delete("/:id",
    async (req, res) => {
        try {
        const result = await NoteObject.deleteOne({ _id: req.params.id });
        res.status(200).send({ ok: true, message: `${result.deletedCount} note(s) deleted` });

        } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);




module.exports = router;