import React from 'react';
import Card from '../../core/Card';
import CardComponent from '../Cards/Card'
import HiddenCard from '../Cards/HiddenCard';
import styles from './Hand.module.css'

interface HandProps {
  cards: Card[];
  hideFollowingCard?: boolean
}

const Hand: React.FC<HandProps> = ({ cards, hideFollowingCard }) => {
  return (
    <div className={styles.hand}>
      {cards.map(({ rank, suit }, index) => {
        if (hideFollowingCard && index === 1) {
          return (
            <HiddenCard key={`${rank}-${suit}`} />
          )
        }

        return (
          <CardComponent key={`${rank}-${suit}`} rank={rank} suit={suit} />
        )
    })}
    </div>
  );
};

export default Hand;
