import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users/city')
   
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f3b6c8', minHeight: '100vh' }}>
      <h1 style={{ background: '#fff', padding: '10px' }}>Users List</h1>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id} style={{ marginBottom: '15px' }}>
              <b>Name:</b> {user.name}<br />
              <b>Age:</b> {user.age}<br />
              <b>Email:</b> {user.email}<br />
              <b>CGPA:</b> {user.cgpa}<br />
              <b>City:</b> {user.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
