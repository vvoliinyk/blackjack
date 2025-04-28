import Deck from '../../core/Deck';
import Hand from '../../core/Hand';

export const FINAL_SCORE = 21;
export const MAX_DEALER_SCORE_CONTINUE = 17;

export enum Winner {
  player = 'player',
  dealer = 'dealer',
  draw = 'draw'
}

class GameService {
  private deck!: Deck;
  private playerHand: Hand | null = null;
  private dealerHand: Hand | null = null;
  private winner: Winner | null = null;

  constructor() {
    this.createDeck()
  }

  get playerPoints(): number {
    return this.playerHand?.score || 0;
  }

  get dealerPoints(): number {
    return this.dealerHand?.score || 0;
  }

  get playerCards() {
    return this.playerHand?.allCards || []
  }

  get dealerCards() {
    return this.dealerHand?.allCards || []
  }

  private createDeck() {
    this.deck = new Deck()
    this.deck.shuffle()
  }

  startGame() {
    if (this.playerHand) {
      this.resetGame()
    }
    
    this.playerHand = new Hand(this.deck, FINAL_SCORE)
    this.dealerHand = new Hand(this.deck, MAX_DEALER_SCORE_CONTINUE)

    if (this.playerHand?.shouldStop) {
      this.setWinner()
    }

    return {
      playerPoints: this.playerPoints,
      playerCards: this.playerCards,
      dealerCards: this.dealerCards,
      dealerPoints: this.winner ? this.dealerPoints : 0,
      winner: this.winner
    }
  }

  playerHit() {
    this.playerHand?.addCard()
  
  
    if (this.playerHand?.shouldStop) {
      this.setWinner()
    }

    return {
      playerPoints: this.playerPoints,
      playerCards: this.playerCards,
      dealerPoints: this.winner ? this.dealerPoints : 0,
      winner: this.winner
    }
  }

  playerStand() {
    if (this.dealerHand?.shouldStop || this.playerHand?.shouldStop) {
     this.setWinner()
    }

    return {
      dealerPoints: this.dealerPoints,
      dealerCards: this.dealerCards,
      winner: this.winner
    }
  }

  dealerPlay() {
    this.dealerHand?.addCard();

    if (this.dealerHand?.shouldStop) {
      this.setWinner()
    } 

    return {
      dealerPoints: this.dealerPoints,
      dealerCards: this.dealerCards,
      winner: this.winner
    }
  }

  private setWinner() {
    if (
      this.playerPoints > FINAL_SCORE
      || (this.dealerPoints > this.playerPoints
        && this.dealerPoints <= FINAL_SCORE)
    ) {
      this.winner = Winner.dealer;
    } else if (
      this.dealerPoints > FINAL_SCORE
      || (this.playerPoints > this.dealerPoints
        && this.playerPoints <= FINAL_SCORE)
    ) {
      this.winner = Winner.player;
    } else {
      this.winner = Winner.draw;
    }
  }

  resetGame(): void {
    this.playerHand = null;
    this.dealerHand = null;
    this.winner = null;
    this.createDeck()
  } 
}

const GameServiceInstance = new GameService()

export default GameServiceInstance
