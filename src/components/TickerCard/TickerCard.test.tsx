import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TickerCard from './TickerCard';

describe('<TickerCard />', () => {
  test('it should mount', () => {
    render(<TickerCard />);

    const tickerCard = screen.getByTestId('TickerCard');

    expect(tickerCard).toBeInTheDocument();
  });
});