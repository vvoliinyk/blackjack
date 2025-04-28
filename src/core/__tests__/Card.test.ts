import Card, { Suit, Rank } from '../Card';

describe('Class Card', () => {
    test('Should create with correct property', () => {
      const card = new Card(Rank.A, Suit.Hearts);
      expect(card.rank).toBe(Rank.A);
      expect(card.suit).toBe(Suit.Hearts);
    });
  
    describe('Method getValue', () => {
      test('Should return correct scores for not number', () => {
        const cardA = new Card(Rank.A, Suit.Spades);
        const cardJ = new Card(Rank.J, Suit.Clubs);
        const cardQ = new Card(Rank.Q, Suit.Diamonds);
        const cardK = new Card(Rank.K, Suit.Hearts);
  
        expect(cardA.getValue()).toBe(11);
        expect(cardJ.getValue()).toBe(10);
        expect(cardQ.getValue()).toBe(10);
        expect(cardK.getValue()).toBe(10);
      });
  
      test('Should return correct scores for number', () => {
        const card2 = new Card(Rank.two, Suit.Spades);
        const card10 = new Card(Rank.ten, Suit.Clubs);
  
        expect(card2.getValue()).toBe(2);
        expect(card10.getValue()).toBe(10);
      });
    });
  });