import React from 'react';
import { useSet } from './hooks';
// import SCHEMA from './json/basic.json';
import Wrapper from './Wrapper';
import { widgets } from './widgets/antd';
import 'antd/dist/antd.css';
import 'tachyons';
import './App.css';

const SCHEMA = {
  propsSchema: {
    type: 'object',
  },
  uiSchema: {},
  formData: {},
};

function App() {
  const [state, setState] = useSet({
    formData: SCHEMA.formData,
    schema: SCHEMA,
    selected: undefined,
    hovering: undefined,
    preview: false,
  });

  const { schema, formData, preview, ...rest } = state;

  const onChange = (data) => {
    setState({ formData: data });
  };

  const onSchemaChange = (newSchema) => {
    const result = { ...schema, propsSchema: newSchema };
    setState({ schema: result });
  };

  return (
    <Wrapper
      schema={schema}
      formData={formData}
      onChange={onChange}
      onSchemaChange={onSchemaChange}
      displayType="row"
      showDescIcon
      widgets={widgets}
      preview={preview}
      setState={setState}
      simple={false}
      {...rest}
    />
  );
}

export default App;
