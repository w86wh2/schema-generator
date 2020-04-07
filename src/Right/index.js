import React from 'react';
import './index.css';
import { Wrapper } from '../App';
import { useSet } from '../hooks';
import SCHEMA from '../json/basic.json';
import { widgets } from '../widgets/antd';

export default function Right() {
  const [state, setState] = useSet({
    settingData: SCHEMA.formData,
    settingSchema: SCHEMA,
  });

  const { settingSchema, settingData } = state;

  const onChange = (data) => {
    setState({ settingData: data });
  };

  return (
    <div className="right-side pa3">
      <Wrapper
        schema={settingSchema}
        formData={settingData}
        onChange={onChange}
        displayType="row"
        showDescIcon
        widgets={widgets}
        preview={true}
      />
    </div>
  );
}
