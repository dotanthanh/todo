var express = require('express')
var todoController = require('./controllers/todoController')
var bodyParser = require('body-parser')

var app = express()

//set up template engine with ejs
app.set('view engine', 'ejs')

//static files
app.use(express.static('./publicFiles'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//fire controller
todoController(app);

//listen to ports
app.listen(3000, ()=>{
  console.log('listening to port 3000')
  console.log(process.env)
})
