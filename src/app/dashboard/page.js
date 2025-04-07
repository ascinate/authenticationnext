"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const userData = Cookies.get('user');

    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
