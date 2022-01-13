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

module.exports = router;
