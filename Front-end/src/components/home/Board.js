import { Link } from 'react-router-dom';
import React from 'react';
import './Board.css';

function Board(props) {
  const getLinkClass = () => {
    switch (props.emotion) {
      case 'joy':
        return 'Board_plusLink joy';
      case 'sadness':
        return 'Board_plusLink sadness';
      case 'anxiety':
        return 'Board_plusLink anxiety';
      case 'fear':
        return 'Board_plusLink fear';
      default:
        return 'Board_plusLink';
    }
  };
  const getShadowClass = () => {
    switch (props.emotion) {
      case 'joy':
        return 'Board_name joy';
      case 'sadness':
        return 'Board_name sadness';
      case 'anxiety':
        return 'Board_name anxiety';
      case 'fear':
        return 'Board_name fear';
      default:
        return 'Board_name';
    }
  };
  return (
    <div className="Board_all">
      <div className="nameLink_layout">
        <div className={getShadowClass()}>{props.title}</div>
        <Link className={getLinkClass()} to={'/' + props.emotion}>
          +
        </Link>
      </div>
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
