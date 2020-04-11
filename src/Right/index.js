import React, { useState } from 'react';
import { Wrapper } from '../App';
import { useGlobalProps, useStore } from '../hooks';
import { widgets } from '../widgets/antd';
import ELEMENT_LIST from '../Left/elementList';
import { getWidgetName } from '../mapping';
import { getKeyFromUniqueId } from '../utils';
import { RightOutlined } from '@ant-design/icons';
import './index.css';

export default function Right() {
  const [show, setShow] = useState(true);
  const { flatten, onItemChange } = useStore();
  const { selected } = useGlobalProps();

  let settingSchema = {};
  let settingData = {};

  const toggleRight = () => setShow((o) => !o);

  const onDataChange = (newSchema) => {
    if (selected) {
      try {
        const item = flatten[selected];
        if (item && item.schema) {
          onItemChange(selected, { ...item, schema: newSchema });
        }
      } catch (error) {
        console.log(error, 'catch');
      }
    }
  };

  const ToggleIcon = () => (
    <div className="absolute top-1 left-1 pointer" onClick={toggleRight}>
      <RightOutlined />
    </div>
  );

  const RightHidden = () => (
    <div
      className="absolute right-0 top-0 h2 flex-center"
      style={{ width: 50 }}
    >
      <ToggleIcon />
    </div>
  );

  const Placeholder = show ? (
    <div className="right-layout relative">
      <ToggleIcon />
    </div>
  ) : (
    <RightHidden />
  );

  if (selected && selected[0] === '0') return Placeholder;
  if (selected === '#') return Placeholder;
  let itemSelected;
  let widgetName;
  try {
    itemSelected = flatten[selected];
    if (itemSelected) {
      widgetName = getWidgetName(itemSelected.schema);
    } else {
      return Placeholder;
    }
    if (widgetName) {
      const name = getKeyFromUniqueId(selected);
      const element = ELEMENT_LIST.find((e) => e.widget === widgetName);
      const schemaNow = element.setting;
      settingSchema = {
        propsSchema: {
          type: 'object',
          properties: {
            ...schemaNow,
          },
        },
        uiSchema: {},
      };
      settingData = itemSelected.schema;
    }
  } catch (error) {
    console.log(error);
  }

  return show ? (
    <div className="right-layout relative">
      <ToggleIcon />
      {itemSelected && (
        <Wrapper
          schema={settingSchema}
          formData={settingData}
          onChange={onDataChange}
          displayType="row"
          showDescIcon
          widgets={widgets}
          preview={true}
        />
      )}
    </div>
  ) : (
    <RightHidden />
  );
}
