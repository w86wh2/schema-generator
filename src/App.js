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
    properties: {
      listName: {
        title: '对象数组',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            inputName: {
              title: '简单输入框',
              type: 'string',
            },
          },
        },
      },
    },
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

  const onChange = data => {
    setState({ formData: data });
  };

  const onSchemaChange = newSchema => {
    const result = { ...schema, propsSchema: newSchema };
    setState({ schema: result });
  };

  const _mapping = preview ? mapping : { ...mapping, array: 'listEditor' };

  const globalProps = {
    preview,
    setState,
    displayType: 'row',
    showDescIcon: true,
    widgets,
    simple: false,
    mapping: _mapping,
    ...rest,
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
