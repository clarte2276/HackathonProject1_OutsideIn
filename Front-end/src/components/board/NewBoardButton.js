import React from 'react';
import { Link } from 'react-router-dom';

function NewBoardButton({ emotion, nextNo }) {
  return (
    <div className="newboard">
      <Link className="newboardButton" to={`/BoardWrite/${emotion}`} state={{ nextNo }}>
        새 글 작성
      </Link>
    </div>
  );
}

export default NewBoardButton;
