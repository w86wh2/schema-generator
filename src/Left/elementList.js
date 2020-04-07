// 只需写配置，方便可扩展
const ELEMENT_LIST = [
  {
    text: 'input',
    name: 'inputName',
    schema: {
      title: '简单输入框',
      type: 'string',
    },
    setting: {},
  },
  {
    text: 'textarea',
    name: 'textareaName',
    schema: {
      title: '文本编辑框',
      type: 'string',
      format: 'textarea',
    },
    setting: {},
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
    setting: {},
  },
];

export default ELEMENT_LIST;
