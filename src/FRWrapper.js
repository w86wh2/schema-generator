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
// import SCHEMA from './json/basic.json';
import FR from './FR';
import { Modal, Input } from 'antd';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import 'tachyons';
import './App.css';

const { TextArea } = Input;

const Wrapper = ({
  simple = true,
  schema,
  formData,
  onChange,
  onSchemaChange,
  ...globalProps
}) => {
  const [local, setLocal] = useSet({ showModal: false });
  const {
    preview,
    setState,
    mapping,
    widgets,
    selected,
    hovering,
    ...rest
  } = globalProps;
  const _schema = combineSchema(schema.propsSchema, schema.uiSchema);
  const flatten = flattenSchema(_schema);
  const flattenWithData = dataToFlatten(flatten, formData);

  const onFlattenChange = newFlatten => {
    const newSchema = idToSchema(newFlatten);
    const newData = flattenToData(newFlatten);
    // 判断只有schema变化时才调用，一般需求的用户不需要
    if (onSchemaChange) {
      onSchemaChange(newSchema);
    }
    onChange(newData);
  };

  const onItemChange = (key, value) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData);
  };

  const toggleModal = () => setLocal({ showModal: !local.showModal });

  const clearSchema = () => {
    setState({
      schema: {
        propsSchema: {
          type: 'object',
          properties: {},
        },
      },
      formData: {},
      selected: undefined,
    });
  };

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData,
    onFlattenChange,
    onItemChange,
    ...globalProps,
  };

  let displaySchemaString = '';

  try {
    const propsSchema = idToSchema(flattenWithData, '#', true);
    displaySchemaString = JSON.stringify({ propsSchema, ...rest }, null, 2);
  } catch (error) {}

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
          <div className='flex vh-100 overflow-hidden'>
            <Left />
            <div className='mid-layout pr2'>
              <div className='mv3 mh1'>
                <Button type='primary' className='mr2' onClick={toggleModal}>
                  导出schema
                </Button>
                <Button
                  className='mr2'
                  onClick={() => {
                    setState({ preview: !preview, selected: '#' });
                  }}
                >
                  {preview ? '开始编辑' : '最终展示'}
                </Button>
                <Button className='mr2' onClick={clearSchema}>
                  清空
                </Button>
              </div>
              <FR preview={preview} />
            </div>
            <Right globalProps={rest} />
            <Modal
              visible={local.showModal}
              onOk={toggleModal}
              onCancel={toggleModal}
            >
              <div className='mt3'>
                <TextArea
                  style={{ fontSize: 12 }}
                  value={displaySchemaString}
                  autoSize={{ minRows: 10, maxRows: 30 }}
                />
              </div>
            </Modal>
          </div>
        </InnerCtx.Provider>
      </PropsCtx.Provider>
    </Ctx.Provider>
  );
};

Wrapper.defaultProps = {
  labelWidth: 120,
};

export default Wrapper;
