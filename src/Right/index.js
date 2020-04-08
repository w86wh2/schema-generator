import React from 'react';
import './index.css';
import { Wrapper } from '../App';
import { useGlobalProps, useStore } from '../hooks';
import { widgets } from '../widgets/antd';
import ELEMENT_LIST from '../Left/elementList';
import { getWidgetName } from '../mapping';
import { getKeyFromUniqueId } from '../utils';

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

  if (selected && selected[0] === '0') return null;
  let itemSelected;
  let widgetName;
  try {
    itemSelected = flatten[selected];
    if (itemSelected) {
      widgetName = getWidgetName(itemSelected.schema);
    } else {
      return null;
    }
    if (widgetName) {
      const name = getKeyFromUniqueId(selected);
      const schemaNow = ELEMENT_LIST.find((e) => e.widget === widgetName)
        .setting;
      settingSchema = {
        propsSchema: {
          type: 'object',
          properties: {
            ...schemaNow,
            $id: {
              title: '字段名',
              type: 'string',
            },
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
    <div className="right-side pa3">
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
