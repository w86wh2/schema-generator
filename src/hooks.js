import { useReducer, useContext, useRef, useEffect, useState } from 'react';
import { Ctx, FuncCtx } from './context';

// 使用最顶层组件的 setState
export const useGlobal = () => {
  return useContext(Ctx);
};

export const useChange = () => {
  return useContext(FuncCtx);
};

// const logger = reducer => {
//   const reducerWithLogger = (state, action, actionName = 'Action') => {
//     console.group(actionName);
//     console.log('%cState:', 'color: #9E9E9E; font-weight: 500;', state);
//     console.log('%cAction:', 'color: #00A7F7; font-weight: 500;', action);
//     console.log('%cNext:', 'color: #47B04B; font-weight: 500;', {
//       ...state,
//       ...action,
//     });
//     console.groupEnd();
//     return reducer(state, action);
//   };
//   return reducerWithLogger;
// };

// export default logger;

// 类似于class component的setState
export const useSet = (initState) => {
  const [state, setState] = useReducer((state, newState) => {
    // console.group('action'); // TODO: give it a name
    // console.log('%cState:', 'color: #9E9E9E; font-weight: 700;', state);
    // console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', newState);
    // // console.log('%cNext:', 'color: #47B04B; font-weight: 700;', {
    // //   ...state,
    // //   ...newState,
    // // });
    // console.groupEnd();
    return { ...state, ...newState };
  }, initState);
  const setStateWithActionName = (state, actionName) => {
    setState(state);
  };
  return [state, setStateWithActionName];

  // const setStateWithLogger = (action, actionName = 'Action') => {
  //   setState(action);
  //   const colors = {
  //     prevState: '#9E9E9E',
  //     action: '#03A9F4',
  //     nextState: '#4CAF50',
  //     error: '#F20404',
  //   };
  //   console.group(actionName);
  //   console.log(
  //     '%c state:',
  //     `color: ${colors.prevState}; font-weight: bold;`,
  //     state
  //   );
  //   console.log(
  //     '%c action:',
  //     `color: ${colors.action}; font-weight: bold`,
  //     action
  //   );
  //   console.log('%c next:', `color: ${colors.nextState}; font-weight: bold`, {
  //     ...state,
  //     ...action,
  //   });
  //   console.groupEnd();
  // };

  // return [state, setState, setStateWithLogger];
};

// start: true 开始、false 暂停
export function useInterval(callback, delay, start) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  const id = useRef();
  useEffect(() => {
    if (!start) {
      return;
    }
    function tick() {
      savedCallback && savedCallback.current && savedCallback.current();
    }
    tick();
    if (delay !== null) {
      id.current = setInterval(tick, delay);
      return () => clearInterval(id.current);
    }
  }, [delay, start]);
  return () => clearInterval(id.current);
}

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export const useShowOnce = (localKey) => {
  // 从 localStorage 读取 key 值
  const [show, setShow] = useState(false);
  let localStr;
  try {
    localStr = localStorage.getItem(localKey);
  } catch (error) {}
  if (!localStr) {
    setShow(true);
    localStorage.setItem(localKey, JSON.stringify(true));
  }
  return show;
};

export const useModal = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  return [show, toggle];
};
