'use client';

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.post(
        'https://ascinate.in/demo/nextapi/login.php',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200 && res.data.token) {
        Cookies.set('token', res.data.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(res.data.user), { expires: 7 });
        router.push('/dashboard');
      } else {
        alert('Invalid login');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Check credentials or server.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <p>&nbsp;</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <p>&nbsp;</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
