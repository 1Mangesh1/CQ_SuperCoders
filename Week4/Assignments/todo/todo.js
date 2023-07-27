const express = require("express");
const app = express();
const fs = require("fs");
const { fileURLToPath } = require("url");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.get("/todo", (req, res) => {
  res.sendFile(__dirname + "/public/todo.html");
});

app.get("/todoScript.js", (req, res) => {
  res.sendFile(__dirname + "/public/script/todoScript.js");
});

app.post("/todo", function (req, res) {
  console.log(req.body);
  saveTodoInFile(req.body, function (err) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(200).send("Success");
  });
});

app.get("/tododata", function (req, res) {
  readAllTodos(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    // res.status(200).send(json.stringify(data));
    res.status(200).json(data);
  });
});

app.put("/todo", function (req, res) {
  console.log(req.body);
  statusUpdate(req, res);
});

app.delete("/todo", function (req, res) {
  console.log(req.body);
  deleteTodoFromList(req, res);
});

app.get("/file", function (req, res) {
  
  const file = fs.readFileSync("./new.mp4", "utf-8");

  res.send(file);
});


app.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});

function readAllTodos(callback) {
  fs.readFile("./new.mp4", "utf-8", function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    if (data === "") {
      data = "[]";
    }
    try {
      data = JSON.parse(data);
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  });
}

function saveTodoInFile(todo, callback) {
  readAllTodos(function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    data.push(todo);

    fs.writeFile("./new.mp4", JSON.stringify(data), function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  });
}

function statusUpdate(req, res) {
  readAllTodos(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const todo = data.find(function (todo) {
      return todo.id === req.body.id;
    });
    if (todo) {
      todo.done = req.body.done;
      fs.writeFile("./new.mp4", JSON.stringify(data), function (err) {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        res.status(200).send("Success");
      });
    } else {
      res.status(404).send("Not Found");
    }
  });
}

function deleteTodoFromList(req, res) {
  readAllTodos(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const todo = data.find(function (todo) {
      return todo.id === req.body.id;
    });
    if (todo) {
      data.splice(data.indexOf(todo), 1);
      fs.writeFile("./new.mp4", JSON.stringify(data), function (err) {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }
        res.status(200).send("Success");
      });
    } else {
      res.status(404).send("Not Found");
    }
  });
}

