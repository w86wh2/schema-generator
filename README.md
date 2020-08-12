# FR 可视化 schema 编辑器

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*4QYNTbKU6xAAAAAAAAAAAABkARQnAQ?raw=true" width="750px"/>

<img src="https://gw.alipayobjects.com/mdn/rms_e18934/afts/img/A*FfTuRYjRd1AAAAAAAAAAAABkARQnAQ?raw=true" alt="schema编辑器" width='750px' />

### 安装

```bash
npm i fr-generator
```

### 使用

```js
import React from 'react';
import Generator from 'fr-generator';

const defaultValue = {
  schema: {
    type: 'object',
    properties: {
      inputName: {
        title: '简单输入框',
        type: 'string',
      },
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

const templates = [
  {
    text: '模板1',
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
      },
    },
  },
];

const Demo = () => {
  const submit = schema => {
    alert(JSON.stringify(schema));
  };

  return (
    <Generator
      defaultValue={defaultValue}
      templates={templates}
      submit={submit}
    />
  );
};

export default Demo;
```

代码展示效果见 Demo。
目前支持 3 个 props：`defaultValue`，`templates` 和 `submit`

- **defaultValue:** 默认一进入编辑器展示的表单对应的 schema。格式参考 schema 生成器的输出 schema
- **templates:** 常用的 schema 模板，模板方便用户点击使用。格式参照上面代码：text 按钮文案，name 对应的字段
- **submit:** 提交按钮的 callback，入参是导出的 schema
