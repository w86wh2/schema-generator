---
hero:
  title: FormRender Generator
  desc: form-render 的表单设计器
  actions:
    - text: 在线Demo
      link: /_demos/playground
    - text: 开始使用
      link: /components
---

# Getting Started

### 安装

```bash
npm i fr-generator
```

### 使用

```js
import React from 'react';
import Generator from 'fr-generator';

const defaultValue = {
  propsSchema: {
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
  return (
    <div style={{ height: '100vh' }}>
      <Generator defaultValue={defaultValue} templates={templates} />
    </div>
  );
};

export default Demo;
```

1. 代码展示效果见 Demo。
2. 目前支持 2 个 props：`defaultValue`，`templates`

- **defaultValue:** 默认一进入编辑器展示的表单对应的 schema。格式参考 schema 生成器的输出 schema
- **templates:** 常用的 schema 模板，模板方便用户点击使用。格式参照上面代码：text 按钮文案，name 对应的字段

3. 可以从 ref 中取到 getValue 方法，获取导出的 schema 值，详见“开始使用”中的现实样例
4. 注意外层要包裹的 div **一定要给一个高度**，否则会默认 min-height: 30vh

<code src='./Playground.jsx' className='hide-demo' />
