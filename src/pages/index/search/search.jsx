import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import SearchComp from '@/components/searchComp/searchComp';
import { getSearchResult } from '@/api/common';

import './search.scss'



class Search extends Component {

  config = {
    navigationBarTitleText: '搜索',
    usingComponents: {

      'i-divider': '../../../iView/divider/index',
    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      themeClass: 'block',
      hotList: ['栏目1', '栏目2', '栏目3', '栏目4'],	//初始化推荐列表
      resultList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  getSearchText = (e) => {
    Taro.showToast({
      title: '回调的搜索信息: ' + e,
      icon: "none"
    })
    getSearchResult().then(res => {
      this.setState({ resultList: res.data });
    })
  }

  getSearchImage = (e) => {
    console.log(e[0])
  }
  onPullDownRefresh() {
    Taro.stopPullDownRefresh();
  }
  render() {
    const { themeClass, hotList, resultList } = this.state;
    return (
      <View className='search'>
        <SearchComp isFocus={false}
          theme='circle'
          showWant={true}
          hotList={hotList}
          resultList={resultList}
          isImageSearch={false}
          getSearchText={this.getSearchText}
          getSearchImage={this.getSearchImage}></SearchComp>
      </View>
    )
  }
}

export default Search
