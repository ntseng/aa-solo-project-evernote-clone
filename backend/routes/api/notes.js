const express = require('express');
const asyncHandler = require('express-async-handler');

const { Note } = require('../../db/models');

const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
	const id = req.params.id;
	const notes = await Note.findAll({
		where: {
			userId: id
		}
	})

	return res.json({
		notes,
	});
}));

router.post("/", asyncHandler(async (req, res) => {
	const { userId, notebookId } = req.body;
	const note = await Note.create({
		userId,
		notebookId,
		title: "",
		content: ""
	});

	return res.json({
		note
	})
}))

router.put("/", asyncHandler(async (req, res) => {
	const { noteId, notebookId, title, content, plainContent } = req.body;
	const note = await Note.findByPk(noteId);
	if (note) {
		await note.update({
			notebookId,
			title: title ?? note.title,
			content: content ?? note.content,
			plainContent: plainContent ?? note.plainContent
		});
		note.save();

		return res.json({
			note
		});
	} else {
		return res.json({});
	}
}))

router.delete("/", asyncHandler(async (req, res) => {
	const { noteId } = req.body;
	const note = await Note.findByPk(noteId);
	await note.destroy();

	return res.json({
		noteId
	})
}))

module.exports = router;
