// Leaderboard.js
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState('xbox');

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Apex Legends Top 50 Leaderboard ({platform})</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => setPlatform('pc')}>PC</button>
        <button onClick={() => setPlatform('xbox')}>Xbox</button>
        <button onClick={() => setPlatform('ps4')}>PS4</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th></th>
            <th style={{ textAlign: 'left' }}>Name</th>
            {platform === 'pc' && <th style={{ textAlign: 'left' }}>Level</th>}
            <th style={{ textAlign: 'left' }}>RP</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td style={{ padding: '8px', textAlign: 'center', backgroundColor: 'black', color: 'white', width: '40px', borderRadius: '5px', fontWeight: 'bold' }}>
                {getStandingText(index + 1)}
              </td>
              <td style={{ padding: '8px', textAlign: 'left' }}>{player.name}</td>
              {platform === 'pc' && <td style={{ padding: '8px', textAlign: 'left' }}>{player.level}</td>}
              <td style={{ padding: '8px', textAlign: 'left' }}>{player.rp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStandingText = (standing) => {
  if (standing === 1) return <span style={{ color: 'gold' }}>{standing}</span>;
  if (standing === 2) return <span style={{ color: 'silver' }}>{standing}</span>;
  if (standing === 3) return <span style={{ color: 'goldenrod' }}>{standing}</span>;
  if (standing <= 50) return standing.toString();
  return '';
};

export default Leaderboard;
