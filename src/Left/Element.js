import React from 'react';
import { useGlobal, useGlobalProps, useStore } from '../hooks';
import { addItem } from '../utils';

const Element = ({ text, name, schema }) => {
  const setGlobal = useGlobal();
  const { selected } = useGlobalProps();
  const { flatten, onFlattenChange } = useStore();

  const handleElementClick = () => {
    const { newId, newFlatten } = addItem({ selected, name, schema, flatten });
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  return (
    <div className="left-element" onClick={handleElementClick}>
      {text}
    </div>
  );
};

export default Element;
