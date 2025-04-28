import Card, { Rank, Suit } from "./Card";

export default class Deck {
  private cards: Card[] = [];

  constructor() {
    // create deck with all ranks and suits
    Object.values(Suit).forEach(suit => {
      Object.values(Rank).forEach(rank => this.cards.push(new Card(rank, suit)));
    });
    this.shuffle();
  }

  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  drawCard(): Card {
    const card = this.cards.pop();
    if (!card) {
      throw new Error("No cards left in the deck");
    }
    return card;
  }
}
