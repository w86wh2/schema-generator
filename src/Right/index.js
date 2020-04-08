import React from 'react';
import { Wrapper } from '../App';
import { useGlobalProps, useStore } from '../hooks';
import { widgets } from '../widgets/antd';
import ELEMENT_LIST from '../Left/elementList';
import { getWidgetName } from '../mapping';
import { getKeyFromUniqueId } from '../utils';
import './index.css';

export default function Right() {
  const { flatten, onItemChange } = useStore();
  const { selected } = useGlobalProps();

  let settingSchema = {};
  let settingData = {};

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

  const Placeholder = <div className="right-layout"></div>;

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

  return (
    <div className="right-layout">
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
  );
}
