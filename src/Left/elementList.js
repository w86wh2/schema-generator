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
    name: 'input',
    widget: 'input',
    schema: {
      title: '简单输入框',
      type: 'string',
    },
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
    name: 'textarea',
    widget: 'textarea',
    schema: {
      title: '文本编辑框',
      type: 'string',
      format: 'textarea',
    },
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
    text: '颜色选择',
    name: 'color',
    widget: 'color',
    schema: {
      title: '颜色选择',
      type: 'string',
      format: 'color',
    },
    setting: {},
  },
  {
    text: '日期选择',
    name: 'date',
    widget: 'date',
    schema: {
      title: '日期选择',
      type: 'string',
      format: 'date',
    },
    setting: {},
  },
  {
    text: '图片展示',
    name: 'image',
    widget: 'input',
    schema: {
      title: '图片展示',
      type: 'string',
      format: 'image',
    },
    setting: {},
  },
  {
    text: '数字输入框',
    name: 'number',
    widget: 'number',
    schema: {
      title: '数字输入框',
      type: 'number',
    },
    setting: {},
  },
  {
    text: '数字（slider）',
    name: 'slider',
    widget: 'slider',
    schema: {
      title: '带滑动条',
      type: 'number',
      'ui:widget': 'slider',
    },
    setting: {},
  },
  {
    text: 'date range',
    name: 'dateRange',
    widget: 'dateRange',
    schema: {
      title: '日期范围',
      type: 'range',
      format: 'dateTime',
      'ui:options': {
        placeholder: ['开始时间', '结束时间'],
      },
    },
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
