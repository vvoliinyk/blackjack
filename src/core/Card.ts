export const DIFF_ACE_SCORE = 10

export enum Suit {
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
  Spades = 'Spades',
}

export enum Rank {
  A = 'A',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  ten = '10',
  J = 'J',
  Q = 'Q',
  K = 'K',
}

type CardScoresKey = Extract<Rank, 'A' | 'J' | 'K' | 'Q' >

export const CardScores: Record<CardScoresKey, number> = {
  [Rank.J]: 10,
  [Rank.Q]: 10,
  [Rank.K]: 10,
  [Rank.A]: 11
}

export default class Card {
  suit: Suit;  
  rank: Rank;
  
  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  // check rank is card scores
  private isRaknInCardScores = (rank: Rank): rank is CardScoresKey => {
    return Object.keys(CardScores).includes(rank);
  }

  getValue(): number {
    if (this.isRaknInCardScores(this.rank)) {
      return CardScores[this.rank];
    }
    
    return Number(this.rank);
  }
}
  