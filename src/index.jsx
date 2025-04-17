import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import GrantSearch from './GrantSearch';

const App = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.type === 'grants') {
        setGrants(message.data);
      }
    });
  }, []);

  return (
    <div>
      <h1>FRC Grant Search</h1>
      <GrantSearch grants={grants} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
