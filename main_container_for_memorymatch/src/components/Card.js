import React from 'react';

/**
 * Card component represents a single card in the MemoryMatch game
 * 
 * @param {Object} props - Component props
 * @param {string|number} props.id - Unique identifier for the card
 * @param {string|number} props.value - Value/type of the card (used for matching logic)
 * @param {boolean} props.isFlipped - Whether the card is currently flipped
 * @param {boolean} props.isMatched - Whether the card has been matched
 * @param {Function} props.onClick - Function to call when card is clicked
 */
const Card = ({ id, value, isFlipped, isMatched, onClick }) => {
  // Determine card classes based on state
  const cardClasses = `memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;
  
  return (
    <div 
      className={cardClasses} 
      onClick={() => !isFlipped && !isMatched && onClick(id)}
      data-testid={`card-${id}`}
    >
      <div className="card-inner">
        <div className="card-back">
          <div className="card-back-content">
            <span className="card-symbol">?</span>
          </div>
        </div>
        <div className="card-front">
          <div className="card-emoji">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
