import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

/**
 * MemoryMatch Game Main Container
 * 
 * A classic memory card matching game where players flip cards
 * to find matching pairs, testing and improving memory skills.
 */
function App() {
  // Game state
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // Game configuration
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const gridSize = 4; // 4x4 grid (16 cards)

  // Initialize game on component mount
  useEffect(() => {
    // Auto-initialize game for development/testing
    if (!gameStarted && cards.length === 0) {
      initializeGame();
    }
  }, []); // Empty dependency array ensures this runs only once on mount
  
  /**
   * Initialize the game board by creating pairs of cards and shuffling them
   */
  const initializeGame = () => {
    // Create pairs of cards
    let cardPairs = [...cardValues, ...cardValues];
    
    // Limit to gridSize^2 cards
    cardPairs = cardPairs.slice(0, (gridSize * gridSize) / 2);
    cardPairs = [...cardPairs, ...cardPairs];
    
    // Shuffle the cards
    const shuffledCards = shuffleArray(cardPairs).map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(true);
    setGameCompleted(false);
  };
  
  /**
   * Shuffle an array using Fisher-Yates algorithm
   * @param {Array} array - The array to shuffle
   * @returns {Array} - The shuffled array
   */
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  /**
   * Handle card click
   * @param {number} cardId - The ID of the clicked card
   */
  const handleCardClick = (cardId) => {
    // Prevent clicks during card matching evaluation
    if (flippedCards.length === 2) return;
    
    // Increment moves
    setMoves(moves + 1);
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    
    // Add to flipped cards
    setFlippedCards([...flippedCards, cardId]);
  };
  
  /**
   * Check for matches when two cards are flipped
   */
  useEffect(() => {
    // Wait until two cards are flipped
    if (flippedCards.length !== 2) return;
    
    const [firstCardId, secondCardId] = flippedCards;
    const firstCard = cards.find(card => card.id === firstCardId);
    const secondCard = cards.find(card => card.id === secondCardId);
    
    if (firstCard.value === secondCard.value) {
      // Match found
      const updatedCards = cards.map(card => 
        card.id === firstCardId || card.id === secondCardId 
          ? { ...card, isMatched: true } 
          : card
      );
      setCards(updatedCards);
      setMatchedPairs(matchedPairs + 1);
      setFlippedCards([]);
    } else {
      // No match, flip back after delay
      setTimeout(() => {
        const updatedCards = cards.map(card => 
          card.id === firstCardId || card.id === secondCardId 
            ? { ...card, isFlipped: false } 
            : card
        );
        setCards(updatedCards);
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards, matchedPairs]);
  
  /**
   * Check if the game is completed
   */
  useEffect(() => {
    if (gameStarted && matchedPairs === cards.length / 2 && cards.length > 0) {
      setGameCompleted(true);
    }
  }, [matchedPairs, cards.length, gameStarted]);
  
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="logo">
              <span className="logo-symbol">*</span> MemoryMatch
            </div>
            {gameStarted && !gameCompleted && (
              <div className="game-stats">
                <div className="moves">Moves: {moves}</div>
                <div className="pairs">Pairs: {matchedPairs} / {cards.length / 2}</div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          {!gameStarted ? (
            <div className="game-intro">
              <h1 className="title">Memory Match Game</h1>
              <p className="description">
                Test your memory by finding matching pairs of cards. Try to complete the game in as few moves as possible!
              </p>
              <button className="btn btn-large" onClick={initializeGame}>Start Game</button>
            </div>
          ) : gameCompleted ? (
            <div className="game-completed">
              <h1 className="title">Congratulations!</h1>
              <p className="description">
                You've completed the game in {moves} moves.
              </p>
              <button className="btn btn-large" onClick={initializeGame}>Play Again</button>
            </div>
          ) : (
            <div className="game-container">
              <div className={`game-board grid-${gridSize}`}>
                {cards.map(card => (
                  <Card 
                    key={card.id}
                    id={card.id}
                    value={card.value}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
              <button className="btn reset-button" onClick={initializeGame}>Reset Game</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
