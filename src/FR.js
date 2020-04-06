import React from 'react';

const FR = ({ id = '#', onItemChange, flatten, globalProps }) => {
  const item = flatten[id];
  const fieldProps = {
    item,
    onItemChange,
    globalProps,
  };
  const childrenProps = {
    flatten: flatten,
    children: item.children,
    onItemChange,
    globalProps,
  };
  return (
    <div>
      <RenderField {...fieldProps} />
      <RenderChildren {...childrenProps} />
    </div>
  );
};

const RenderField = ({ item, globalProps, onItemChange }) => {
  const onChange = (value) => {
    const newItem = { ...item };
    newItem.data = value;
    onItemChange(item.schema.$id, newItem);
  };

  return (
    <>
      <span>{item.schema.title || 'no-title'}: </span>
      <span>
        {item.schema.$id} - {JSON.stringify(item.data)}
      </span>
      {typeof item.data === 'string' && (
        <input value={item.data} onChange={onChange} />
      )}
    </>
  );
};

const RenderChildren = ({
  children = [],
  onItemChange,
  flatten,
  globalProps,
}) => {
  return (
    <ul>
      {children.map((child, i) => {
        const FRProps = {
          globalProps,
          onItemChange,
          flatten,
          id: child,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </ul>
  );
};

export default FR;
