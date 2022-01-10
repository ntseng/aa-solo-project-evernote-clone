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

module.exports = router;
