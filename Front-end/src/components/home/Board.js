import React from 'react';
import './Board.css';

function Board(props) {
  return (
    <div className="Board_all">
      <a className="Board_name" href={'/Board/' + props.id}>
        {props.title}
      </a>
      <div className="Board_title_body">
        <div className="Board_body1">
          <h3>이겨냈어!</h3>
          <div className="Board_body_body">
            너희도 할 수 있어<br></br>항상응원할게<br></br>…
          </div>
        </div>
        <div className="Board_body2">
          <h3>이겨냈어!</h3>
          <div className="Board_body_body">
            너희도 할 수 있어<br></br>항상응원할게<br></br>…
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
