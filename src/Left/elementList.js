// 只需写配置，方便可扩展

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
      title: {
        title: '标题',
        type: 'string',
      },
      description: {
        title: '说明',
        type: 'string',
      },
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
    widget: 'dateRange',
    setting: {},
  },
];

export default ELEMENT_LIST;
