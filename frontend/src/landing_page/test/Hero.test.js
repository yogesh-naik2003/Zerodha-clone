import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../home/Hero';

describe('Hero Component', () => {
  test('renders hero image', () => {
    render(<Hero />);
    const heroImage = screen.getByAltText('Investment platform dashboard');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "Media/homeHero.png");
  });
});
