import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './commentSumaryComp.scss';

class CommentSumaryComp extends Component {
  // eslint-disable-next-line react/sort-compC
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

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  onClickReply() {
    Taro.showToast({
      title: '点击回复'
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { list } = this.props;
    return (
      <View className='commentSumaryComp'>
        {list.map((item, index) => {
          return (
            <i-row i-class='row-tab3' key={item.id}>
              <i-col span='3' i-class='col-class avatar'>
                <i-avatar
                  src={item.avatar}
                  size='large'
                />
              </i-col>
              <i-col span='21' i-class='col-class'>
                <i-row i-class='row-title'>
                  <View >
                    <i-col span='24' i-class='col-class'>
                      <View className='username'>
                        <Text>{item.nickName} 评论：</Text>
                      </View>
                    </i-col>

                    <i-col span='24' i-class='col-class'>
                      <View className='content'>
                        <Text>{item.content}</Text>
                      </View>
                    </i-col>
                    <i-col span='10' i-class='col-class'>
                      <View className='date'>
                        {item.createdDate && <Text><Text>{item.createdDate.slice(0, 10)}</Text><Text decode="true">&nbsp; &nbsp;</Text> <Text>{item.createdDate.slice(11, 16)}</Text></Text>}
                      </View>
                    </i-col>
                    <i-col span='8' i-class='col-class'>
                      <View className='date' onClick={this.onClickReply.bind(this)}>
                        {/* 回复 */}
                      </View>
                    </i-col>
                    {/* {item.posters.length && (
                      <i-col span='24' i-class='col-class'>
                        <View className='image'>
                          <Image
                            src={item.posters[0]}
                            style='width: 100%;height:150px'
                          />
                        </View>
                      </i-col>
                    )} */}
                  </View>

                </i-row>
              </i-col>
              {list.length - 1 === index ? null : <i-divider i-class='divider' height={24}></i-divider>}
            </i-row>
          );
        })}
      </View>
    );
  }
}

export default CommentSumaryComp;

CommentSumaryComp.defaultProps = {
  list: []
};
