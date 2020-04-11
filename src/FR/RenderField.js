import React from 'react';
import { useGlobalProps, useStore } from '../hooks';
import { isLooselyNumber, isCssLength } from '../utils';
import { getWidgetName } from '../mapping';

const RenderField = ({
  $id,
  item,
  labelClass,
  contentClass,
  isComplex,
  children,
}) => {
  const { onItemChange } = useStore();
  const { schema, data } = item;
  const {
    displayType,
    showDescIcon,
    showValidate,
    labelWidth,
    widgets,
  } = useGlobalProps();
  const { type, title, description, required } = schema;
  const isRequired = required && required.length > 0;

  const _labelWidth = isLooselyNumber(labelWidth)
    ? Number(labelWidth)
    : isCssLength(labelWidth)
    ? labelWidth
    : 110; // 默认是 110px 的长度
  let labelStyle = { width: _labelWidth };
  if (type === 'boolean') {
    labelStyle = { flexGrow: 1 };
  } else if (isComplex || displayType === 'column') {
    labelStyle = { flexGrow: 1 };
  }

  const onChange = (value) => {
    const newItem = { ...item };
    newItem.data = value;
    onItemChange($id, newItem);
  };

  let widgetName = getWidgetName(schema);
  const customWidget = schema['ui:widget'];
  if (customWidget && widgets[customWidget]) {
    widgetName = customWidget;
  }
  const Widget = widgets[widgetName];
  // if (widgetName === 'multiSelect') {
  //   console.log(schema['ui:widget'], customWidget, Widget);
  // }

  // TODO: useMemo
  const usefulWidgetProps = {
    disabled: schema['ui:disabled'],
    readonly: schema['ui:readonly'],
    hidden: schema['ui:hidden'],
    options: schema['ui:options'],
    labelWidth: schema['ui:labelWidth'],
    width: schema['ui:width'],
  };

  return (
    <>
      {schema.title ? (
        <div className={labelClass} style={labelStyle}>
          <label
            className={`fr-label-title ${
              type === 'boolean' || displayType === 'column' ? 'no-colon' : ''
            }`} // boolean不带冒号
            title={title}
          >
            {isRequired && <span className="fr-label-required"> *</span>}
            <span
              className={`${isComplex ? 'b' : ''} ${
                displayType === 'column' ? 'flex-none' : ''
              }`}
            >
              {title}
            </span>
            {description &&
              (showDescIcon ? (
                <span className="fr-tooltip-toggle" aria-label={description}>
                  <i className="fr-tooltip-icon" />
                  <div className="fr-tooltip-container">
                    <i className="fr-tooltip-triangle" />
                    {description}
                  </div>
                </span>
              ) : (
                <span className="fr-desc ml2">(&nbsp;{description}&nbsp;)</span>
              ))}
            {displayType !== 'row' && showValidate && (
              <span className="fr-validate">validation</span>
            )}
          </label>
        </div>
      ) : null}
      {['list'].indexOf(widgetName) === -1 && (
        <div className={contentClass}>
          <Widget
            value={data}
            onChange={onChange}
            schema={schema}
            {...usefulWidgetProps}
            children={children}
          />
        </div>
      )}
    </>
  );
};

export default RenderField;
