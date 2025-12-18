const express = require('express');
const router = express.Router();
const passport = require("passport");

const NoteObject = require("../models/Note");

// Note by id
router.get("/:id",
    passport.authenticate(["user", "admin"], {
        session: false,
        failWithError: true,
    }),
    async (req, res) => {
        try {
            const note = await NoteObject.findOne({_id: req.params.id, user_id: req.user._id});
            if (!note) {
                res.status(404).send({ ok: false, message: "Note not found" });
            }
            res.status(200).send({ ok: true, data: note });
        } catch (error) {
            console.log(error);
            res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// All notes
router.get("",
    passport.authenticate(["admin"], {
        session: false,
        failWithError: true,
    }),
    async (req, res) => {
        try {
            if (req.user.role !== "admin")
            return res.status(403).send({ ok: false, code: "FORBIDDEN" });

            const allNotes = await NoteObject.find();
            if (!allNotes) {
                res.status(404).send({ ok: false, message: "No notes found" });
            }
            res.status(200).send({ ok: true, data: allNotes });
        } catch (error) {
            console.log(error);
            res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// All notes by a user
router.get("/user/:user_id",
    passport.authenticate(["user", "admin"], {
        session: false,
        failWithError: true,
    }),
    async (req, res) => {
        try {
            if (req.user._id.toString() !== req.params.user_id && req.user.role !== "admin")
            return res.status(403).send({ ok: false, code: "FORBIDDEN" });

            const allNotes = await NoteObject.find({ user_id: req.params.user_id }).sort({lastEdited: -1});
            if (!allNotes) {
                res.status(404).send({ ok: false, message: "No notes found" });
            }
            res.status(200).send({ ok: true, data: allNotes });
        } catch (error) {
            console.log(error);
            res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// Create note
router.post("",
    passport.authenticate(["user", "admin"], {
        session: false,
        failWithError: true,
    }),
    async (req, res) => {
        try {
            const { title, body } = req.body;
            const note = new NoteObject({
                title: title,
                body: body,
                user_id: req.user._id
            });
            await note.save();
            res.status(200).send({ ok: true, data: note.toObject() });
        } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// Update note
router.put("/:id",
    passport.authenticate(["user", "admin"], {
        session: false,
        failWithError: true,
    }),
    async (req, res) => {
        try {
            const note = await NoteObject.findOne({ _id: req.params.id, user_id: req.user._id });
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
    passport.authenticate(["user", "admin"], {
        session: false,
        failWithError: true,
    }),
    async (req, res) => {
        try {
            const result = await NoteObject.deleteOne({ _id: req.params.id, user_id: req.user._id });
            if (result.deletedCount === 0) res.status(403).send({ok: false, code: "FORBIDDEN"});
            res.status(200).send({ ok: true, message: "Note deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);




module.exports = router;