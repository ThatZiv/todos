import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

test('render main component', () => {
  render(<App />);
  const linkElement = screen.getByText(/My TODO\(s\)/i);
  expect(linkElement).toBeInTheDocument();
  cleanup()
});

test("render buttons", () => {
  render(<App/>);
  const buttons = screen.getByText(/(Add|\nRemove)/);
  expect(buttons).toBeInTheDocument();
  cleanup()
})
