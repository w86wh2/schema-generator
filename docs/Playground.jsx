import React from 'react';
import Generator from 'fr-generator';
import './index.css';

const defaultValue = {
  propsSchema: {
    type: 'object',
    properties: {},
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Generator defaultValue={defaultValue} />
    </div>
  );
};

export default Demo;
