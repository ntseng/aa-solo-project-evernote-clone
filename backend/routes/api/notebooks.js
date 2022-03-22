const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");

const { Notebook } = require("../../db/models");

const router = express.Router();

router.get("/:userId(\\d+)", asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	const notebooks = await Notebook.findAll({
		where: { userId },
		include: db.User
	})

	return res.json({
		notebooks
	})
}))

router.post("/", asyncHandler(async (req, res) => {
	const { userId } = req.body;
	const notebook = await Notebook.create({
		userId,
		title: ""
	})

	return res.json({
		notebook
	})
}))

router.put("/", asyncHandler(async (req, res) => {
	const { notebookId, title } = req.body;
	const notebook = await Notebook.findByPk(notebookId);
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

	return res.json({
		notebookId
	})
}))

module.exports = router;
