import React, { useState } from 'react';
import './Main.css';
import { IoCheckmarkOutline } from 'react-icons/io5';

function CheckList(props) {
  const CHECKLIST = [
    { id: 0, data: '물 2리터 마시기' },
    { id: 1, data: '1시간 달리기' },
    { id: 2, data: '나 자신 칭찬하기' },
    { id: 3, data: '크게 웃기' },
  ];
  const [checkedList, setCheckedList] = useState([]);

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item.id]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== item.id));
    }
  };

  return (
    <div className="checklistLayout">
      <h3 className="checkFont">
        <IoCheckmarkOutline />
        &nbsp; 오늘의 체크리스트
      </h3>
      <ul className="checklist">
        {CHECKLIST.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              id={`check-${item.id}`}
              onChange={(e) => onCheckedElement(e.target.checked, item)}
              checked={checkedList.includes(item.id)}
            />
            <label htmlFor={`check-${item.id}`}>{item.data}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckList;
