const express = require("express");
const cors = require("cors");
const { readJsonFile, writeJsonFile} = require("./fsUtils");

const app = express();

app.use(cors());
app.use((req, res, next) => {
    console.log("New Request: ", req.method, req.url);
    next();
});

app.use(express.json());

app.get("/api/todos", (req, res) => {
    readJsonFile("./todos-data.json")
    .then((todos) => res.status(200).json({ success: true, result: todos}))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, error: "Konnte nicht geladen werden"})
    });
});

app.post("/api/todos", (req, res) => {
    const newTodoTask = req.body.task;
    const test = req.body
    console.log("req.body.task: ", newTodoTask)
    console.log("req.body: ", test)
    const newTodo = {
        id: Date.now(),
        task: newTodoTask,
        done: false,
    };
    readJsonFile("./todos-data.json")
    .then((todos) => [...todos, newTodo])
    .then((newTodosArray) => writeJsonFile("./todos-data.json" , newTodosArray))
    .then((newTodosArray) => {
        res.status(201).json({ success: true, result: newTodosArray})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, error: "Konnte nicht geladen werden"});
    })
});

app.patch("/api/todos:todoID/toggleDone", (req, res) => {
    const todoID = req.params.todoID;
    readJsonFile("./todos-data.json")
    .then((todos) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id.toString() === todoID) {
                return { ...todo, completed: !todo.completed};
            } else {
                return todo;
            }
        });
        return updatedTodos;
    })
    .then((newTodosArray) => writeJsonFile("./todos-data.json", newTodosArray))
    .then((newTodosArray) => {
        res.status(200).json({ success: false, result: newTodosArray });
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ success: false, error: "Konnte nicht geladen werden"});
    })
})

app.delete("/api/todos/:todoID", (req, res) => {
    const todoID = req.params.todoID;
    readJsonFile("./todos-data.json")
    .then((todos) => {
    const todosWithoutDeletedTodo = todos.filter(
        (todo) => todo.id.toString() !== todoID
    );
    return todosWithoutDeletedTodo;
    })
    .then((newTodosArray) => writeJsonFile("./todos-data.json", newTodosArray))
    .then((newTodosArray) => {
    console.log(newTodosArray);
    res.status(200).json({ success: true, result: newTodosArray });
})
.catch((err) => {
    console.log(err); 
    res.status(500).json({ success: false, error: "Konnte nicht entfernt werden" });
});
});

// endpoint not found handler
app.use((_, res) => {
    res.status(404).json({
    success: false,
    error: "Route existiert nicht",
    });
});

const PORT = 7070;
app.listen(PORT, () => {
    console.log("Server online auf Port", PORT);
});