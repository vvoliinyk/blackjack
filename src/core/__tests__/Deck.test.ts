import Deck from '../Deck';
import Card from '../Card';

describe('Deck Class', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  test('should initialize with 52 unique cards', () => {
    const drawnCards = new Set<string>();

    for (let i = 0; i < 52; i++) {
      const card = deck.drawCard();
      expect(card).toBeInstanceOf(Card);
      const cardIdentifier = `${card.rank} of ${card.suit}`;
      expect(drawnCards.has(cardIdentifier)).toBe(false);
      drawnCards.add(cardIdentifier);
    }

    expect(() => deck.drawCard()).toThrow();
  });

  test('should shuffle the deck', () => {
    const deck1 = new Deck();
    const deck2 = new Deck();

    // Draw all cards from both decks
    const cards1 = [];
    const cards2 = [];

    for (let i = 0; i < 52; i++) {
      cards1.push(deck1.drawCard());
      cards2.push(deck2.drawCard());
    }

    // Compare the order of cards
    let orderIsSame = true;
    for (let i = 0; i < 52; i++) {
      if (
        cards1[i].rank !== cards2[i].rank ||
        cards1[i].suit !== cards2[i].suit
      ) {
        orderIsSame = false;
        break;
      }
    }

    expect(orderIsSame).toBe(false);
  });
});
