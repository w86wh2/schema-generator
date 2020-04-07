import React from 'react';
import FR from './index';

const RenderChildren = ({ children = [], onItemChange, flatten }) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          onItemChange,
          flatten,
          id: child,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderChildren;
