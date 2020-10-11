import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import { goToPage } from '@/utils/tools.js';


import './eventSumaryComp.scss';

class Eventsumarycomp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',

      'i-avatar': '../../iView/avatar/index',
      'i-divider': '../../iView/divider/index',
      'i-icon': '../../iView/icon/index',
      'i-divider': '../../iView/divider/index',
    },
  };
  goToEventDetailPage(id) {
    goToPage(`/pages/event/eventDetail/eventDetail?id=${id}`)
  }
  goToSingerDetailPage(id) {
    goToPage(`/pages/singer/singer?id=${id}`)
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { list, isShowIcons } = this.props;
    // address: "刚回北京"
    // city: "福州市"
    // cityCode: "350100"
    // createdDate: "2020-07-04T16:00:00.000Z"
    // date: "2020-07-02T16:00:00.000Z"
    // endTime: "05:05:00"
    // id: "284a7c05-82b3-438b-b315-a7e7a89a2047"
    // introduction: "和滑板车甜一起去旅行！好像也一样能找到ｕ，在一起了！你是不是真的没有那么"
    // name: "活动122124"
    // poster: "["http://qiniu.migaox.com/1593878755242.jpg"]"
    // province: "福建省"
    // provinceCode: "350000"
    // region: "鼓楼区"
    // regionCode: "350102"
    // startTime: "19:05:00"
    // userId: "o2VHy5Fn3m8GlVISHmDgNS6y3WrM"
    return (
    
      <View className='eventSumaryComp'>
        {list.map((item, index) => {
          return (
            <View key={item.id}>

              <i-row i-class='row-tab3' >
                <i-col span='3' i-class='col-class avatar'  >
                  <View className='avtar-wrapper' onClick={this.goToSingerDetailPage.bind(this, item.userId)}>

                    <i-avatar
                      src={item.avatar}
                      size='large'
                    />
                  </View>

                </i-col>
                <i-col span='21' i-class='col-class'>
                  <i-row i-class='row-title'>
                    <View onClick={this.goToEventDetailPage.bind(this, item.id)}>
                      <i-col span='24' i-class='col-class'>
                        <View className='username'>
                          <Text>{item.nickName}</Text>
                        </View>
                      </i-col>
                      <i-col span='24' i-class='col-class'>
                        <View className='date'>
                          <View > <Text>{item.startDate}</Text><Text decode="true">&nbsp; &nbsp;</Text>
                            <Text>{item.startTime}</Text></View>

                        </View>
                      </i-col>
                      <i-col span='24' i-class='col-class'>
                        <View className='content'>
                          <Text>{item.introduction}</Text>
                        </View>
                      </i-col>
                      {item.poster.length && (
                        <i-col span='24' i-class='col-class'>
                          <View className='image'>
                            <Image
                              mode='aspectFit'
                              src={item.poster[0]}
                              style='width: 100%;height:150px'
                            />
                          </View>
                        </i-col>
                      )}
                    </View>
                    {/* {isShowIcons ? (
                    <i-row i-class='icon-row'>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'like')}>
                          <i-icon size={25} type='like' />
                        </View>
                        <View className='number'>
                          <Text>{item.likes}</Text>
                        </View>
                      </i-col>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'share')}>
                          <i-icon size={25} type='share' />
                        </View>
                        <View className='number'>
                          <Text>{item.shares}</Text>
                        </View>
                      </i-col>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'document')}>
                          <i-icon size={25} type='document' />
                        </View>
                        <View className='number'>
                          <Text>{item.comments}</Text>
                        </View>
                      </i-col>
                      <i-col span='6' i-class='col-class icon-wrapper'>
                        <View onClick={this.iconHandler.bind(this, 'collection')}>
                          <i-icon size={25} type='collection' />
                        </View>
                        <View className='number'>
                          <Text>{item.collections}</Text>
                        </View>
                      </i-col>
                    </i-row>
                  ) : null} */}
                  </i-row>
                </i-col>
                {list.length - 1 === index ? null : <i-divider i-class='divider' i-class='divider' height={24}></i-divider>}
              </i-row></View>
          );
        })}
      </View>
    );
  }
}

export default Eventsumarycomp;

Eventsumarycomp.defaultProps = {
  list: [],
  isShowIcons: true, //是否显示文件底部的图标
};
