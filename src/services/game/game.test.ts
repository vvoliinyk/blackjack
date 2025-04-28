import GameServiceInstance, { Winner } from '.';

describe('GameService', () => {
  beforeEach(() => {
    GameServiceInstance.resetGame();
  });

  test('should start the game with two hands', () => {
    const { playerPoints, playerCards, dealerCards } = GameServiceInstance.startGame();

    expect(playerPoints).toBeGreaterThan(0);
    expect(playerCards.length).toBe(2);
    expect(dealerCards.length).toBe(2);
  });

  test('should add a card to player hand on playerHit', () => {
    GameServiceInstance.startGame();
    const prevCardsCount = GameServiceInstance.playerCards.length;

    const { playerCards } = GameServiceInstance.playerHit();

    expect(playerCards.length).toBeGreaterThan(prevCardsCount);
  });

  test('should correctly determine winner if player busts after hit', () => {
    GameServiceInstance.startGame();

    // Artificially simulate player bust
    while (GameServiceInstance.playerPoints <= 21) {
      GameServiceInstance.playerHit();
      if (GameServiceInstance.playerPoints > 21) break;
    }

    expect(GameServiceInstance['winner']).toBe(Winner.dealer);
  });

  test('should correctly determine winner if dealer busts', () => {
    GameServiceInstance.startGame();
    GameServiceInstance.playerStand();

    // Artificially simulate dealer bust
    while (GameServiceInstance['dealerHand'] && GameServiceInstance['dealerHand'].score <= 21) {
      GameServiceInstance.dealerPlay();
      if (GameServiceInstance['dealerHand'].score > 21) break;
    }

    expect(GameServiceInstance['winner']).toBe(Winner.player);
  });

  test('should reset game correctly', () => {
    GameServiceInstance.startGame();
    GameServiceInstance.playerHit();

    GameServiceInstance.resetGame();

    expect(GameServiceInstance.playerPoints).toBe(0);
    expect(GameServiceInstance.dealerPoints).toBe(0);
    expect(GameServiceInstance['winner']).toBeNull();
  });
});
