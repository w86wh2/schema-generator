import React, { useState, useEffect } from 'react';
import { useGlobalProps } from '../hooks';
import { RightOutlined } from '@ant-design/icons';
import './index.css';
import ItemSettings from './ItemSettings';

export default function Right() {
  const [show, setShow] = useState(true);
  const { selected } = useGlobalProps();

  const toggleRight = () => setShow(o => !o);
  const ToggleIcon = () => (
    <div className='absolute top-1 left-1 pointer' onClick={toggleRight}>
      <RightOutlined />
    </div>
  );

  const HideRightArrow = () => (
    <div
      className='absolute right-0 top-0 h2 flex-center'
      style={{ width: 50 }}
    >
      <ToggleIcon />
    </div>
  );

  const Placeholder = show ? (
    <div className='right-layout relative'>
      <ToggleIcon />
    </div>
  ) : (
    <HideRightArrow />
  );

  // 如果没有选中任何item，或者是选中了根节点，object、list的内部，显示placeholder
  useEffect(() => {
    if ((selected && selected[0] === '0') || selected === '#' || !selected) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [selected]);

  return show ? (
    <div className='right-layout relative pl2'>
      <ToggleIcon />
      {show && <ItemSettings />}
    </div>
  ) : (
    <HideRightArrow />
  );
}
