import React from 'react';
import ELEMENT_LIST from './elementList';
import './index.css';
import { useGlobal, useGlobalProps } from '../hooks';

const Left = (props) => (
  <div className="left-layout">
    {ELEMENT_LIST.map((ele, idx) => {
      return (
        <div className="left-item">
          <Element {...ele} {...props} key={idx.toString()} />
        </div>
      );
    })}
  </div>
);

export default Left;

const Element = ({
  text,
  name,
  selected,
  changeSelected,
  schema,
  rootSchema,
  onSchemaChange,
}) => {
  const setGlobal = useGlobal();
  return (
    <div
      className="left-element"
      onClick={() => {
        // const result = addSchema({
        //   id: selected,
        //   key: name,
        //   schema: rootSchema,
        //   subSchema: schema,
        // });
        // onSchemaChange(result[0]);
        // changeSelected(result[1]);
      }}
    >
      {text}
    </div>
  );
};
