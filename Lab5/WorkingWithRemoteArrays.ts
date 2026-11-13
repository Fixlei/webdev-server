import type { Express, Request, Response } from "express";

let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithRemoteArrays(app: Express) {
  const getTodos = (req: Request, res: Response) => {
    const {completed} = req.query;
  if(completed !== undefined){
    const completedBool = completed === "true";
    res.json(todos.filter((t)=>t.completed === completedBool));
    return;
  }
    res.json(todos);
  };
  
  const getTodoById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };

const createNewTodo = (_req: Request, res: Response) => {
  const newTodo = {
    id: new Date().getTime(),
    title: "New Task",
    completed: false,
  };
  todos.push(newTodo);
  res.json(todos);
};

const removeTodo = (req, res)=>{
const {id}=req.params;
const todosIndex = todos.findIndex((t)=>t.id === parseInt(id));
if(todosIndex === -1 ){
  res.status(404).json({message:`Todo with ID ${id} not found`});
  return;
}
todos.splice(todosIndex, 1);
res.json(todos);
};

const postNewTodo = (req, res)=>{
const newTodo= {...req.body, id:new Date().getTime()};
todos.push(newTodo);
res.json(newTodo);
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
    return;
  }
  todos.splice(todoIndex, 1);
  res.sendStatus(200);
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
    return;
  }
  todos = todos.map((t) => (t.id === parseInt(id) ? { ...t, ...req.body } : t));
  res.sendStatus(200);
};
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo); 
  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos/:id/delete", removeTodo);

app.post("/lab5/todos", postNewTodo);
app.delete("/lab5/todos/:id", deleteTodo);
app.put("/lab5/todos/:id", updateTodo);
}

