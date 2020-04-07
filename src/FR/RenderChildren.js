import React from 'react';
import { useStore } from '../hooks';
import FR from './index';

const RenderChildren = ({ children = [] }) => {
  const { onItemChange, flatten } = useStore();
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
