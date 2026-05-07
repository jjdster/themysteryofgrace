import React from 'react';
export default function AuthModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return <div>Auth Modal</div>;
}
