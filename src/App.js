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
import { Ctx, PropsCtx, InnerCtx } from './context';
import SCHEMA from './json/basic.json';
import FR from './FR';
import { widgets } from './widgets/antd';
import 'antd/dist/antd.css';
import 'tachyons';

function App() {
  const [state, setState] = useSet({
    formData: SCHEMA.formData,
    schema: SCHEMA,
    selected: undefined,
  });

  const { schema, formData, selected } = state;

  const onChange = (data) => {
    setState({ formData: data });
  };

  const onSchemaChange = (newSchema) => {
    const result = { ...schema, propsSchema: newSchema };
    setState({ schema: result });
  };

  return (
    <Ctx.Provider value={setState}>
      <div className="pa4">
        <Wrapper
          schema={schema}
          formData={formData}
          onChange={onChange}
          onSchemaChange={onSchemaChange}
          displayType="row"
          showDescIcon
          widgets={widgets}
          selected={selected}
        />
      </div>
    </Ctx.Provider>
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
  // console.group('flatten');
  // console.log(flattenWithData);
  // console.groupEnd();
  console.log('render');

  const onFlattenChange = (newFlatten) => {
    const newSchema = idToSchema(newFlatten);
    const newData = flattenToData(newFlatten);
    // console.group('schema');
    // console.log(flattenWithData, newData);
    // console.groupEnd();
    //TODO: 判断只有schema变化时才
    onSchemaChange(newSchema);
    onChange(newData);
  };

  const onItemChange = (key, value) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData);
  };

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData,
    onFlattenChange,
    onItemChange,
  };

  return (
    <PropsCtx.Provider value={globalProps}>
      <InnerCtx.Provider value={store}>
        <FR />
      </InnerCtx.Provider>
    </PropsCtx.Provider>
  );
};

Wrapper.defaultProps = {
  labelWidth: 120,
};
