import React from 'react';

export default function Library() {
  const HIDDEN_AUTHORS = ['Charles F. Baker', 'Cornelius R. Stam', 'C.R. Stam'];
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Library</h1>
      <p>Library contents excluding {HIDDEN_AUTHORS.join(', ')}</p>
    </div>
  );
}
