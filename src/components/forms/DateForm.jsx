import React, { useState } from 'react';

function DateForm({date, setDate}) {
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setDate(event.target.value)
    
  };

  return (
    <div className='flex flex-row justify-center'>
      <h2 className='mr-2'>Select a Date:</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DateForm;
