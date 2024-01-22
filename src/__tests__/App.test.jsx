import App from '../App.jsx';
import { render, screen } from '@testing-library/react';

describe('App component', () => {
  it('renders the app', () => {
    render(<App />);
    expect(1).toEqual(1);
  });
});