import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import FloatLayout from '@/components/FloatLayout/FloatLayout';
import { createLike, createCollection } from '@/api/common';
import { goToPage } from '../../utils/tools';

import './commentBarComp.scss';

class CommentBarComp extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: 'coimmentbar',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-icon': '../../iView/icon/index'
    },
  };
  constructor() {
    super(...arguments);
    this.state = {
      isOpened: false,
      liked: false,
      collected: false,
    };
  }
  onOpen() {
    this.setState({ isOpened: true });
  }
  onClose() {
    this.setState({ isOpened: false });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('1', this.props, nextProps);
    this.setState({
      liked: nextProps.liked,
      collected: nextProps.collected,
    })
  }
  onClickComment() {
    goToPage('/pages/comment/comment?id=' + this.props.id_)
  }
  onClickLike() {
    const data = {
      type: this.props.type,
      id: this.props.id_
    }
    createLike(data).then(res => {
      this.setState({
        liked: !this.state.liked,
      })
    }).catch(e => {

    })
  }
  onClickCollection() {
    const data = {
      type: this.props.type,
      id: this.props.id_
    }
    createCollection(data).then(res => {

      this.setState({
        collected: !this.state.collected,
      })
    }).catch(e => {

    })
  }
  onShareAppMessage() {
    return {
      from: 'button',
      path: `/pages/event/eventDetail/eventDetail?id=${this.props.id_}`
    }
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { isOpened, liked, collected } = this.state
    return (
      <View className='commentBarComp'>
        <View className=''>

          <i-row>
            <i-col span='12' i-class='searchBar-col'>
              <View className='searchBar' onClick={this.onOpen.bind(this)}>
                <View className='content'><i-icon type='brush' size='20' />写评论</View>

              </View>

            </i-col>

            <i-col span='3' i-class='col-class'>
              <View className='icon-wrapper' onClick={this.onClickComment.bind(this)} >
                <i-icon size='35' type='message' />
              </View>

            </i-col>
            <i-col span='3' i-class='col-class'>

              <View className='like' onClick={this.onClickCollection.bind(this)}>{collected ? <i-icon size='35' type='collection_fill' color='#ed3f14' /> : <i-icon size='35' type='collection' />}</View>
            </i-col>
            <i-col span='3' i-class='col-class'>
              <View className='like' onClick={this.onClickLike.bind(this)}> {liked ? <i-icon size='35' type='praise_fill' color='#ed3f14' />
                : <i-icon size='35' type='praise' />
              }</View>
            </i-col>
            <i-col span='3' i-class='col-class' >
              {/* <i-icon size='35' type='accessory' /> */}
              <Button
                size='mini'
                className='share-button'
                open-type='share'
              >
                <i-icon size='35' type='accessory' />
              </Button>
            </i-col>
          </i-row>
          <View className='tabbar-block'></View>

          <FloatLayout
            isOpened={isOpened}
            onClose={this.onClose.bind(this)}
            title='留言'
            id_={this.props.id_}
            type={this.props.type}
          />
        </View>

      </View>
    );
  }
}

export default CommentBarComp;

CommentBarComp.defaultProps = {
  id_: '',
  type: 0,
  liked: false,
  collected: false,
};