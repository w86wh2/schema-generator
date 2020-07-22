import React from 'react';
import FRWrapper from '../FRWrapper';
import SCHEMA from './GlobalSettingSchema.json';
// import { widgets } from '../widgets/antd';
import { useGlobalProps } from '../hooks';

export default function ItemSettings() {
  const globalProps = useGlobalProps();

  const {
    hovering,
    mapping,
    preview,
    selected,
    setState,
    widgets,
    ...rest
  } = globalProps;

  const onDataChange = data => {
    setState(state => ({ ...state, ...data }));
  };

  return (
    <div style={{ paddingRight: 24 }}>
      <FRWrapper
        schema={SCHEMA}
        formData={rest}
        onChange={onDataChange}
        displayType="row"
        showDescIcon
        widgets={widgets}
        preview={true}
      />
    </div>
  );
}
