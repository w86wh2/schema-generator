import React from 'react';
import './Wrapper.css';
import { useGlobal, useGlobalProps, useStore } from '../hooks';
import nanoid from 'nanoid';

export default function Wrapper({ item, inside = false, children }) {
  const { flatten, onItemChange, onFlattenChange } = useStore();
  const setGlobal = useGlobal();
  const { selected } = useGlobalProps();
  const { schema } = item;
  const { $id, type } = schema;
  let isSelected = selected === $id && !inside;
  if (selected && selected[0] === '0') {
    isSelected = selected.substring(1) === $id && inside;
  }

  let overwriteStyle = {};
  if (inside) {
    overwriteStyle = { marginLeft: 12, padding: '8px 8px 0 0' };
  } else if ($id === '#') {
    overwriteStyle = { padding: 12 };
  } else if (type === 'object') {
    overwriteStyle = { paddingTop: 12 };
  }
  if (isSelected) {
    overwriteStyle = {
      ...overwriteStyle,
      outline: '3px solid #19f',
      borderColor: '#fff',
    };
  }

  const handleClick = (e) => {
    e.stopPropagation();
    const _id = inside ? '0' + $id : $id;
    setGlobal({ selected: _id });
  };

  const deleteItem = (e) => {
    e.stopPropagation();
    const newFlatten = { ...flatten };
    delete newFlatten[$id];
    onFlattenChange(newFlatten);
    // onItemChange($id, undefined);
  };

  const copyItem = (e) => {
    e.stopPropagation();
    const newId = $id + nanoid(6);
    // const
    // onFlattenChange()
  };

  if ($id === '#' && inside) return children;

  return (
    <div
      className="field-wrapper relative"
      style={overwriteStyle}
      onClick={handleClick}
    >
      {!inside && (
        <div className="absolute top-0 left-0 blue f7">{$id.substring(1)}</div>
      )}
      {children}
      {isSelected && !inside && $id !== '#' && (
        <div
          style={{
            position: 'absolute',
            zIndex: 20,
            bottom: 0,
            right: 0,
            height: 24,
            width: 54,
            borderTopLeftRadius: 8,
            background: '#19f',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div onClick={deleteItem}>
            <img
              style={{ height: 14, width: 14, marginRight: 8 }}
              src="https://gw.alicdn.com/tfs/TB1oaaUu4v1gK0jSZFFXXb0sXXa-128-128.png"
              alt="delete"
            />
          </div>
          <div onClick={copyItem}>
            <img
              style={{ height: 14, width: 14 }}
              src="https://gw.alicdn.com/tfs/TB1xSGTu1L2gK0jSZFmXXc7iXXa-128-128.png"
              alt="copy"
            />
          </div>
        </div>
      )}
    </div>
  );
}
