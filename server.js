const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { Op } = require('sequelize')
const { sequelize, User, Exercise, Log } = require('./models')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//* MY CODE
//*? GET ROUTES */
app.get('/api/users', async (req, res) => {
  let data = await User.findAll({
    attributes: [
      '_id',
      'username'
    ]
  })

  res.send(data)
})

app.get('/api/users/:_id/exercises', async (req, res) => {
  let data = await User.findOne({
    where: {
      _id: req.params._id
    },
    include: ['exercise']
  })

  if (data)
    res.send(data)
  else
    res.send('User not found.')
})

app.get('/api/users/:_id/logs', async (req, res) => {
  let _id = req.params._id
  let { from, to, limit } = req.query

  let user = await User.findOne({ where: { _id } })

  if (user) {

    let options = {
      include: {
        model: Exercise,
        as: 'details',
        order: [
          ['timestamp', 'asc']
        ],
        attributes: [
          'description',
          'duration',
          'date',
          'timestamp'
        ]
      },
      attributes: [
        'username',
        'count',
        '_id'
      ],
    }
    if (limit)
      options.include.limit = limit

    let condition = {}
    if (from)
      condition.date = { [Op.gte]: new Date(from) }
    if (to)
      condition.date = { [Op.lte]: new Date(to) }

    options.include.where = condition

    let log = await Log.findOne({
      where: { username: user.username },
      ...options
    })

    res.send({
      username: log.username,
      count: log.count,
      _id: log._id,
      log: log.details
    })
  } else {
    res.send('User not found.')
  }
})

//*? POST ROUTES  */

app.post('/api/users', async (req, res) => {
  username = req.body.username
  try {
    let user = await User.create({ username })
    if (user) {
      let log = await Log.create({ username: user.username })
      res.send({
        error: false,
        _id: user._id,
        username: user.username
      })
    }
  } catch (err) {
    res.send({
      error: true,
      message: err.message
    })
  }
})

app.post('/api/users/:_id/exercises', async (req, res) => {
  let date
  let _id = req.params._id
  let { description, duration } = req.body
  if (!req.body.date)
    date = new Date().toLocaleDateString()
  else
    date = req.body.date

  try {
    let user = await User.findOne({ where: { _id } })
    if (user) {
      let data = await Exercise.create({
        username: user.username,
        description,
        duration,
        date,
        timestamp: new Date(date).getTime()
      })

      res.send({
        _id: user._id,
        username: user.username,
        description: data.description,
        duration: parseInt(data.duration),
        date: data.date
      })
    }
  } catch (err) {
    res.send({
      error: err.message
    })
  }
})


const listener = app.listen(process.env.PORT || 3000, () => {
  sequelize.authenticate()
  console.log('Your app is listening on port ' + listener.address().port)
})
