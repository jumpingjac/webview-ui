import React, { useEffect, useState } from 'react';

const GrantSearch = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    // Fetch the RSS feed from Grants.gov and parse it
    fetch("https://www.grants.gov/rss/GGNewOpportunities.xml")
      .then((res) => res.text())
      .then((str) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const items = Array.from(xml.querySelectorAll("item"));
        const results = items.map((item) => ({
          title: item.querySelector("title")?.textContent || "No title",
          link: item.querySelector("link")?.textContent || "#",
          description: item.querySelector("description")?.textContent || "No description",
          pubDate: item.querySelector("pubDate")?.textContent || "",
        }));
        setGrants(results);
      })
      .catch((err) => {
        console.error("Error fetching grants:", err);
      });
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        📰 Latest Grants from Grants.gov
      </h1>
      {grants.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {grants.map((grant, i) => (
            <li
              key={i}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <a
                href={grant.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0366d6', fontSize: '1.1rem', fontWeight: '600', textDecoration: 'none' }}
              >
                {grant.title}
              </a>
              <p style={{ color: '#555', fontSize: '0.875rem', marginTop: '0.5rem' }}>{grant.pubDate}</p>
              <p style={{ color: '#333', marginTop: '0.5rem' }}>{grant.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GrantSearch;