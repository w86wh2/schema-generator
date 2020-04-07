import React from 'react';
import { useStore } from '../hooks';
import FR from './index';

const RenderChildren = ({ children = [], simple }) => {
  const { onItemChange, flatten } = useStore();
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          id: child,
          simple,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderChildren;
