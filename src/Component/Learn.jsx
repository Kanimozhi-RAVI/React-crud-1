import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Learn() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleAdd = () => {
    navigate('/update');
  };

  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">USER MANAGEMENT</h3>
      <button className="btn btn-primary mt-3 mb-4" onClick={handleAdd}>Add New User</button>
      <table className="table table-bordered text-center">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>
                <button className="btn btn-success me-2" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Learn;
