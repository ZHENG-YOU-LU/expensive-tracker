const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
db.on('error', () => {
	console.log('mongodb error!')
})


const catagories = [
	['家居物業', 'fa-house'],
	['交通出行', 'fa-van-shuttle'],
	['休閒娛樂', 'fa-face-grin-beam'],
	['餐飲食品', 'fa-utensils'],
	['其他', 'fa-pen']
].map(category => ({
	name: category[0],
	icon: `<i class="fa-solid ${category[1]}"></i>`
}))

db.once('open', () => {
	Category.create(catagories)
		.then(() => db.close())
	console.log('done')
})