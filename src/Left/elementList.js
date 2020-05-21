// 只需写配置，方便可扩展
const commonSettings = {
  $id: {
    title: 'key',
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
    type: 'number',
    'ui:widget': 'slider',
    max: 400,
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
    text: '是否选择',
    name: 'checkbox',
    widget: 'checkbox',
    schema: {
      title: '是否选择',
      type: 'boolean',
    },
    setting: {},
  },
  {
    text: '是否switch',
    name: 'checkbox',
    widget: 'switch',
    schema: {
      title: '是否选择',
      type: 'boolean',
      'ui:widget': 'switch',
    },
    setting: {},
  },
  {
    text: '下拉单选',
    name: 'select',
    widget: 'select',
    schema: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
    },
    setting: {},
  },
  {
    text: '点击单选',
    name: 'radio',
    widget: 'radio',
    schema: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      'ui:widget': 'radio',
    },
    setting: {},
  },
  {
    text: '下拉多选',
    name: 'multiSelect',
    widget: 'multiSelect',
    schema: {
      title: '多选',
      description: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
      'ui:widget': 'multiSelect',
    },
    setting: {},
  },
  {
    text: '点击多选',
    name: 'checkboxes',
    widget: 'checkboxes',
    schema: {
      title: '多选',
      description: '点击多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
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
    name: 'object',
    schema: {
      title: '对象',
      type: 'object',
      properties: {},
    },
    widget: 'map',
    setting: {},
  },
  {
    text: '列表',
    name: 'list',
    widget: 'list',
    schema: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      minItems: {
        title: '最小长度',
        type: 'number',
      },
      maxItems: {
        title: '最大长度',
        type: 'number',
      },
      options: {
        title: '选项',
        type: 'object',
        properties: {
          foldable: {
            title: '是否可折叠',
            type: 'boolean',
          },
        },
      },
    },
  },
  {
    text: '复杂结构',
    name: 'something',
    schema: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        inputName: {
          title: '简单输入框',
          type: 'string',
        },
        selectName: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
        dateName: {
          title: '时间选择',
          type: 'string',
          format: 'date',
        },
        listName: {
          title: '对象数组',
          description: '对象数组嵌套功能',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rangeName: {
                title: '日期/时间范围',
                type: 'range',
                format: 'date',
                'ui:options': {
                  placeholder: ['开始日期', '结束日期'],
                },
              },
            },
          },
        },
      },
    },
  },
];

const result = ELEMENT_LIST.map(item => ({
  ...item,
  setting: { ...commonSettings, ...item.setting },
}));

export default result;
