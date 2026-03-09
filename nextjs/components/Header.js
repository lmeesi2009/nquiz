import React, { useEffect, useState } from 'react';

export default function Header({ title }) {
  const [agentName, setAgentName] = useState(null);

  useEffect(() => {
    fetch('/api/agent')
      .then((r) => r.json())
      .then((js) => {
        if (js && js.name) setAgentName(js.name);
      })
      .catch(() => {});
  }, []);

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ color: '#666' }}>{agentName ? `Agent: ${agentName}` : 'Agent: (not loaded)'}</div>
      </div>
    </header>
  );
}
