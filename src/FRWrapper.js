import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSet, useStorageState } from './hooks';
import copyTOClipboard from 'copy-text-to-clipboard';
import Left from './Left';
import Right from './Right';
import {
  flattenSchema,
  idToSchema,
  combineSchema,
  dataToFlatten,
  flattenToData,
  getSaveNumber,
  looseJsonParse,
} from './utils';
import { Ctx, PropsCtx, InnerCtx } from './context';
// import SCHEMA from './json/basic.json';
import FR from './FR';
import { Modal, Input, message } from 'antd';
import { Button } from 'antd';

const { TextArea } = Input;

function Wrapper(
  {
    simple = true,
    schema,
    formData,
    onChange,
    onSchemaChange,
    templates,
    submit,
    transformFrom,
    transformTo,
    extraButtons = [],
    ...globalProps
  },
  ref,
) {
  const [local, setLocal] = useSet({
    showModal: false,
    showModal2: false,
    showModal3: false,
    schemaForImport: '',
  });

  const [saveList, setSaveList] = useState(templates || []);

  const saveNameRef = useRef();

  const {
    preview,
    setState,
    mapping,
    widgets,
    selected,
    hovering,
    ...rest
  } = globalProps;
  let _schema = {};
  if (schema && schema.propsSchema) {
    _schema = combineSchema(schema.propsSchema, schema.uiSchema);
  } else {
    _schema = combineSchema(schema.schema, schema.uiSchema);
  }
  const flatten = flattenSchema(_schema);
  const flattenWithData = dataToFlatten(flatten, formData);
  // console.log(flatten);

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
  const toggleModal2 = () => setLocal({ showModal2: !local.showModal2 });
  const toggleModal3 = () => setLocal({ showModal3: !local.showModal3 });

  const clearSchema = () => {
    // 兼容旧版的propsSchema
    let defaultSchema = {
      schema: {
        type: 'object',
        properties: {},
      },
    };
    if (schema && schema.propsSchema) {
      defaultSchema = {
        propsSchema: {
          type: 'object',
          properties: {},
        },
      };
    }
    setState({
      ...defaultSchema,
      formData: {},
      selected: undefined,
    });
  };

  const onTextareaChange = e => {
    setLocal({ schemaForImport: e.target.value });
  };

  const importSchema = () => {
    try {
      const info = transformFrom(looseJsonParse(local.schemaForImport));
      const { propsSchema, schema, ...rest } = info;
      const result = {
        schema: {
          schema,
        },
        formData: {},
        selected: undefined,
        ...rest,
      };
      if (propsSchema) {
        result = {
          schema: {
            propsSchema,
          },
          formData: {},
          selected: undefined,
          ...rest,
        };
      }
      setState(result);
    } catch (error) {
      message.info('格式不对哦，请重新尝试'); // 可以加个格式哪里不对的提示
    }
    toggleModal2();
  };

  let displaySchema = {};
  let displaySchemaString = '';
  try {
    const propsSchema = idToSchema(flattenWithData, '#', true);
    if (schema.propsSchema) {
      displaySchema = transformTo({ propsSchema, ...rest });
    } else {
      displaySchema = transformTo({ schema: propsSchema, ...rest });
    }
    displaySchemaString = JSON.stringify(displaySchema, null, 2);
  } catch (error) {}

  const copySchema = () => {
    copyTOClipboard(displaySchemaString);
    message.info('复制成功');
    toggleModal();
  };

  // const handleSubmit = () => {
  //   submit(displaySchema);
  // };

  const getValue = () => {
    return displaySchema;
  };

  const setValue = value => {
    try {
      const { schema, propsSchema, ...rest } = value;
      let _schema = { schema };
      if (propsSchema) {
        _schema = { propsSchema };
      }
      setState(state => ({
        ...state,
        schema: _schema,
        formData: {},
        selected: undefined,
        ...rest,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const copyValue = () => {
    copyTOClipboard(displaySchemaString);
  };

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    copyValue,
  }));

  const saveSchema = () => {
    try {
      const text = saveNameRef.current.state.value;
      const name = 'save' + getSaveNumber();
      const schema = idToSchema(flattenWithData, '#', true);
      setSaveList([...saveList, { text, name, schema }]);
      toggleModal3();
    } catch (error) {
      message.error('保存失败');
    }
  };

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData,
    onFlattenChange,
    onItemChange,
    ...globalProps,
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
          <div className="fr-wrapper">
            <Left saveList={saveList} setSaveList={setSaveList} />
            <div className="mid-layout pr2">
              <div className="mv2 mh1">
                <Button
                  className="mr2 mb1"
                  onClick={() => {
                    setState({ preview: !preview, selected: '#' });
                  }}
                >
                  {preview ? '开始编辑' : '最终展示'}
                </Button>
                <Button className="mr2" onClick={clearSchema}>
                  清空
                </Button>
                {/* <Button className="mr2" onClick={toggleModal3}>
                  保存
                </Button> */}
                <Button className="mr2" onClick={toggleModal2}>
                  导入
                </Button>
                <Button type="primary" className="mr2" onClick={toggleModal}>
                  导出schema
                </Button>
                {extraButtons && Array.isArray(extraButtons)
                  ? extraButtons.map((item, idx) => {
                      return (
                        <Button
                          key={idx.toString()}
                          className="mr2"
                          onClick={item.onClick}
                        >
                          {item.text}
                        </Button>
                      );
                    })
                  : null}
                {/* <Button type="primary" className="mr2" onClick={handleSubmit}>
                  保存
                </Button> */}
              </div>
              <div className="dnd-container">
                <FR preview={preview} />
              </div>
            </div>
            <Right globalProps={rest} />
            <Modal
              visible={local.showModal}
              onOk={copySchema}
              onCancel={toggleModal}
              okText="复制"
              cancelText="取消"
            >
              <div className="mt3">
                <TextArea
                  style={{ fontSize: 12 }}
                  value={displaySchemaString}
                  autoSize={{ minRows: 10, maxRows: 30 }}
                />
              </div>
            </Modal>
            <Modal
              visible={local.showModal2}
              okText="导入"
              cancelText="取消"
              onOk={importSchema}
              onCancel={toggleModal2}
            >
              <div className="mt3">
                <TextArea
                  style={{ fontSize: 12 }}
                  value={local.schemaForImport}
                  placeholder="贴入需要导入的schema，模样可点击导出schema参考"
                  onChange={onTextareaChange}
                  autoSize={{ minRows: 10, maxRows: 30 }}
                />
              </div>
            </Modal>
            <Modal
              visible={local.showModal3}
              okText="确定"
              cancelText="取消"
              onOk={saveSchema}
              onCancel={toggleModal3}
            >
              <div className="mt4 flex items-center">
                <div style={{ width: 100 }}>保存名称：</div>
                <div style={{ width: 280 }}>
                  <Input
                    defaultValue={'存档' + getSaveNumber()}
                    ref={saveNameRef}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </InnerCtx.Provider>
      </PropsCtx.Provider>
    </Ctx.Provider>
  );
}

const FRWrapper = forwardRef(Wrapper);

FRWrapper.defaultProps = {
  labelWidth: 120,
};

export default FRWrapper;
