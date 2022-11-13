const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//瀏覽全部
router.get('/', (req, res) => {
	const userId = req.user._id

	// Set default date range
	const date = new Date
	date.setDate(1)
	const startDate = date.toISOString().slice(0, 10)
	date.setDate(30)
	const endDate = date.toISOString().slice(0, 10)

	Category.find()
		.lean()
		.sort({ _id: 'asc' })
		.then(checkedCategories => {
			Record.find({ userId, date: { $gte: startDate, $lte: endDate } })
				.populate('categoryId')
				.lean()
				.sort({ _id: 'asc' })
				.then(records => {
					let totalAmount = 0
					records.forEach(record => {
						record.date = record.date.toISOString().slice(0, 10)
						totalAmount += record.amount
					})
					res.render('index', { records, totalAmount, checkedCategories, startDate, endDate })
				})
				.catch(error => console.log(error))
		})
		.catch(error => console.log(error))
})

module.exports = router