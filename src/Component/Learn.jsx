import React, { useState, useEffect } from 'react';

function Learn() {
  const [users, setUsers] = useState([]);
  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newWebsite, setWebsite] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editWebsite, setEditWebsite] = useState("");

  // READ
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // CREATE
  const addUser = async () => {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, website }),
          headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        const data = await res.json();
        setUsers([...users, { ...data, id: users.length + 1 }]); // fake ID
        setName("");
        setEmail("");
        setWebsite("");
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  // START EDIT
  const startEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditWebsite(user.website);
  };

  // UPDATE
  const updateUser = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          website: editWebsite
        }),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      });
      const data = await res.json();
      const updated = users.map(user =>
        user.id === editId ? { ...user, ...data } : user
      );
      setUsers(updated);
      setEditId(null);
      setEditName("");
      setEditEmail("");
      setEditWebsite("");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // DELETE
  const deleteUser = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-dark mb-4">User Management </h2>

      <table className="table table-bordered">
        <thead className="bg-dark text-white text-center">
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>WEBSITE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map(user =>
            editId === user.id ? (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editWebsite}
                    onChange={e => setEditWebsite(e.target.value)}
                  />
                </td>
                <td>
                  <button className="btn btn-success me-2" onClick={updateUser}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => startEdit(user)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )

            
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                placeholder="Enter Name"
                value={newName}
                onChange={e => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Enter Email"
                value={newEmail}
                onChange={e => setEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Enter Website"
                value={newWebsite}
                onChange={e => setWebsite(e.target.value)}
              />
            </td>
            <td>
              <button className="btn btn-success" onClick={addUser}>
                Add User
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Learn;
