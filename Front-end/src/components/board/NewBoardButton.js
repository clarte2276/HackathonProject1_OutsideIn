import React from 'react';
import { Link } from 'react-router-dom';

function NewBoardButton(props) {
  return (
    <div className="newboard">
      <Link className="newboardButton" to={'/BoardWrite/' + props.emotion}>
        새 글 작성
      </Link>
    </div>
  );
}

export default NewBoardButton;
