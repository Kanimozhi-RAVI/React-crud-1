import React, { useState, useEffect } from 'react';

function Learn() {
  const [user, setUser] = useState([]);
  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newWebsite, setWebsite] = useState("");

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, []);

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
           name, 
           email, 
           website 
          }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setUser([...user, data]);
          setName("");
          setEmail("");
          setWebsite("");
        });

    }
    function onchangeHnadler( id, key, value ){
     setUser((user)=> {
        user.map(users=>{
          users.id === id ? {...users.d, [key]:value} :user;
        })
     })


    }
  }

  return (
    <div>
      <table className='table table-bordered mt-5'>
        <thead className='bg-dark text-white text-center'>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>WEBSITE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {user.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>
                <button className='btn btn-info me-2' onChange={()=> onchangeHnadler( user.id, key, value )}>Update</button>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                placeholder='Enter a Name'
                value={newName}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder='Enter an Email'
                value={newEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder='Enter a Website'
                value={newWebsite}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </td>
            <td>
              <button className='btn btn-success' onClick={addUser}>Add User</button> 
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Learn;
