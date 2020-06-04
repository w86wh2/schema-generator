import React from 'react';
import { useGlobal, useGlobalProps, useStore } from '../hooks';
import nanoid from 'nanoid';

const Element = ({ text, name, schema }) => {
  const setGlobal = useGlobal();
  const { selected } = useGlobalProps();
  const { flatten, onFlattenChange } = useStore();

  const handleElementClick = () => {
    let _selected = selected || '#';
    let newId;
    // 初始字段是0，说明点击了object、list的里侧
    if ((_selected && _selected[0] === '0') || _selected === '#') {
      try {
        const newFlatten = { ...flatten };
        let oldId = _selected.substring(1);
        newId = oldId + '/' + name + '_' + nanoid(6);
        if (_selected === '#') {
          newId = '#/' + name + '_' + nanoid(6);
          oldId = '#';
        }
        const siblings = newFlatten[oldId].children;
        siblings.push(newId);
        const newItem = {
          parent: oldId,
          schema: { ...schema, $id: newId },
          data: undefined,
          children: [],
        };
        newFlatten[newId] = newItem;
        onFlattenChange(newFlatten);
        setGlobal({ selected: newId });
      } catch (error) {
        console.error(error, 'catch');
      }
      return;
    }

    let _name = name + '_' + nanoid(6);
    const idArr = selected.split('/');
    idArr.pop();
    idArr.push(_name);
    newId = idArr.join('/');
    try {
      const newFlatten = { ...flatten };
      const item = newFlatten[selected];
      const siblings = newFlatten[item.parent].children;
      const idx = siblings.findIndex(x => x === selected);
      siblings.splice(idx + 1, 0, newId);
      const newItem = {
        parent: item.parent,
        schema: { ...schema, $id: newId },
        data: undefined,
        children: [],
      };
      newFlatten[newId] = newItem;
      onFlattenChange(newFlatten);
      setGlobal({ selected: newId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='left-element' onClick={handleElementClick}>
      {text}
    </div>
  );
};

export default Element;
