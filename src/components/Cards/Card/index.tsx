import React from 'react';
import cx from 'classnames'
import styles from './Cards.module.css'
import { Rank, Suit } from 'core/Card';
import CardContent from '../CardContent';

export interface CardProps {
  rank: Rank;
  suit: Suit;
}

const redSuits = [Suit.Hearts, Suit.Diamonds]

const Card: React.FC<CardProps> = ({ rank, suit }) => {
  const isRed = redSuits.includes(suit);


  return (
    <div className={cx(styles.card, styles[isRed ? 'red' : 'black'])}>
      <i className={styles.cornerTopLeft}>{rank}</i>
      <i className={styles.cornerBottomRight}>{rank}</i>
      <div className={styles.center}>
        <CardContent rank={rank} suit={suit} />
      </div>
    </div>
  );
};

export default Card
