import nanoid from 'nanoid';

// 克隆对象
export function clone(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    return data;
  }
}

// '3' => true, 3 => true, undefined => false
export function isLooselyNumber(num) {
  if (typeof num === 'number') return true;
  if (typeof num === 'string') {
    return !Number.isNaN(Number(num));
  }
  return false;
}

export function isCssLength(str) {
  if (typeof str !== 'string') return false;
  return str.match(/^([0-9])*(%|px|rem|em)$/i);
}

// 深度对比
export function isDeepEqual(param1, param2) {
  if (param1 === undefined && param2 === undefined) return true;
  else if (param1 === undefined || param2 === undefined) return false;
  else if (param1.constructor !== param2.constructor) return false;

  if (param1.constructor === Array) {
    if (param1.length !== param2.length) return false;
    for (let i = 0; i < param1.length; i++) {
      if (param1[i].constructor === Array || param1[i].constructor === Object) {
        if (!isDeepEqual(param1[i], param2[i])) return false;
      } else if (param1[i] !== param2[i]) return false;
    }
  } else if (param1.constructor === Object) {
    if (Object.keys(param1).length !== Object.keys(param2).length) return false;
    for (let i = 0; i < Object.keys(param1).length; i++) {
      const key = Object.keys(param1)[i];
      if (
        param1[key] &&
        typeof param1[key] !== 'number' &&
        (param1[key].constructor === Array ||
          param1[key].constructor === Object)
      ) {
        if (!isDeepEqual(param1[key], param2[key])) return false;
      } else if (param1[key] !== param2[key]) return false;
    }
  } else if (param1.constructor === String || param1.constructor === Number) {
    return param1 === param2;
  }
  return true;
}

// 时间组件
export function getFormat(format) {
  let dateFormat;
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'time':
      dateFormat = 'HH:mm:ss';
      break;
    default:
      // dateTime
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
  }
  return dateFormat;
}

export function hasRepeat(list) {
  return list.find(
    (x, i, self) =>
      i !== self.findIndex((y) => JSON.stringify(x) === JSON.stringify(y))
  );
}

// ----------------- schema 相关

// 合并propsSchema和UISchema。由于两者的逻辑相关性，合并为一个大schema能简化内部处理
export function combineSchema(propsSchema, uiSchema) {
  const propList = getChildren(propsSchema);
  const newList = propList.map((p) => {
    const { name } = p;
    const { type, enum: options, properties, items } = p.schema;
    const isObj = type === 'object' && properties;
    const isArr = type === 'array' && items && !options; // enum + array 代表的多选框，没有sub
    const ui = name && uiSchema[p.name];
    if (!ui) {
      return p;
    }
    // 如果是list，递归合并items
    if (isArr) {
      const newItems = combineSchema(items, ui.items || {});
      return { ...p, schema: { ...p.schema, ...ui, items: newItems } };
    }
    // object递归合并整个schema
    if (isObj) {
      const newSchema = combineSchema(p.schema, ui);
      return { ...p, schema: newSchema };
    }
    return { ...p, schema: { ...p.schema, ...ui } };
  });

  const newObj = {};
  newList.forEach((s) => {
    newObj[s.name] = s.schema;
  });

  const topLevelUi = {};
  Object.keys(uiSchema).forEach((key) => {
    if (typeof key === 'string' && key.substring(0, 3) === 'ui:') {
      topLevelUi[key] = uiSchema[key];
    }
  });
  if (isEmpty(newObj)) {
    return { ...propsSchema, ...topLevelUi };
  }
  return { ...propsSchema, ...topLevelUi, properties: newObj };
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// 获得propsSchema的children
function getChildren(schema) {
  const {
    // object
    properties,
    // array
    items,
    type,
  } = schema;
  if (!properties && !items) {
    return [];
  }
  let schemaSubs = {};
  if (type === 'object') {
    schemaSubs = properties;
  }
  if (type === 'array') {
    schemaSubs = items;
  }
  return Object.keys(schemaSubs).map((name) => ({
    schema: schemaSubs[name],
    name,
  }));
}

// 合并多个schema树，比如一个schema的树节点是另一个schema
export function combine() {}

// 代替eval的函数
export const parseString = (string) =>
  Function('"use strict";return (' + string + ')')();

// 解析函数字符串值
export const evaluateString = (string, formData, rootValue) =>
  Function(`"use strict";
    const rootValue = ${JSON.stringify(rootValue)};
    const formData = ${JSON.stringify(formData)};
    return (${string})`)();

// 判断schema的值是是否是“函数”
// JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数，也可使用@标记，不推荐。
export function isFunction(func) {
  if (typeof func === 'function') {
    return true;
  }
  if (typeof func === 'string' && func.substring(0, 1) === '@') {
    return func.substring(1);
  }
  if (
    typeof func === 'string' &&
    func.substring(0, 2) === '{{' &&
    func.substring(func.length - 2, func.length) === '}}'
  ) {
    return func.substring(2, func.length - 2);
  }
  return false;
}

// 判断schema中是否有属性值是函数表达式
export function isFunctionSchema(schema) {
  return Object.keys(schema).some((key) => {
    if (typeof schema[key] === 'function') {
      return true;
    } else if (typeof schema[key] === 'string') {
      return isFunction(schema[key]);
    } else if (typeof schema[key] === 'object') {
      return isFunctionSchema(schema[key]);
    } else {
      return false;
    }
  });
}

// 后面三个参数都是内部递归使用的，将schema的树形结构扁平化成一层, 每个item的结构
// {
//   parent: '#',
//   schema: ...,
//   children: []
// }
export function flattenSchema(schema, name = '#', parent, result = {}) {
  const _schema = { ...schema };
  if (!_schema.$id) {
    _schema.$id = name; // 给生成的schema添加一个唯一标识，方便从schema中直接读取
  }
  const children = [];
  const isObj = _schema.type === 'object' && _schema.properties;
  const isList =
    _schema.type === 'array' && _schema.items && _schema.items.properties;
  if (isObj) {
    Object.entries(_schema.properties).forEach(([key, value]) => {
      const uniqueName = name + '/' + key;
      children.push(uniqueName);
      flattenSchema(value, uniqueName, name, result);
    });
    delete _schema.properties;
  }
  if (isList) {
    Object.entries(_schema.items.properties).forEach(([key, value]) => {
      const uniqueName = name + '/' + key;
      children.push(uniqueName);
      flattenSchema(value, uniqueName, name, result);
    });
    delete _schema.items.properties;
  }
  if (_schema.type) {
    result[name] = { parent, schema: _schema, children };
  }
  return result;
}

export const getKeyFromUniqueId = (uniqueId = '#') => {
  const arr = uniqueId.split('/');
  return arr[arr.length - 1];
};

export const changeKeyFromUniqueId = (uniqueId = '#', key = 'something') => {
  const arr = uniqueId.split('/');
  if (typeof key === 'string' || typeof key === 'number') {
    arr[arr.length - 1] = key;
  }
  return arr.join('/');
};

export function idToSchema(flatten, id = '#') {
  let schema = {};
  const item = flatten[id];
  if (item) {
    schema = { ...item.schema };
    if (item.children.length > 0) {
      item.children.forEach((child) => {
        const key = getKeyFromUniqueId(child);
        if (schema.type === 'object') {
          if (!schema.properties) {
            schema.properties = {};
          }
          schema.properties[key] = idToSchema(flatten, child);
        }
        if (
          schema.type === 'array' &&
          schema.items &&
          schema.items.type === 'object'
        ) {
          if (!schema.items.properties) {
            schema.items.properties = {};
          }
          schema.items.properties[key] = idToSchema(flatten, child);
        }
      });
    }
  }
  return schema;
}

// 删除对应id的schema（以及所有它的子schema）
export const deleteSchema = (id, schema) => {
  const flatten = flattenSchema(schema);
  if (id in flatten) {
    delete flatten[id];
  }
  return idToSchema(flatten);
};

// 复制对应id的schema
// export const copySchema = (id, schema) => {
//   const flatten = flattenSchema(schema);
//   let newId = id + '$$' + nanoid(10);
//   if (id && typeof id === 'string' && id.split('$$').length > 1) {
//     newId = id.split('$$')[0] + '$$' + nanoid(10);
//   }
//   if (id in flatten) {
//     // 将创建的新id注入到parent的children array
//     const parent = flatten[id].parent;
//     if (parent && parent in flatten) {
//       const children = flatten[parent].children;
//       try {
//         const idx = children.findIndex((x) => x === id);
//         children.splice(idx + 1, 0, newId);
//       } catch (error) {
//         console.error(error.message);
//       }
//     }

//     try {
//       // 简单的实现一下拷贝
//       flatten[newId] = {
//         parent: flatten[id].parent,
//         schema: { ...flatten[id].schema },
//         children: flatten[id].children,
//       };
//       flatten[newId].schema.$id = newId;
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
//   return [idToSchema(flatten), newId];
// };

export const copyItem = (flatten, $id) => {
  let newFlatten = { ...flatten };
  try {
    const item = flatten[$id];
    const newId = $id + nanoid(6);
    const siblings = newFlatten[item.parent].children;
    const idx = siblings.findIndex((x) => x === $id);
    siblings.splice(idx + 1, 0, newId);
    // 直接copy会让两个元素指向同一个object
    newFlatten[newId] = {
      parent: newFlatten[$id].parent,
      schema: { ...newFlatten[$id].schema },
      data: newFlatten[$id].data,
      children: newFlatten[$id].children,
    };
    newFlatten[newId].schema.$id = newId;
    return [newFlatten, newId];
  } catch (error) {
    console.error(error, 'catcherror');
    return [flatten, $id];
  }
};

// schema的某个id位置后面添加一个名字是key的subSchema，生成新的schema
// TODO: 如果没有任何选中，或者选中的是object，逻辑要变

export const addSchema = ({ id, key, schema, subSchema }) => {
  const flatten = flattenSchema(schema);
  let newId = changeKeyFromUniqueId(id, key) + '$$' + nanoid(10);
  if (id in flatten) {
    // 生成新id，并将其放置于parent节点的children属性中
    const parent = flatten[id].parent;
    if (parent && parent in flatten) {
      const children = flatten[parent].children;
      try {
        const idx = children.findIndex((x) => x === id);
        children.splice(idx + 1, 0, newId);
      } catch (error) {
        console.error(error.message);
      }
    }
    // 生成新节点
    try {
      flatten[newId] = {
        parent: flatten[id].parent,
        schema: subSchema,
        children: [],
      };
      flatten[newId].schema.$id = newId;
    } catch (error) {
      console.error(error.message);
    }
  }
  // 将id也返回，用于ui展示显示
  return [idToSchema(flatten), newId];
};

// export const changeSubSchema = ({ id, schema, subSchema }) => {
//   const flatten = flattenSchema(schema);
//   if (id in flatten) {
//     const oldSchema = flatten[id];
//     const newId = subSchema.$id;
//     if (oldSchema.$id !== subSchema.$id) {
//     }
//   }
// };

// 解析函数字符串值
export const getDataById = (data, idString) => {
  if (idString === '#') return data;
  try {
    const idConnectedByDots = idString
      .split('/')
      .filter((id) => id !== '#')
      .join('.');
    const string = `data.${idConnectedByDots}`;
    const a = `"use strict";
    const data = ${JSON.stringify(data)};
    return ${string}`;
    return Function(a)();
    // TODO: can be better
    // let result = { ...data };
    // idConnectedByDots.forEach((item) => {
    //   result = result[item];
    // });
    // return result;
  } catch (error) {
    return undefined;
  }
};

export const dataToFlatten = (flatten, data) => {
  if (!flatten || !data) return;
  Object.entries(flatten).forEach(([id, item]) => {
    const branchData = getDataById(data, id);
    flatten[id].data = branchData;
  });
  return flatten;
};

export const onChangeById = (onChange) => (id, value) => {};

export const flattenToData = (flatten, id = '#') => {
  try {
    let result = flatten[id].data;
    const ids = Object.keys(flatten);
    const childrenIds = ids.filter((item) => {
      const lengthOfId = id.split('/').length;
      const lengthOfChild = item.split('/').length;
      return item.indexOf(id) > -1 && lengthOfChild > lengthOfId;
    });
    if (childrenIds && childrenIds.length > 0) {
      if (result === undefined) result = {}; // TODO: 是不是就兜undefined？
      childrenIds.forEach((c) => {
        const lengthOfId = id.split('/').length;
        const lengthOfChild = c.split('/').length;
        if (lengthOfChild === lengthOfId + 1) {
          const cData = flattenToData(flatten, c);
          const cKey = getKeyFromUniqueId(c);
          result[cKey] = cData;
        }
      });
    }
    return result;
  } catch (error) {
    return undefined;
  }
};
