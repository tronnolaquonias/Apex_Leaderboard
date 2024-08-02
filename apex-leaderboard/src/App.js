import React, { useEffect, useState } from 'react';
import './App.css';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState('pc');

  useEffect(() => {
    fetchLeaderboard(platform);
  }, [platform]);

  const fetchLeaderboard = (platform) => {
    const port = platform === 'pc' ? 5001 : platform === 'xbox' ? 5002 : 5003;
    fetch(`http://127.0.0.1:${port}/api/leaderboard/${platform}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="leaderboard-container">
      <div className="header">
        <h1>Live Apex ranked leaderboard ({platform.toUpperCase()})</h1>
        <div className="platform-buttons">
          <button className={platform === 'pc' ? 'active' : ''} onClick={() => setPlatform('pc')}>PC</button>
          <button className={platform === 'xbox' ? 'active' : ''} onClick={() => setPlatform('xbox')}>Xbox</button>
          <button className={platform === 'ps4' ? 'active' : ''} onClick={() => setPlatform('ps4')}>PS4</button>
        </div>
      </div>
      <table className="leaderboard">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            {platform === 'pc' && <th>Level</th>}
            <th>RP</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              {platform === 'pc' && <td>{player.level}</td>}
              <td>{player.rp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
