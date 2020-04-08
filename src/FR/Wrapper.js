import React from 'react';
import './Wrapper.css';
import { useGlobal, useGlobalProps, useStore } from '../hooks';
import { copyItem } from '../utils';
import nanoid from 'nanoid';

export default function Wrapper({ $id, item, inside = false, children }) {
  const { flatten, onItemChange, onFlattenChange } = useStore();
  const setGlobal = useGlobal();
  const { selected, hovering } = useGlobalProps();
  const { schema } = item;
  const { type } = schema;

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

  const handleItemCopy = (e) => {
    e.stopPropagation();
    const [newFlatten, newId] = copyItem(flatten, $id);
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  const handleMouseEnter = () => {
    // setGlobal({ hovering: inside ? '0' + $id : $id });
  };

  const handleMouseLeave = () => {
    // TODO: 如何写hoverLeave
    // let hoverItem = '';
    // if (hovering && hovering[0] === '0') {
    //   hoverItem = $id;
    // } else {
    //   hoverItem = $id.split;
    // }
  };

  // 一些computed
  let isSelected = selected === $id && !inside;
  if (selected && selected[0] === '0') {
    isSelected = selected.substring(1) === $id && inside;
  }

  const hoverId = inside ? '0' + $id : $id;

  let overwriteStyle = {
    backgroundColor: hovering === hoverId ? '#ecf5ff' : '#fff',
  };
  if (inside) {
    overwriteStyle = {
      ...overwriteStyle,
      borderColor: '#777',
      marginLeft: 12,
      padding: '8px 8px 0 0',
      backgroundColor: '#fafafa',
    };
  } else if ($id === '#') {
    overwriteStyle = {
      ...overwriteStyle,
      borderColor: '#777',
      padding: 12,
      height: 'calc(100vh - 80px)',
      overflow: 'auto',
      backgroundColor: '#fafafa',
    };
  } else if (type === 'object') {
    overwriteStyle = { ...overwriteStyle, paddingTop: 12 };
  }
  if (isSelected) {
    overwriteStyle = {
      ...overwriteStyle,
      outline: '3px solid #19f',
      borderColor: '#fff',
    };
  }

  if ($id === '#' && inside) return children;

  return (
    <div
      style={overwriteStyle}
      className={`field-wrapper relative`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!inside && (
        <div className="absolute top-0 left-0 blue f7">
          {schema && schema.$id && schema.$id.substring(1)}
        </div>
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
          <div onClick={handleItemCopy}>
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
