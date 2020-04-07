import React, { useMemo } from 'react';
import { useSet } from './hooks';
import Left from './Left';
import Right from './Right';
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
import { Button } from 'antd';
import 'antd/dist/antd.css';
import 'tachyons';
import './App.css';

function App() {
  const [state, setState] = useSet({
    formData: SCHEMA.formData,
    schema: SCHEMA,
    selected: undefined,
    preview: false,
  });

  const { schema, formData, selected, preview } = state;

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
      selected={selected}
      preview={preview}
      setState={setState}
      simple={false}
    />
  );
}

export default App;

export const Wrapper = ({
  simple = true,
  schema,
  formData,
  onChange,
  onSchemaChange,
  ...globalProps
}) => {
  const { setState, preview } = globalProps;
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
  if (simple) {
    return (
      <Ctx.Provider value={setState}>
        <PropsCtx.Provider value={globalProps}>
          <InnerCtx.Provider value={store}>
            <FR preview={true} />
          </InnerCtx.Provider>
        </PropsCtx.Provider>
      </Ctx.Provider>
    );
  }

  return (
    <Ctx.Provider value={setState}>
      <PropsCtx.Provider value={globalProps}>
        <InnerCtx.Provider value={store}>
          <div className="pa3 flex">
            <Left />
            <div className="mid-layout">
              <div className="mb3">
                <Button type="primary" className="mr2" onClick={() => {}}>
                  导出schema
                </Button>
                <Button
                  onClick={() => {
                    setState({ preview: !preview, selected: '#' });
                  }}
                >
                  {preview ? '开始编辑' : '展示最终'}
                </Button>
              </div>
              <FR preview={preview} />
            </div>
            <Right />
          </div>
        </InnerCtx.Provider>
      </PropsCtx.Provider>
    </Ctx.Provider>
  );
};

Wrapper.defaultProps = {
  labelWidth: 120,
};
