//import modules
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false})
var mongoose = require('mongoose')

//connect to mongo database
mongoose.connect('mongodb://admin:abcdeghi@ds159953.mlab.com:59953/todolist')

//create a schema
var schema = new mongoose.Schema({
  item: String
})

//create a model based on the schema
var todo = mongoose.model('Todo', schema)

module.exports = (app) => {

  app.get('/todo', (req,res) => {
    //get data from mongodb
    todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', {todos: data})
    })
  })
    //add new to do
  app.post('/todo',  (req,res) => {
    var newTodo = todo(req.body).save((err, data)=>{
      if (err) throw err;
      console.log('item added')
      res.json(data)
    })
  })
    //delete existing todo
  app.delete('/todo/:item', (req,res) => {
    todo.find({item: req.params.item.replace(/\-/g, ' ')})
        .remove((err, data)=>{
          if (err) throw err;
          console.log('item deleted')
          res.json(data)
        })
  })

}
