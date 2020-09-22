import React from 'react';
import FRWrapper from '../FRWrapper';
import { useGlobalProps, useStore } from '../hooks';
import { widgets } from '../widgets/antd';
import IdInput from '../widgets/antd/idInput';
import PercentSlider from '../widgets/antd/percentSlider';
import ALL from '../Left/elementList';
import { getWidgetName } from '../mapping';
import { getKeyFromUniqueId } from '../utils';

const elements = [...ALL[0], ...ALL[1], ...ALL[2]]; // 前三项是所有的组件

export default function ItemSettings() {
  const { flatten, onItemChange } = useStore();
  const { selected } = useGlobalProps();

  let settingSchema = {};
  let settingData = {};

  const onDataChange = newSchema => {
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

  // setting该显示什么的计算，要把选中组件的schema和它对应的widgets的整体schema进行拼接
  let itemSelected;
  let widgetName;
  try {
    itemSelected = flatten[selected];
    if (itemSelected) {
      widgetName = getWidgetName(itemSelected.schema);
    }
    if (widgetName) {
      // const name = getKeyFromUniqueId(selected);
      const element = elements.find(e => e.widget === widgetName);
      const schemaNow = element.setting;
      settingSchema = {
        schema: {
          type: 'object',
          properties: {
            ...schemaNow,
          },
        },
      };
      settingData = itemSelected.schema;
    }
  } catch (error) {
    console.log(error);
  }

  const _widgets = {
    ...widgets,
    idInput: IdInput,
    percentSlider: PercentSlider,
  };

  return (
    <div style={{ paddingRight: 24 }}>
      <FRWrapper
        schema={settingSchema}
        formData={settingData}
        onChange={onDataChange}
        displayType="row"
        showDescIcon
        widgets={_widgets}
        preview={true}
      />
    </div>
  );
}
