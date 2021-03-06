const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const db = require("../../db/models");

const { Notebook, Note } = require("../../db/models");

const router = express.Router();

router.get("/:userId(\\d+)", asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const notebooks = await Notebook.findAll({
		where: { userId },
		include: db.User
	})

	return res.json({
		notebooks
	})
}))

router.get("/:userId(\\d+)/:searchTerm", asyncHandler(async (req, res) => {
	const { userId, searchTerm } = req.params;
	const notebooks = await Notebook.findAll({
		where: { userId, title: { [Op.iLike]: `%${searchTerm}%` } },
		include: db.User
	});

	return res.json({
		notebooks
	})
}))

router.post("/", asyncHandler(async (req, res) => {
	const { userId } = req.body;
	const notebook = await Notebook.create({
		userId,
		title: "Untitled Notebook"
	}, { include: db.User })

	return res.json({
		notebook: await notebook.reload()
	})
}))

router.put("/", asyncHandler(async (req, res) => {
	const { notebookId, title } = req.body;
	const notebook = await Notebook.findByPk(notebookId, { include: db.User });
	if (notebook) {
		await notebook.update({
			title
		})
		notebook.save();

		return res.json({
			notebook
		});
	} else {
		return res.json({});
	}
}))

router.delete("/", asyncHandler(async (req, res) => {
	const { notebookId } = req.body;
	const notebook = await Notebook.findByPk(notebookId);
	await notebook.destroy();

	const notes = await Note.findAll({
		where: { notebookId }
	})
	notes.forEach(async note => {
		await note.update({ notebookId: null })
	})

	return res.json({
		notebookId
	})
}))

module.exports = router;
