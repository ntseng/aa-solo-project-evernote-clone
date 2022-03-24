'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Notebooks', [
			{
				userId: 1,
				title: "Notebook 1",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: 1,
				title: "Development To-Dos",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				userId: 2,
				title: "Hidden Notebook",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			}
		], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Notebooks', null, {});
	}
};
