import React, { useState, useEffect } from 'react';

function CrudOperation() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', website: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitUser = async () => {
    const { name, email, website } = formData;

    if (name.trim() && email.trim() && website.trim()) {
      try {
        if (editId !== null) {
          // Update user
          const res = await fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
            method: 'PUT',
            body: JSON.stringify({ name, email, website }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          });
          const data = await res.json();
          setUsers(users.map(u => u.id === editId ? { ...u, ...data } : u));
          setEditId(null);
        } else {
          // Add user
          const res = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, website }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          });
          const data = await res.json();
          setUsers([...users, { ...data, id: users.length + 1 }]);
        }

        // Clear form
        setFormData({ name: '', email: '', website: '' });

      } catch (error) {
        console.error('Error submitting user:', error);
      }
    }
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setFormData({ name: user.name, email: user.email, website: user.website });
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({ name: '', email: '', website: '' });
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <h3 className='text-center text-dark mt-2'>USER MANAGEMENT</h3>
      <table className='table table-bordered'>
        <thead className='bg-dark text-white text-center'>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Email</th>
            <th>WEBSITE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>
                <button className='btn btn-success me-2' onClick={() => startEdit(user)}>Edit</button>
                <button className='btn btn-info' onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>{editId ? editId : ''}</td>
            <td>
              <input
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                name="website"
                placeholder="Enter Website"
                value={formData.website}
                onChange={handleChange}
              />
            </td>
            <td>
              <button className='btn btn-primary me-2' onClick={submitUser}>
                {editId ? 'Update User' : 'Add User'}
              </button>
              {editId && (
                <button className='btn btn-secondary' onClick={cancelEdit}>Cancel</button>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CrudOperation;
