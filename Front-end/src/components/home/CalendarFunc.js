import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from 'moment';

function CalendarFunc(props) {
  const [value, onChange] = useState(new Date());

  const handleCalendarChange = (date) => {
    onChange(date);
  };

  return (
    <div className="Cal">
      <Calendar
        onChange={handleCalendarChange}
        value={value}
        formatDay={(locale, date) => moment(date).format('D')}
        formatShortWeekday={(locale, date) => moment(date).format('dd').replace('.', '').toUpperCase()}
      />
    </div>
  );
}

export default CalendarFunc;
