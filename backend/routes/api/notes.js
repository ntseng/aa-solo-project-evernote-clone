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

// router.put("/:id(\\d+)", asyncHandler(async (req, res) => {
// 	const note = await Note.findByPk(noteId);
// 	await note.update({

// 	});
// 	note.save();

// 	return res.json({
// 		note
// 	});
// }))

// router.delete("/:id(\\d+)",asyncHandler(async (req, res) => {

// })

module.exports = router;
