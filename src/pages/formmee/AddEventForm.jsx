import React, { useEffect, useState } from 'react';
import { Form, GroupItem, Label } from 'devextreme-react/form';
import { TextBox } from 'devextreme-react';
import { DateBox } from 'devextreme-react/date-box';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import MyRadio from './MyRadio ';
import Box, { Item } from 'devextreme-react/box';

const buttonStyle = {
  backgroundColor: 'orange',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  margin: '5px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '16px',
};

const AddEventForm = ({ events, setEvents }) => {
  const [numevent, setNumevent] = useState('');
  const [dateevent, setDateevent] = useState('');
  const [datefinevent, setDatefinevent] = useState('');
  const [datejour, setDatejour] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    console.log("selectedOption : ", selectedOption);
  }, [selectedOption]);

  const generateId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    const uniqueId = `${timestamp}-${randomNum}`;
    return uniqueId;
  };

  const handleSubmit = async () => {
    const eventData = {
      "_id": generateId(),
      "numevent": numevent,
      "dateevent": dateevent,
      "datefinevent": datefinevent,
      "datejour": datejour,
    };
    setEvents([...events, eventData]);
  };

  const handleEdit = async (event) => {
    setNumevent(event.numevent)
    setDateevent(event.dateevent)
    setDatefinevent(event.datefinevent)
    setDatejour(event.datejour)
    const updatedEventData = {
      "_id": event.id,
      "numevent": numevent,
      "dateevent": dateevent,
      "datefinevent": datefinevent,
      "datejour": datejour,
    };

    const updatedEvents = events.map(event =>
      event._id === event.id ? updatedEventData : event
    );

    setEvents(updatedEvents);
  };

  const handleDelete = async (id) => {
    setEvents(events.filter(event => event._id !== id));
  };

  return (
    <div>

<Box direction="row" width="100%" height={75}>
      <Item ratio={1}>
        <Label text="Nom Event" />
        <TextBox value={numevent} onValueChanged={(e) => setNumevent(e.value)} />
      </Item>      
      <Item ratio={1}>
        <MyRadio
          label="Choose Option"
          choices={[
            { value: 'jour', label: 'Jour' },
            { value: 'period', label: 'Period' }
          ]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </Item>
      <Item ratio={2}>
      {selectedOption === 'period' && (
          <>
          <Box direction="row" width="100%" height={75}>

                <Item ratio={1}>

              <Label text="Date Debut Event" />
              <DateBox value={dateevent} onValueChanged={(e) => setDateevent(e.value)} />
              </Item>

              <Item ratio={1}>

              <Label text="Date Fin Event" />
              <DateBox value={datefinevent} onValueChanged={(e) => setDatefinevent(e.value)} />
              </Item>
              </Box>

            </>
        )}

        {selectedOption === 'jour' && (
          <>
              <Label text="Date Jour" />
              <DateBox value={datejour} onValueChanged={(e) => setDatejour(e.value)} />
          </>
        )}
      </Item>
      <Item ratio={1}>
        {selectedOption !== '' && 
          <button style={buttonStyle} onClick={handleSubmit}>Add Event</button>
        }
      </Item>
    </Box>
            
           

       

      <div id="data-grid-demo">
        <h2>Events List</h2>
        <DataGrid
          dataSource={events}
          showBorders={true}
        >
          <Paging enabled={false} />
          <Column dataField="numevent" caption="Num Event" />
          <Column dataField="dateevent" caption="Date Event" dataType="date" />
          <Column dataField="datefinevent" caption="Date Fin Event" dataType="date" />
          <Column dataField="datejour" caption="Date Jour" dataType="date" />
          <Column
            caption="Actions"
            cellRender={(cellData) => (
              <div>
                <button style={buttonStyle} onClick={() => handleEdit(cellData.data)}>Edit</button>
                <button style={buttonStyle} onClick={() => handleDelete(cellData.data._id)}>Delete</button>
              </div>
            )}
          />
        </DataGrid>
      </div>
    </div>
  );
};

export default AddEventForm;
