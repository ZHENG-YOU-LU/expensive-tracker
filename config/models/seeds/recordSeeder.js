const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
	name: 'user1',
	email: 'user1@example.com',
	password: '12345678'
}

db.once('open', () => {
	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(SEED_USER.password, salt))
		.then(hash => User.create({
			name: SEED_USER.name,
			email: SEED_USER.email,
			password: hash
		})
		)
		.then(user => {
			const userId = user._id
			return Category.find()
				.lean()
				.then(categories => {
					return Promise.all(Array.from({ length: categories.length }, (_, i) => {
						return Record.create({
							name: categories[i].name,
							date: Date.now(),
							amount: (i + 1) * 100,
							userId,
							categoryId: categories[i]._id
						})
					})
					)
				})
				.then(() => {
					console.log('done.')
					process.exit()
				})
		})
})