'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Notes', [
			{
				userId: "1",
				notebookId: null,
				title: "Backend - Notes: Read",
				content: "Notes should be fetchable from the database selected by user and other properties (eg deletedAt value later).",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "2",
				notebookId: null,
				title: "Other user's note",
				content: "This should not be visible when logged into the demo user account.",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "1",
				notebookId: null,
				title: "Login and signup: replace placeholder logo",
				content: "",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "1",
				notebookId: null,
				title: "Landing: dropdown for techstack",
				content: "React\nRedux\nnode.js\n...",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			}
		], {});
	},

	down: (queryInterface, Sequelize) => {
		  return queryInterface.bulkDelete('Notes', null, {});
	}
};
