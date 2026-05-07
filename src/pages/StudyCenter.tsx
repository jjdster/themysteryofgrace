import React from 'react';

export default function StudyCenter() {
  const HIDDEN_AUTHORS = ['Charles F. Baker', 'Cornelius R. Stam', 'C.R. Stam'];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Study Center</h1>
      <p>Study materials excluding {HIDDEN_AUTHORS.join(', ')}</p>
    </div>
  );
}
