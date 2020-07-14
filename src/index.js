import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';
import './index.css';

const Root = props => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main {...props} />
    </DndProvider>
  );
};

export default Root;
