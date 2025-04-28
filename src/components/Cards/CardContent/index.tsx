import React from 'react';
import styles from './CardContent.module.css'
import { Rank, Suit } from 'core/Card';
import { CardProps } from '../Card';
import Queen, { IconProps } from 'icons/Queen';
import King from 'icons/King';
import Jack from 'icons/Jack';

const suitSymbols: Record<Suit, string> = {
  [Suit.Hearts]: '♥',
  [Suit.Diamonds]: '♦',
  [Suit.Clubs]: '♣',
  [Suit.Spades]: '♠'
};
  
type FaceImagesKey = Extract<Rank, 'J' | 'K' | 'Q' >

const faceCardImages: Record<FaceImagesKey, React.FC<IconProps>> = {
  [Rank.J]: Jack,
  [Rank.Q]: Queen,
  [Rank.K]: King,
};

const isRaknInFaceImages = (rank: Rank): rank is FaceImagesKey => {
  return Object.keys(faceCardImages).includes(rank);
}

const CardContent: React.FC<CardProps> = ({ rank, suit }) => {
  const suitSymbol = suitSymbols[suit];
  const numericRank = Number(rank);
  const isNumeric = !isNaN(numericRank);
  const FaceImage = isRaknInFaceImages(rank) ? faceCardImages[rank] : null;

  switch(true) {
    case isNumeric: {
      return (
        <div className={styles.pipContainer}>
          {Array.from({ length: numericRank }, (_, i) => (
            <i key={`pip-${i}`} className={styles.pip}>
              {suitSymbol}
            </i>
          ))}
         </div>
      )
     
    }
    case Boolean(FaceImage): {
      return (
        FaceImage && <FaceImage />
      )
    }
    default: {
      return (
        <i className={styles.suit}>{suitSymbol}</i>
      )
    }
  }
};

export default CardContent
