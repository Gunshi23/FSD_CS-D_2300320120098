import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

/* CREATE */
app.post("/api/users", (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email)
    return res.status(400).json({ message: "All fields required" });

  users.push({ id, name, email });
  res.json({ message: "User added" });
});

/* READ ALL */
app.get("/api/users", (req, res) => {
  res.json(users);
});

/* READ ONE */
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
});

/* UPDATE */
app.put("/api/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Not found" });

  users[index] = req.body;
  res.json({ message: "Updated" });
});

/* DELETE */
app.delete("/api/users/:id", (req, res) => {
  users = users.filter(u => u.id !== req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);