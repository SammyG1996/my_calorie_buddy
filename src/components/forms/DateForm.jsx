import React, { useState } from 'react';

/**This form will handle the date input and can be reused in different components by passing down a date state that is 
 * managed by the parent component*/ 
function DateForm({date, setDate}) {
  const [selectedDate, setSelectedDate] = useState(date);
  /**On click the new date will be set on the passed down state therefore triggering a refresh */
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setDate(event.target.value)
  };

  return (
    <div className='flex flex-col justify-center'>
      <h2 className='text-[#102E4A] font-bold'>Select a Date:</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DateForm;
