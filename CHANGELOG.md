# Change Log

### 0.5.2

- [!] 解决了乱输入 schema 的时候会 crash 页面的问题

### 0.5.1

- [!] propsSchema 和 schema 字段兼容
- [!] 非常长的 description 在 tooltip 模式下正常展示
- [!] 解决样式入侵问题 ([#8](https://github.com/form-render/schema-generator/issues/8))
- [!] 解决了 switch 组件展示丑的问题
- [!] 官网大幅翻新，demo 可直接跳转到 form-render 的 playground 方便验证

### 0.5.0

- [+] 添加 `setValue` （注入 schema） 和 `copyValue`（拷贝到剪切板） 方法，可以通过 ref 调用
- [+] 新增 props `extraButtons` 用于添加更多定制按钮到顶栏

### 0.4.0

- [+] 添加 transformer 参数
- [!] 大幅升级文档，添加 formily 的支持 demo

### 0.3.4

- [!] 左栏统一到 rem，确保展示正确

### 0.3.3

- [!] 导入的 schema 可以不一定是 json 格式，也可以是 js object（就是 key 可以没有引号）

### 0.3.2

- [!] 提供 `getValue` 方法，可以通过 ref 调用，在外部获取 schema
- [!]  组件适配外层大小
- [!]  根据宽度做了一定的展示自适应
- [!] 修复不能识别的`ui:widget`时，会报错，现在渲染默认兜底组件

### 0.3.1

- [!] 文档修改、删除“保存”按钮

### 0.3.0

- [+] 添加 submit 入参，作为“保存”按钮的回调函数，入参是导出的 schema
- [!] 模板（templates）代替存档（saves）概念

### 0.2.2

- [!] fix dependencies bug

### 0.2.1

- [!] 更新文档配置
- [!] 安卓 moment 的 dependencies，而不隐式引入

### 0.2.0

- [+] 项目组件化，添加 saves 和 defaultValue 两个 props
- [+] 切换到 dumi，添加官方文档
