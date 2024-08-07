import React from 'react';
import { Item, Label } from 'devextreme-react/form';
import { DateBox } from 'devextreme-react/date-box';

const MyDateBox = ({ dataField, labelText, value, onValueChanged }) => {
  return (
    <Item dataField={dataField} editorType="dxDateBox">
      <Label text={labelText} />
      <DateBox value={value} onValueChanged={(e) => onValueChanged(e.value)} />
    </Item>
  );
};

export default MyDateBox;
