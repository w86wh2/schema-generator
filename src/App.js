import React from 'react';
import { useSet } from './hooks';
// import SCHEMA from './json/basic.json';
import FRWrapper from './FRWrapper';
import { widgets } from './widgets/antd';
import { mapping } from './mapping';
import 'antd/dist/antd.css';
import 'tachyons';
import './App.css';

const SCHEMA = {
  propsSchema: {
    type: 'object',
    properties: {},
  },
  uiSchema: {},
  formData: {},
};

function App() {
  const initGlobal = {
    displayType: 'row',
  };

  const [state, setState] = useSet({
    formData: SCHEMA.formData,
    schema: SCHEMA,
    selected: undefined,
    hovering: undefined,
    preview: false,
    ...initGlobal,
  });

  const { schema, formData, preview, selected, hovering, ...rest } = state;

  const { displayType } = rest;
  const showDescIcon = displayType === 'row' ? true : false;

  const onChange = data => {
    setState({ formData: data });
  };

  const onSchemaChange = newSchema => {
    const result = { ...schema, propsSchema: newSchema };
    setState({ schema: result });
  };

  const _mapping = { ...mapping, array: 'listEditor' };

  const globalProps = {
    preview,
    setState,
    simple: false,
    mapping: _mapping,
    widgets,
    selected,
    hovering,
    ...rest,
    showDescIcon,
  };

  const FRProps = {
    schema,
    formData,
    onChange,
    onSchemaChange,
    ...globalProps,
  };

  return <FRWrapper {...FRProps} />;
}

export default App;
