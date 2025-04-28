import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GameBoard from '.';
import GameService, { Winner } from '../../services/game';

jest.mock('../../services/game/game');

describe('GameBoard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should start a new game with initial setup', () => {
    // Mock the initial setup of the game
    const startGameMock = jest.spyOn(GameService, 'startGame').mockReturnValue({
      playerPoints: 10,
      playerCards: [],
      dealerCards: [],
      winner: null,
      dealerPoints: 0
    });

    render(<GameBoard />);

    fireEvent.click(screen.getByText(/start game/i));

    expect(startGameMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Player's Hand/i)).not.toBeNull();
    expect(screen.getByText(/Dealer's Hand/i)).not.toBeNull();
    expect(screen.getByText(/Blackjack Game/i)).not.toBeNull();
  });

  test('should update player hand on player hit', async () => {
    const startGameMock = jest.spyOn(GameService, 'startGame').mockReturnValue({
      playerPoints: 15,
      playerCards: [],
      dealerCards: [],
      winner: null,
      dealerPoints: 0
    });

    const playerHitMock = jest.spyOn(GameService, 'playerHit').mockReturnValue({
      playerPoints: 15,
      playerCards: [],
      dealerPoints: 0,
      winner: null
    });

    render(<GameBoard />);

    fireEvent.click(screen.getByText(/start game/i));
    fireEvent.click(screen.getByText(/hit/i));

    await waitFor(() => expect(playerHitMock).toHaveBeenCalledTimes(1));
  });

  test('should reset the game when reset is clicked', () => {
    const startGameMock = jest.spyOn(GameService, 'startGame').mockReturnValue({
      playerPoints: 15,
      playerCards: [],
      dealerCards: [],
      winner: null,
      dealerPoints: 0
    });
    const playerStandMock = jest.spyOn(GameService, 'playerStand').mockReturnValue({
      dealerPoints: 17,
      dealerCards: [],
      winner: Winner.dealer
    });

    const resetGameMock = jest.spyOn(GameService, 'resetGame');

    render(<GameBoard />);

    fireEvent.click(screen.getByText(/start game/i));
    fireEvent.click(screen.getByText(/stand/i));
    
    fireEvent.click(screen.getByText(/reset/i));

    expect(resetGameMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Blackjack Game/i)).not.toBeNull();
  });

  test('should display winner when game ends', async () => {
    const startGameMock = jest.spyOn(GameService, 'startGame').mockReturnValue({
      playerPoints: 15,
      playerCards: [],
      dealerCards: [],
      winner: null,
      dealerPoints: 0
    });
    const playerStandMock = jest.spyOn(GameService, 'playerStand').mockReturnValue({
      dealerPoints: 18,
      dealerCards: [],
      winner: Winner.dealer
    });

    render(<GameBoard />);

    fireEvent.click(screen.getByText(/start game/i));
    fireEvent.click(screen.getByText(/stand/i));

    await waitFor(() => expect(playerStandMock).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Winner: dealer/i)).not.toBeNull();
  });
});
