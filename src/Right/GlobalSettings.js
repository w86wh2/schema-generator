import React from 'react';
import FRWrapper from '../FRWrapper';
import SCHEMA from './GlobalSettingSchema.json';
import { widgets } from '../widgets/antd';

export default function ItemSettings() {
  let settingData = {};

  const onDataChange = newSchema => {};

  return (
    <FRWrapper
      schema={SCHEMA}
      formData={settingData}
      onChange={onDataChange}
      displayType='row'
      showDescIcon
      widgets={widgets}
      preview={true}
    />
  );
}
