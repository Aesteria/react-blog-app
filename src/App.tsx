import React, { useEffect, useState } from 'react';

export default function App() {
  const [a, seta] = useState('test');
  useEffect(() => {
    if (a) {
      console.log('sad');
    }
  }, []);

  return <div>App</div>;
}
