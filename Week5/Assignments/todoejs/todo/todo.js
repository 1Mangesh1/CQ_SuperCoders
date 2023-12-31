const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");

app.use(
  session({
    secret: "somesecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs"); //ejsss

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get("/", validateUser,(req, res) => {
  
  readData(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

  res.render("index", { user: "Namaste, " + req.session.username , data: data});


});
});

app.get("/about",validateUser, (req, res) => {
 
  readData(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
  res.render("about", { user: "Namaste, " + req.session.username , data: data});
  });
});

app.get("/contact", validateUser,(req, res) => {

  
  readData(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
  res.render("contact", { user: "Namaste, " + req.session.username , data: data});

});

});

app.get("/todo",validateUser, (req, res) => {
  
  readData(function (err, data) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

  res.render("todo", { user: "Namaste, " + req.session.username , data: data});
  });
});

app.get("/todoScript.js", validateUser,(req, res) => {
 
  res.sendFile(__dirname + "/public/script/todoScript.js");
});



app.post("/todo", function (req, res) {
  if (!req.session.isLoggedIn) {
    res.status(401).send("Unauthorized");
    return;
  }
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

app.get("/script/basic.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/public/script/basic.js");
});

app.put("/todo", function (req, res) {
  console.log(req.body);
  statusUpdate(req, res);
});

app.delete("/todo", function (req, res) {
  console.log(req.body);
  deleteTodoFromList(req, res);
});

app.get("/file", validateUser,function (req, res) {

  const file = fs.readFileSync("./new.mp4", "utf-8");

  res.send(file);
});

app.get("/login", (req, res) => {
  res.render("login", { error: "" });
});

// app.get("/invalidregister", (req, res) => {
//   res.render("invalidregister");
// });
// app.get("/invalidlogin", (req, res) => {
//   res.render("invalidlogin");
// });



app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("login", { error: "You have been logged out" });
});

app.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;
  req.session.username = username;
  console.log(req.body);

  validateLogin(username, password, function (err, data) {
    if (err) {
      res.status(500);
      res.send("Internal Server Error");
      return;
    }
    if (data) {
      req.session.isLoggedIn = true;
      res.status(200);
      res.redirect("/");
    } else {
      res.status(401);
      res.render("login", { error: "Invalid username or password" });

      return;
    }
  });
  // res.send("Success");
  //send to todo
  // res.redirect("/todo");
});

app.get("/register", (req, res) => {
  res.render("register", { error: "" });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  user = {
    username: username,
    password: password,
    email: email,
  };
  //save to db users.json

  saveUserInFile(user, function (err, msg) {
    if (err) {
      console.log(err);
      res.status(500);
      res.send("Internal Server Error");
      return;
    } else if ((null, msg === "Email or username already exists")) {
      res.status(401);
      res.render("register", { error: "Email or username already exists" });
      return;
    }

    res.status(200);
    res.redirect("/login");
  });
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

function saveUserInFile(user, callback) {
  fs.readFile("./users.json", "utf-8", function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    if (data === "") {
      data = "[]";
    }
    try {
      data = JSON.parse(data);
      const existingUser = data.find(function (existingUser) {
        return (
          existingUser.email === user.email ||
          existingUser.username === user.username
        );
      });
      if (existingUser) {
        callback(null, "Email or username already exists");
        return;
      }
      data.push(user);
      fs.writeFile("./users.json", JSON.stringify(data), function (err) {
        if (err) {
          callback(err);
          return;
        }
        callback(null);
      });
    } catch (error) {
      callback(error);
    }
  });
}

function validateLogin(username, password, callback) {
  fs.readFile("./users.json", "utf-8", function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    if (data === "") {
      data = "[]";
    }
    try {
      data = JSON.parse(data);
      const user = data.find(function (user) {
        return user.username === username && user.password === password;
      });
      if (user) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } catch (error) {
      callback(error);
    }
  });
}

function validateUser(req, res, next) {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.render("login", { error: "To view that page you must login first.." });
  }
}




function readData(callback) {
  fs.readFile("./data.json", "utf-8", function (err, data) {
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