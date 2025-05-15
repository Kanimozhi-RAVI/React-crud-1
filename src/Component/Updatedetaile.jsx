import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateDetail() {
  const [formData, setFormData] = useState({ name: '', email: '', website: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await res.json();
        setFormData({ name: data.name, email: data.email, website: data.website });
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const url = id
      ? `https://jsonplaceholder.typicode.com/users/${id}`
      : 'https://jsonplaceholder.typicode.com/users';

    const method = id ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });
//    {}
    navigate('/learn');
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">{id ? 'Edit' : 'Add'} User</h3>
      <div className="form-group mb-3">
        <input
          className="form-control"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <input
          className="form-control"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <input
          className="form-control"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-success me-2" onClick={handleSubmit}>
        {id ? 'Update' : 'Add'} User
      </button>
      <button className="btn btn-secondary" onClick={() => navigate('/learn')}>Cancel</button>
    </div>
  );
}

export default UpdateDetail;
