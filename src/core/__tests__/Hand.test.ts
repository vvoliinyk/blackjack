import Hand from '../Hand';
import Card, { Rank, Suit } from '../Card';
import Deck from '../Deck';
import { FINAL_SCORE } from 'services/game';

jest.mock('../Deck');

describe('Hand Class', () => {
  let mockDeck: jest.Mocked<Deck>;

  beforeEach(() => {
    mockDeck = new Deck() as jest.Mocked<Deck>;
    mockDeck.drawCard = jest.fn();
  });

  test('should initialize with two cards', () => {
    const card1 = new Card(Rank.five, Suit.Hearts);
    const card2 = new Card(Rank.six, Suit.Spades);
    mockDeck.drawCard.mockReturnValueOnce(card1).mockReturnValueOnce(card2);

    const hand = new Hand(mockDeck, FINAL_SCORE);

    expect(mockDeck.drawCard).toHaveBeenCalledTimes(2);
    expect(hand.allCards).toEqual([card1, card2]);
    expect(hand.score).toBe(11);
    expect(hand.isBust).toBe(false);
  });

  test('should add a card and update score', () => {
    const card1 = new Card(Rank.five, Suit.Hearts);
    const card2 = new Card(Rank.six, Suit.Spades);
    const card3 = new Card(Rank.ten, Suit.Diamonds);
    mockDeck.drawCard
      .mockReturnValueOnce(card1)
      .mockReturnValueOnce(card2)
      .mockReturnValueOnce(card3);

    const hand = new Hand(mockDeck, FINAL_SCORE);
    hand.addCard();

    expect(mockDeck.drawCard).toHaveBeenCalledTimes(3);
    expect(hand.allCards).toEqual([card1, card2, card3]);
    expect(hand.score).toBe(21);
    expect(hand.isBust).toBe(true);
  });

  test('should handle ace value adjustment to prevent bust', () => {
    const card1 = new Card(Rank.A, Suit.Hearts); // 11 points
    const card2 = new Card(Rank.nine, Suit.Spades); // 9 points
    const card3 = new Card(Rank.five, Suit.Diamonds); // 5 points
    mockDeck.drawCard
      .mockReturnValueOnce(card1)
      .mockReturnValueOnce(card2)
      .mockReturnValueOnce(card3);

    const hand = new Hand(mockDeck, FINAL_SCORE);
    hand.addCard();

    // Initial score: 11 (A) + 9 = 20
    // After adding 5: 20 + 5 = 25
    // Adjust ace from 11 to 1: 25 - 10 = 15

    expect(hand.score).toBe(15);
    expect(hand.isBust).toBe(false);
  });

  test('should handle ace value adjustment to prevent bust (2 aces)', () => {
    const card1 = new Card(Rank.A, Suit.Hearts); // 11 points
    const card2 = new Card(Rank.nine, Suit.Spades); // 9 points
    const card3 = new Card(Rank.five, Suit.Diamonds); // 5 points
    const card4 = new Card(Rank.A, Suit.Diamonds); // 11 points
    mockDeck.drawCard
      .mockReturnValueOnce(card1)
      .mockReturnValueOnce(card2)
      .mockReturnValueOnce(card3)
      .mockReturnValueOnce(card4);

    const hand = new Hand(mockDeck, FINAL_SCORE);
    hand.addCard();

    // Initial score: 11 (A) + 9 = 20
    // After adding 5: 20 + 5 = 25
    // Adjust ace from 11 to 1: 25 - 10 = 15

    expect(hand.score).toBe(15);
    expect(hand.isBust).toBe(false);

    hand.addCard();

    // After adding 5: 15 + 11 = 26
    // Adjust ace from 11 to 1: 26 - 10 = 16
    expect(hand.score).toBe(16);
    expect(hand.isBust).toBe(false);
  });

  test('should identify bust when score exceeds max and no aces to adjust', () => {
    const card1 = new Card(Rank.ten, Suit.Hearts);
    const card2 = new Card(Rank.nine, Suit.Spades);
    const card3 = new Card(Rank.three, Suit.Diamonds);
    mockDeck.drawCard
      .mockReturnValueOnce(card1)
      .mockReturnValueOnce(card2)
      .mockReturnValueOnce(card3);

    const hand = new Hand(mockDeck, FINAL_SCORE);
    hand.addCard();

    // Score: 10 + 9 + 3 = 22

    expect(hand.score).toBe(22);
    expect(hand.isBust).toBe(true);
  });
});
