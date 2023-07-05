const express = require('express');
const app = express();
const cors = require('cors');

const todos = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Write an article', completed: true },
  
];

app.use(express.json());
app.use(cors());


app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;
  todos.forEach((todo, index) => {
    if (todo.id === todoId) {
      todos[index] = { ...todo, ...updatedTodo };
    }
  });
  res.sendStatus(204);
});

app.delete('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
