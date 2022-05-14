import React from "react";
import "./singleCard.css";
function SingleCard({ card, handelChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handelChoice(card);
    }
  };

  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card font" />
        <img
          className="back"
          src="/img/cover.png"
          alt="card Back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
