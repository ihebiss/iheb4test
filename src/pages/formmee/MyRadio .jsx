import { Label } from 'devextreme-react/cjs/form';
import React from 'react';

const MyRadio = ({ label, choices, selectedOption, setSelectedOption }) => {
  return (
    <div>
      <Label text={label} />
      <div>
        {choices.map((choice, index) => (
          <label key={index}>
            <input
              type="radio"
              value={choice.value}
              checked={selectedOption === choice.value}
              onChange={() => setSelectedOption(choice.value)}
            /> {choice.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MyRadio;
