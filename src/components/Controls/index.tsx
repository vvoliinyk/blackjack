import React from 'react';
import styles from './Controls.module.css'

interface ControlsProps {
  onStart: () => void;
  onHit: () => void;
  onStand: () => void;
  disabled: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onStart, onHit, onStand, disabled }) => {
  return (
    <div className={styles.controls}>
      <button onClick={onStart} className={styles.button}>Start Game</button>
      <button onClick={onHit} disabled={disabled} className={styles.button}>Hit</button>
      <button onClick={onStand} disabled={disabled} className={styles.button}>Stand</button>
    </div>
  );
};
