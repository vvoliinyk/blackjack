import { FINAL_SCORE } from "services/game";
import Card, { DIFF_ACE_SCORE, Rank } from "./Card";
import Deck from "./Deck";

export default class Hand {
  private cards: Card[] = [];
  private deck: Deck;
  private _score = 0;
  private aces = 0;
  private maxScore = 0

  constructor(deck: Deck, maxScore: number) {
    this.deck = deck;
    this.maxScore = maxScore
    this.addCard()
    this.addCard()
  }

  addCard() {
    // adding card
    const card = this.deck.drawCard()
    this.cards.push(card);

    // updating score
    this._score += card.getValue()

    // updating aces
    if (card.rank === Rank.A) {
      this.aces += 1
    }

    // changing score if have aces and player is bust
    while (this.isBust && this.aces > 0) {
      this._score -= DIFF_ACE_SCORE;
      this.aces -= 1
    }
  }

  get score(): number {
    return this._score;
  }

  
  get isBust(): boolean {
    return this.score > FINAL_SCORE;
  }

  // hand is bust or have need score(21 for player, 17 for dealer)
  get shouldStop(): boolean {
    return this.score >= this.maxScore;
  }

  get allCards(): Card[] {
    return this.cards;
  }
}
