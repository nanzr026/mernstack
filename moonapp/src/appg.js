import { useState } from "react";
import "./appg.css";

/* Barbie character image links (direct URLs) */
const cardImages = [
  {
    img: "https://i.pinimg.com/736x/de/b5/a7/deb5a720333c8655dcc8187863af6ad3.jpg",
  },
  {
    img: "https://i.pinimg.com/736x/80/19/cb/8019cb5aad0804eeaae21f193ab2ebc6.jpg",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Screenshot_2024-08-19_at_14.36.56.png?v=1724071042",
  },
  {
    img: "https://i.pinimg.com/736x/37/88/bb/3788bb3f2f56777f77b66900ae43b717.jpg",
  },
];


/* Duplicate + shuffle */
const shuffledCards = [...cardImages, ...cardImages]
  .map((card) => ({ ...card, id: Math.random() }))
  .sort(() => Math.random() - 0.5);

/* Card Component */
function Card({ card, handleClick }) {
  return (
    <div
      className={`card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
      onClick={() => handleClick(card)}
    >
      {card.isFlipped || card.isMatched ? (
        <img
          src={card.img}
          alt="barbie"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/100")
          }
        />
      ) : (
        "?"
      )}
    </div>
  );
}

/* Main App */
function App() {
  const [cards, setCards] = useState(
    shuffledCards.map((card) => ({
      ...card,
      isFlipped: false,
      isMatched: false,
    }))
  );

  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleClick = (clickedCard) => {
    if (
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      selectedCards.length === 2
    )
      return;

    // Flip selected card
    setCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id
          ? { ...card, isFlipped: true }
          : card
      )
    );

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);

      if (newSelected[0].img === newSelected[1].img) {
        // Match found
        setCards((prev) =>
          prev.map((card) =>
            card.img === clickedCard.img
              ? { ...card, isMatched: true }
              : card
          )
        );
        setSelectedCards([]);
      } else {
        // Not matched
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.isMatched ? card : { ...card, isFlipped: false }
            )
          );
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  return (
    <div className="container">
      <center><h2>🎀Remember me🎀</h2>
      <p>Moves: {moves}</p></center>

      <div className="grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
