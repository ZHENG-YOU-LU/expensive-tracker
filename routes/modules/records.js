const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//新增
router.get('/new', (req, res) => {
	Category.find()
		.lean()
		.sort({ _id: 'asc' })
		.then(categories => res.render('new', { categories }))
		.catch(error => console.log(error))
})
router.post('/new', (req, res) => {
	const record = req.body
	Category.findOne({ name: record.categoryId })
		.then(category => {
			record.categoryId = category._id
			record.userId = req.user._id
			Record.create(record)
				.then(record => {
					category.records.push(record._id)
					category.save()
				})
				.then(() => res.redirect('/'))
				.catch(error => console.error(error))
		})
		.catch(error => console.error(error))
})

//更新
router.get('/:_id/edit', (req, res) => {
	const { _id } = req.params
	const userId = req.user._id
	Record.findOne({ _id, userId })
		.populate('categoryId')
		.lean()
		.then(record => {
			record.date = record.date.toISOString().slice(0, 10) // for Date input value
			Category.find({ _id: { $ne: record.categoryId._id } }) // for categories options
				.lean()
				.sort({ _id: 'asc' })
				.then(categories => res.render('edit', { record, categories }))
				.catch(error => console.error(error))
		})
		.catch(error => console.error(error))
})

router.put('/:_id', (req, res) => {
	const { _id } = req.params
	const userId = req.user._id
	const update = req.body
	// assign category id in update object
	Category.findOne({ name: update.categoryId })
		.then(category => {
			update.categoryId = category._id

			// update record
			Record.findOneAndUpdate({ _id, userId }, update, { new: true })
				.then(record => {
					res.redirect(`/`)
				})
				.catch(error => console.error(error))
		})
		.catch(error => console.error(error))
})
//刪除
router.delete('/:_id', (req, res) => {
	const { _id } = req.params
	const userId = req.user._id

	Record.findOneAndDelete({ _id, userId })
		.then(record => {
			req.flash('success_msg', `[${record.name}] already deleted!`)
			res.redirect('/')
		})
		.catch(error => console.error(error))
})

// Set routes to filter, search record
router.get('/', (req, res) => {
	const { filteredCategory, startDate, endDate, sort } = req.query
	const keyword = req.query.keyword.trim()
	const userId = req.user._id

	Category.find()
		.lean()
		.sort({ _id: 'asc' })
		.then(categories => {
			// checked select options
			let checkedCategories = []
			let otherCategories = []
			categories.forEach(category => {
				if (!filteredCategory) {
					otherCategories.push(category)
				} else {
					if (filteredCategory.includes(category.name)) {
						checkedCategories.push(category)
					} else {
						otherCategories.push(category)
					}
				}
			})

			Record.find({
				userId,
				categoryId: checkedCategories.map(category => category._id),
				date: { $gte: startDate, $lte: endDate }
			})
				.populate('categoryId')
				.lean()
				.sort(JSON.parse(sort))
				.then(records => {
					// search keyword
					if (keyword) {
						records = records.filter(record => record.name.toLowerCase().includes(keyword.trim().toLowerCase()))
					}

					// checked total amount & transform time string
					let totalAmount = 0
					records.forEach(record => {
						record.date = record.date.toISOString().slice(0, 10)
						totalAmount += record.amount
					})

					// render records
					res.render('index', { records, totalAmount, keyword, checkedCategories, otherCategories, startDate, endDate, sort })
				})
				.catch(error => console.error(error))
		})
		.catch(error => console.error(error))
})

module.exports = router