import React, { useEffect } from 'react';
import allSettings from './elementList';
import './index.css';
import Element from './Element';

const [elements, advancedElements, layouts, saves] = allSettings;

const Left = ({ saveList, setSaveList, ...rest }) => {
  // useEffect(() => {
  //   setSaveList(saves);
  // }, []); // eslint-disable-line

  return (
    <div className="left-layout w5-l w4">
      <p className="f6 b">基础组件</p>
      <ul className="pl0">
        {elements.map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
      <p className="f6 b">复杂组件</p>
      <ul className="pl0">
        {advancedElements.map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
      <p className="f6 b">布局组件</p>
      <ul className="pl0">
        {layouts.map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
      <p className="f6 b">模板</p>
      <ul className="pl0">
        {saveList.map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Left;
