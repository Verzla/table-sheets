// @ts-ignore
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Example } from './Example';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>
);
