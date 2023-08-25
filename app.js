const express = require('express');
const { render } = require('pug');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let todolist =[];

app.get('/', (req, res) => {
    return res.render('welcmpage', { todolist })
})

app.post('/add', (req,res)=>{
    const newTask =req.body.task;
    todolist.push(newTask);
    res.redirect('/');
})

app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < todolist.length) {
      todolist.splice(index, 1);
    }
    res.redirect('/');
  });

  app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    const taskToEdit = todolist[index];
    res.render('edit', { index, taskToEdit });
  });

  app.post('/update/:index', (req, res) => {
    const index = req.params.index;
    const updatedTask = req.body.updatedTask;
    todolist[index] = updatedTask;
    res.redirect('/');
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})