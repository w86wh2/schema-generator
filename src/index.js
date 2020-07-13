import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';
import './index.css';

const Root = ({ defaultValue, saves }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main defaultValue={defaultValue} saves={saves} />
    </DndProvider>
  );
};

export default Root;
