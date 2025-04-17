import React, { useState } from 'react';

const grants = [
  {
    title: 'STEM Innovation Grant',
    deadline: '2025-06-01',
    startDate: '2025-07-01',
    eligibility: 'Open to non-profit FRC robotics teams',
  },
  {
    title: 'Arts & Culture Fund',
    deadline: '2025-05-15',
    startDate: '2025-06-01',
    eligibility: 'Eligible for non-profit FRC teams with STEAM initiatives',
  },
  {
    title: 'Community Development Grant',
    deadline: '2025-04-30',
    startDate: '2025-05-15',
    eligibility: 'Available to non-profit FRC robotics teams supporting local engagement',
  },
];

export default function GrantSearch() {
  const [query, setQuery] = useState('');
  const filtered = grants.filter(grant => grant.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Grant Search</h1>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search grants..."
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
      />
      {filtered.map((g, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h2>{g.title}</h2>
          <p><strong>Deadline:</strong> {g.deadline}</p>
          <p><strong>Start Date:</strong> {g.startDate}</p>
          <p><strong>Eligibility:</strong> {g.eligibility}</p>
        </div>
      ))}
    </div>
  );
}