const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    body: String,
    user_id: String,
    created: { type: Date, default: Date.now },
    lastEdited: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;