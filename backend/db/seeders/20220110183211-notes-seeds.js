'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Notes', [
			{
				userId: "1",
				notebookId: 2,
				title: "Backend - Notes: Read",
				content: "<p>Notes should be fetchable from the database selected by user and other properties (eg deletedAt value later).</p>",
				plainContent: "Notes should be fetchable from the database selected by user and other properties (eg deletedAt value later).",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "2",
				notebookId: null,
				title: "Other user's note",
				content: "<p>This should not be visible when logged into the demo user account.</p>",
				plainContent: "This should not be visible when logged into the demo user account.",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "1",
				notebookId: 2,
				title: "Login and signup: replace placeholder logo",
				content: "<p></p>",
				plainContent: "",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "1",
				notebookId: 2,
				title: "Landing: dropdown for techstack",
				content: "<p>React\nRedux\nnode.js\n...</p>",
				plainContent: "React\nRedux\nnode.js\n...",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "1",
				notebookId: 1,
				title: "Remember the milk",
				content: "<p>Opps, wrong site...</p>",
				plainContent: "Opps, wrong site...",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: "1",
				notebookId: null,
				title: "Uncategorized Note",
				content: "<p></p>",
				plainContent: "",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			}
		], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Notes', null, {});
	}
};
