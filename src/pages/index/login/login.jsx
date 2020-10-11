import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { myLogin, createUser } from '@/api/user';
import './login.scss'

class LoginComp extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor() {
    super(...arguments);
    this.state = {
      canIUse: Taro.canIUse('button.open-type.getUserInfo'),
    };
  }

  async login(res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      // 获取到用户的信息了，打印到控制台上看下
      myLogin().then(res => {
        Taro.reLaunch({ url: '/pages/index/index' })
      });

    } else {
      //用户按了拒绝按钮
      Taro.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });

    }

  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { canIUse } = this.state
    return (
      <View className='login'>
        {canIUse ? <View >
          <View class='headView'>
            <View class='headImageView'>
              <Image class='headImage' src={post1_} mode='scaleToFill'></Image>
            </View>
            <View class='titleText'>申请获取以下权限</View>
            <View class='contentText'>获得你的公开信息(昵称,头像等)</View>
            <View className='button-wrapper'>
              <Button
                size='mini'
                className='primary authBtn'
                open-type='getUserInfo'
                onGetUserInfo={this.login.bind(this)}
              >
                授权登录
            </Button>
            </View>



          </View>

        </View>
          :
          <View
          >请升级微信版本</View>}
      </View>



    )
  }
}

export default LoginComp
