import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username, password

      });
      console.log(response)
      if (response.status !== 201) {
        throw new Error('로그인 실패');
      }

      alert('로그인 성공');
      navigate('/success');
    } catch (error) {
      console.error('Login error:', error);
      alert(`${error}로 인해 로그인 실패`);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
