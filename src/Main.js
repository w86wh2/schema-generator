import React, { useEffect, forwardRef } from 'react';
import { useSet } from './hooks';
// import SCHEMA from './json/basic.json';
import FRWrapper from './FRWrapper';
import { widgets } from './widgets/antd';
import { mapping } from './mapping';
import './atom.css';
import './Main.css';
import 'antd/dist/antd.css';
import { oldSchemaToNew } from './utils';

// const SCHEMA = {
//   schema: {
//     type: 'object',
//     properties: {
//       obj1: {
//         title: '对象',
//         type: 'object',
//       },
//       obj2: {
//         title: '对象',
//         type: 'object',
//         properties: {
//           obj3: {
//             title: '对象',
//             type: 'object',
//             properties: {
//               col: {
//                 title: '颜色选择',
//                 type: 'string',
//                 format: 'color',
//               },
//               img: {
//                 title: '图片展示',
//                 type: 'string',
//                 format: 'image',
//                 'ui:options': {},
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   uiSchema: {},
//   formData: {},
// };

const DEFAULT_SCHEMA = {
  schema: {
    type: 'object',
    properties: {},
  },
  uiSchema: {},
  formData: {},
};

// TODO: formData 不存在的时候会报错：can't find # of undefined

function App(
  { defaultValue, templates, submit, transformer, extraButtons },
  ref,
) {
  const initGlobal = {
    displayType: 'row',
  };

  let transformFrom = a => a;
  let transformTo = a => a;
  try {
    if (typeof transformer.from === 'function') {
      transformFrom = transformer.from;
    }
    if (typeof transformer.to === 'function') {
      transformTo = transformer.to;
    }
  } catch (error) {}

  const [state, setState] = useSet({
    formData: {},
    schema: {},
    isNewVersion: true, // 用schema字段，还是用propsSchema字段，这是一个问题
    selected: undefined, // 被选中的$id, 如果object/array的内部，以首字母0标识
    hovering: undefined, // 目前没有用到
    preview: false, // preview = false 是编辑模式
    ...initGlobal, // form-render 的全局props等
  });

  // 收口点 propsSchema 到 schema 的转换 (一共3处，其他两个是 importSchema 和 setValue，在 FRWrapper 文件)
  useEffect(() => {
    const schema = defaultValue ? transformFrom(defaultValue) : DEFAULT_SCHEMA;
    if (schema && schema.propsSchema) {
      setState({ isNewVersion: false });
    } else {
      setState({ isNewVersion: true });
    }
    setState({
      schema: oldSchemaToNew(schema), // 旧的转新的，新的不变
      formData: (schema && schema.formData) || {},
    });
  }, [defaultValue]);

  const {
    schema,
    formData,
    preview,
    selected,
    hovering,
    isNewVersion,
    ...rest
  } = state;

  const { displayType } = rest;
  const showDescIcon = displayType === 'row' ? true : false;

  const onChange = data => {
    setState({ formData: data });
  };

  const onSchemaChange = newSchema => {
    const result = { ...schema };
    result.schema = newSchema;
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
    templates,
    submit,
    transformFrom,
    transformTo,
    isNewVersion,
    extraButtons,
    ...globalProps,
  };

  return <FRWrapper ref={ref} {...FRProps} />;
}

export default forwardRef(App);
