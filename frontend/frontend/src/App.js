import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "" });
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const API = "http://localhost:5000/api/users";

  const fetchUsers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!form.id || !form.name || !form.email) {
      alert("All fields required");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ id: "", name: "", email: "" });
    fetchUsers();
  };

  const updateUser = async () => {
    await fetch(`${API}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const searchUser = async () => {
    const res = await fetch(`${API}/${searchId}`);
    if (res.status === 404) {
      alert("User not found");
      return;
    }
    const data = await res.json();
    setSearchResult(data);
  };

  return (
    <div className="container">
      <h2>MERN User Management</h2>

      <h3>Add / Update User</h3>
      <div className="form-group">
        <input
          placeholder="ID"
          value={form.id}
          onChange={e => setForm({ ...form, id: e.target.value })}
        />
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <button className="add-btn" onClick={addUser}>Add</button>
        <button className="update-btn" onClick={updateUser}>Update</button>
      </div>

      <hr />

      <h3>Search User</h3>
      <div className="form-group">
        <input
          placeholder="Search by ID"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
        />
        <button className="search-btn" onClick={searchUser}>Search</button>
      </div>

      {searchResult && (
        <p>
          Found: <b>{searchResult.name}</b> ({searchResult.email})
        </p>
      )}

      <hr />

      <h3>All Users</h3>
      {users.map(u => (
        <div key={u.id} className="user-card">
          <span>
            {u.id} - {u.name} ({u.email})
          </span>
          <button
            className="delete-btn"
            onClick={() => deleteUser(u.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}