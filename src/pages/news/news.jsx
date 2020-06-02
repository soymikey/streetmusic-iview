import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import TabbarComp from '@/components/TabbarComp/TabbarComp';

import './news.scss';

class News extends Component {
  config = {
    navigationBarTitleText: '动态',
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='news'>
        i am news
        <View className='tabbar-container'>
          <TabbarComp currentTab='news' />
        </View>
      </View>
    );
  }
}

export default News;
