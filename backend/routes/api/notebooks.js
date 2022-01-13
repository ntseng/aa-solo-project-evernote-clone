const express = require("express");
const asyncHandler = require("express-async-handler");

const { Notebook } = require("../../db/models");

const router = express.Router();

router.get("/:userId(\\d+)", asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	const notebooks = await Notebook.findAll({
		where: { userId }
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

router.put("/", asyncHandler(async (req, res) => { //TODO #110 create table detailing which notes belong to which notebooks
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

//TODO #109 api route for updating notes belonging to notebooks

module.exports = router;
