import React, { useMemo } from 'react';
import { useSet } from './hooks';
import './App.css';
import {
  flattenSchema,
  idToSchema,
  combineSchema,
  dataToFlatten,
  flattenToData,
} from './utils';
import SCHEMA from './json/basic.json';
import FR from './FR';
import 'antd/dist/antd.css';
import 'tachyons';

function App() {
  const [state, setState] = useSet({
    formData: SCHEMA.formData,
    schema: SCHEMA,
  });

  const onChange = (data) => {
    setState({ formData: data });
  };

  const onSchemaChange = (newSchema) => {
    const result = { ...state.schema, propsSchema: newSchema };
    setState({ schema: result });
  };

  return (
    <div className="pa4">
      <Wrapper
        schema={state.schema}
        formData={state.formData}
        onChange={onChange}
        onSchemaChange={onSchemaChange}
        displayType="row"
        showDescIcon
      />
    </div>
  );
}

export default App;

const Wrapper = ({
  schema,
  formData,
  onChange,
  onSchemaChange,
  ...globalProps
}) => {
  const _schema = combineSchema(schema.propsSchema, schema.uiSchema);
  const flatten = flattenSchema(_schema);

  const flattenWithData = dataToFlatten(flatten, formData);
  console.group('flatten');
  console.log(flattenWithData);
  console.groupEnd();

  const newSchema = idToSchema(flattenWithData);
  const newData = flattenToData(flattenWithData);
  console.group('schema');
  console.log(newSchema, newData);
  console.groupEnd();

  const onItemChange = (key, value) => {
    flattenWithData[key] = value;
    const newSchema = idToSchema(flattenWithData);
    const newData = flattenToData(flattenWithData);
    onChange(newData);
    //TODO: 判断只有schema变化时才
    onSchemaChange(newSchema);
  };

  return (
    <FR
      flatten={flattenWithData}
      onItemChange={onItemChange}
      globalProps={globalProps}
    />
  );
};
