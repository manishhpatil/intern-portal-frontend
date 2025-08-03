import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [internName, setInternName] = useState('');

  useEffect(() => {
    if (loggedIn) {
      axios.get('/api/user')  
        .then(res => setUser(res.data))
        .catch(err => console.error("API error:", err));
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <LoginPage onLogin={(name) => {
      setInternName(name);
      setLoggedIn(true);
    }} />;
  }

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome, {internName || user.name}!</h1>
      <p><strong>Referral Code:</strong> {user.referralCode}</p>
      <p><strong>Total Donations Raised:</strong> ₹{user.totalDonations}</p>

      <h2>🎁 Rewards</h2>
      <ul>
        <li>🏅 Bronze Badge – ₹1,000</li>
        <li>🥈 Silver Badge – ₹10,000</li>
        <li>🥇 Gold Badge – ₹25,000</li>
      </ul>
    </div>
  );
}

export default App;
