import React, { useMemo, useState } from 'react';
import GameService, { Winner } from '../../services/game';
import Hand from '../Hand';
import Result  from '../Result';
import { Controls } from '../Controls';
import Card from '../../core/Card';
import styles from './GameBoard.module.css';

const DEALER_PLAY_DELAY = 1000

const GameBoard: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [winnerUI, setWinnerUI] = useState<Winner | null>(null)
 
  const [playerPointsUI, setPlayerPoinsUI] = useState(0)
  const [playerCardsUI, setPlayerCardsUI] = useState<Card[]>([])

  const [dealerPointsUI, setDealerPoinsUI] = useState(0)
  const [dealerCardsUI, setDealerCardsUI] = useState<Card[]>([])

  const updatePlayer = (
    points: number,
    cards: Card[],
    winner: Winner | null = null
  ) => {
    setPlayerPoinsUI(points)
    setPlayerCardsUI(cards)
    setWinnerUI(winner)
  }

  const updateDealer = (
    points: number,
    cards: Card[],
    winner: Winner | null = null
  ) => {
    setDealerPoinsUI(points)
    setDealerCardsUI(cards)
    setWinnerUI(winner)
  }

  const startGame = () => {
    if (winnerUI) {
      resetGame()
    }

    const {
      playerPoints,
      playerCards,
      dealerCards,
      dealerPoints,
      winner
    } = GameService.startGame()
    
    updatePlayer(playerPoints, playerCards)
    setDealerCardsUI(dealerCards)
   
    if (winner) {
      if (dealerPoints) {
        setTimeout(() => updateDealer(
          dealerPoints,
          dealerCardsUI,
          winner
        ), DEALER_PLAY_DELAY);
      }
    } else {
      setIsGameStarted(true)
    }
  }

  const playerHit = () => {
    const {
      playerPoints,
      playerCards,
      dealerPoints,
      winner
    } = GameService.playerHit()
    
    updatePlayer(
      playerPoints,
      playerCards,
    )
    
    if (dealerPoints) {
      setTimeout(() => updateDealer(
        dealerPoints,
        dealerCardsUI,
        winner
      ), DEALER_PLAY_DELAY);
    }
  }

  const dealerPlay = () => {
    setTimeout(() => {
      const {
        dealerPoints,
        dealerCards,
        winner
      } = GameService.dealerPlay()
      
      updateDealer(
        dealerPoints,
        dealerCards,
        winner
      )
      
      if (!winner) {
        dealerPlay()
      }
    }, DEALER_PLAY_DELAY)
  }

  const playerStand = () => {
    const {
      dealerPoints,
      dealerCards,
      winner
    } = GameService.playerStand()

    updateDealer(
      dealerPoints,
      dealerCards,
      winner
    )
  
    if (!winner) {
      dealerPlay()
    }
  }

  const resetGame = () => {
    GameService.resetGame()
    setIsGameStarted(false)
    updateDealer(0, [])
    updatePlayer(0, [])
  }

  const gameButtonsDisabled = useMemo(() => {
    return Boolean(winnerUI) || !isGameStarted
  }, [winnerUI, isGameStarted])

  return (
    <div className={styles.gameBoard}>
      <h1 className={styles.title}>Blackjack Game</h1>
      <Controls
        onStand={playerStand}
        onStart={startGame}
        onHit={playerHit}
        disabled={gameButtonsDisabled}
      />
      <div className={styles.hand}>
        <div className={styles.handSection}>
          <h2>Player's Hand {playerPointsUI ? `(${playerPointsUI} points)` : ''}</h2>
          <Hand cards={playerCardsUI} />
        </div>
        <div className={styles.handSection}>
          <h2>Dealer's Hand {dealerPointsUI ? `(${dealerPointsUI} points)` : ''}</h2>
          <Hand cards={dealerCardsUI} hideFollowingCard={!dealerPointsUI} />
        </div>
      </div>
      {winnerUI && (
        <Result
          winner={winnerUI}
          onReset={resetGame}
        />
      )}
    </div>
  );
};

export default GameBoard;
