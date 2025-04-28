import { render, screen } from '@testing-library/react';
import Hand from '.';
import Card, { Rank, Suit } from 'core/Card';

jest.mock('../Cards/Card/Card', () => ({ rank }: { rank: Rank }) => <div>Card {rank}</div>);
jest.mock('../Cards/HiddenCard/HiddenCard', () => () => <div>HiddenCard</div>);

describe('Hand Component', () => {
  test('renders all cards when hideFollowingCard is false', () => {
    const cards = [
      { rank: Rank.A, suit: Suit.Hearts },
      { rank: Rank.K, suit: Suit.Spades },
    ];

    render(<Hand cards={cards as Card[]} hideFollowingCard={false} />);

    // Check if both cards are rendered
    expect(screen.getAllByText('Card A')).not.toBeNull();
    expect(screen.getAllByText('Card K')).not.toBeNull();
  });

  test('hides the second card when hideFollowingCard is true', () => {
    const cards = [
      { rank: Rank.A, suit: Suit.Hearts },
      { rank: Rank.K, suit: Suit.Spades },
    ];

    render(<Hand cards={cards as Card[]} hideFollowingCard={true} />);

    // Check if the first card is rendered
    expect(screen.getByText('Card A')).not.toBeNull();

    // Check if the second card is hidden
    expect(screen.queryByText('Card K')).toBeNull();

    // Check if the HiddenCard component is rendered
    expect(screen.getByText('HiddenCard')).not.toBeNull();
  });
});
