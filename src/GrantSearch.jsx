import React from 'react';

const GrantSearch = ({ grants }) => {
  if (!grants.length) return <p>Loading grants...</p>;

  return (
    <div>
      {grants.map((grant, index) => (
        <div key={index} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
          <h2>{grant.name}</h2>
          <p><strong>Start Date:</strong> {grant.startDate}</p>
          <p><strong>Deadline:</strong> {grant.deadline}</p>
          <a href={grant.url} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
      ))}
    </div>
  );
};

export default GrantSearch;
// This component renders a list of grants passed as props.