import React, { useState } from 'react';
import './Main.css';

function Header(props) {
  return (
    <header>
      <h1>
        <p>{props.title1}</p>
        <p>{props.title2}</p>
      </h1>
    </header>
  );
}

export default Header;
