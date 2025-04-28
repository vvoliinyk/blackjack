import { render, screen } from '@testing-library/react';
import CardContent from '.';
import { Rank, Suit } from 'core/Card';

jest.mock('icons/Queen', () => () => <div>Queen</div>);
jest.mock('icons/King', () => () => <div>King</div>);
jest.mock('icons/Jack', () => () => <div>Jack</div>);

describe('CardContent', () => {
  test('should render a numeric card with the correct number of suit symbols', () => {
    render(<CardContent rank={Rank.five} suit={Suit.Hearts} />);
    const hearts = screen.getAllByText('♥');
    expect(hearts.length).toBe(5);
  });

  test('should render a Jack card with the correct image', () => {
    render(<CardContent rank={Rank.J} suit={Suit.Clubs} />);
    expect(screen.getByText('Jack')).not.toBeNull();
  });

  test('should render a Queen card with the correct image', () => {
    render(<CardContent rank={Rank.Q} suit={Suit.Spades} />);
    expect(screen.getByText('Queen')).not.toBeNull();
  });

  test('should render a King card with the correct image', () => {
    render(<CardContent rank={Rank.K} suit={Suit.Diamonds} />);
    expect(screen.getByText('King')).not.toBeNull();
  });

  test('should render the suit symbol for an Ace card', () => {
    render(<CardContent rank={Rank.A} suit={Suit.Clubs} />);
    expect(screen.getByText('♣')).not.toBeNull();
  });
});
