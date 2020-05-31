import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import Index from './pages/index';

import configStore from './store';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    pages: ['pages/index/index', 'pages/event/event', 'pages/singer/singer'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    usingComponents: {
      // "i-action-sheet": "./iview/action-sheet/index",
      // "i-alert": "./iview/alert/index",
      // "i-avatar": "./iview/avatar/index",
      // "i-badge": "./iview/badge/index",
      // "i-button": "./iview/button/index",
      // "i-card": "./iview/card/index",
      // "i-cell": "./iview/cell/index",
      // "i-cell-group": "./iview/cell-group/index",
      // "i-checkbox": "./iview/checkbox/index",
      // "i-checkbox-group": "./iview/checkbox-group/index",
      // "i-col": "./iview/col/index",
      // "i-collapse": "./iview/collapse/index",
      // "i-collapse-item": "./iview/collapse-item/index",
      // "i-count-down": "./iview/count-down/index",
      // "i-divider": "./iview/divider/index",
      // "i-drawer": "./iview/drawer/index",
      // "i-grid": "./iview/grid/index",
      // "i-grid-icon": "./iview/grid-icon/index",
      // "i-grid-item": "./iview/grid-item/index",
      // "i-grid-label": "./iview/grid-label/index",
      // "i-icon": "./iview/icon/index",
      // "i-index": "./iview/index/index",
      // "i-index-item": "./iview/index-item/index",
      // "i-input": "./iview/input/index",
      // "i-input-number": "./iview/input-number/index",
      // "i-load-more": "./iview/load-more/index",
      // "i-message": "./iview/message/index",
      // "i-modal": "./iview/modal/index",
      // "i-notice-bar": "./iview/notice-bar/index",
      // "i-page": "./iview/page/index",
      // "i-panel": "./iview/panel/index",
      // "i-progress": "./iview/progress/index",
      // "i-radio": "./iview/radio/index",
      // "i-radio-group": "./iview/radio-group/index",
      // "i-rate": "./iview/rate/index",
      // "i-row": "./iview/row/index",
      // "i-slide": "./iview/slide/index",
      // "i-spin": "./iview/spin/index",
      // "i-step": "./iview/step/index",
      // "i-steps": "./iview/steps/index",
      // "i-sticky": "./iview/sticky/index",
      // "i-sticky-item": "./iview/sticky-item/index",
      // "i-swipeout": "./iview/swipeout/index",
      // "i-switch": "./iview/switch/index",
      // "i-tab": "./iview/tab/index",
      // "i-tab-bar": "./iview/tab-bar/index",
      // "i-tab-bar-item": "./iview/tab-bar-item/index",
      // "i-tabs": "./iview/tabs/index",
      // "i-tag": "./iview/tag/index",
      // "i-toast": "./iview/toast/index",
    },
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
