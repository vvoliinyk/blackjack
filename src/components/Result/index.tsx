import React from 'react';
import styles from './Result.module.css'

interface ResultProps {
  winner: string;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ winner, onReset }) => {
  return (
    <div className={styles.modalContent}>
      <h2 className={styles.winner}>{winner === 'draw' ? 'It\'s a draw!' : `Winner: ${winner}`}</h2>
      <button onClick={onReset} className={styles.closeButton}>Reset Game</button>
    </div>
  );
};

export default Result
