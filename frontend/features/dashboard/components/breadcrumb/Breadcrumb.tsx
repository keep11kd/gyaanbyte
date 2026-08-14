import React from 'react';

export default function Breadcrumb({ items }: { items?: string[] }) {
  return <nav className="breadcrumb">{items?.join(' / ')}</nav>;
}
