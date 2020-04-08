// 只需写配置，方便可扩展
const commonSettings = {
  $id: {
    title: '字段名',
    type: 'string',
  },
  title: {
    title: '标题',
    type: 'string',
  },
  description: {
    title: '说明',
    type: 'string',
  },
  width: {
    title: '元素宽度',
    type: 'string',
    'ui:options': {
      placeholder: "例如 '50%'",
    },
  },
  labelWidth: {
    title: '标签宽度',
    type: 'string',
    'ui:options': {
      placeholder: '默认值是 120',
    },
  },
};

const ELEMENT_LIST = [
  {
    text: 'input',
    name: 'inputName',
    schema: {
      title: '简单输入框',
      type: 'string',
    },
    widget: 'input',
    setting: {
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
    },
  },
  {
    text: 'textarea',
    name: 'textareaName',
    schema: {
      title: '文本编辑框',
      type: 'string',
      format: 'textarea',
    },
    widget: 'textarea',
    setting: {
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
    },
  },
  {
    text: 'date range',
    name: 'dateRangeName',
    schema: {
      title: '日期范围',
      type: 'range',
      format: 'dateTime',
      'ui:options': {
        placeholder: ['开始时间', '结束时间'],
      },
    },
    widget: 'dateRange',
    setting: {
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
    },
  },
  {
    text: 'object',
    name: 'objectName',
    schema: {
      title: '对象',
      type: 'object',
      properties: {},
    },
    widget: 'map',
    setting: {},
  },
];

const result = ELEMENT_LIST.map((item) => ({
  ...item,
  setting: { ...commonSettings, ...item.setting },
}));

export default result;
