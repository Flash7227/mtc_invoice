"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/auth/logout', {
        method: 'GET'
      });

      // Redirect to the login page
      router.push('/login');
    };
    logout();
  }, [router]);

  return <p>Системээс гарч байна...</p>;
}