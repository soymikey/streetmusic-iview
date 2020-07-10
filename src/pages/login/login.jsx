import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
const post1_ = require('@/asset/images/poster1.png');


import './login.scss'



class Login extends Component {

  config = {
    navigationBarTitleText: '登录'
  }
  constructor() {
    super(...arguments);
    this.state = {
      canIUse: Taro.canIUse('button.open-type.getUserInfo'),
    };
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

export default Login
