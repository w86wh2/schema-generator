import React from 'react';
import { useStore } from '../hooks';
import FR from './index';

const RenderChildren = ({ children = [], preview }) => {
  const { onItemChange, flatten } = useStore();
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          id: child,
          preview,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderChildren;
