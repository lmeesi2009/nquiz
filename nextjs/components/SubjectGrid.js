import React from 'react';

export default function SubjectGrid({ subjects = [], onSelect = () => {} }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
      {subjects.map((s) => (
        <div key={s.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, background: '#fff' }}>
          <img src={`/s/${s.id}.png`} alt={s.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 6, background: '#f3f4f6' }} onError={(e)=>{e.target.style.display='none'}} />
          <h3 style={{ margin: '12px 0 4px' }}>{s.title}</h3>
          <p style={{ color: '#666', fontSize: 14 }}>{s.description}</p>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => onSelect(s)} style={{ background: '#06b6d4', color: '#fff', padding: '8px 12px', borderRadius: 6, border: 'none' }}>Open</button>
          </div>
        </div>
      ))}
    </div>
  );
}
