var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var message_array = [ 
    {name: 'Priya', message: 'Hello priya'},
    {name: 'Aman', message: 'Hello aman'}
]

app.get('/messages', (req, res) => {
    res.send(message_array)
})

app.post('/messages', (req, res) => {
    message_array.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

http.listen(3000)
