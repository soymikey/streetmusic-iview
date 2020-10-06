import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './comment.scss'
import CommentSumaryComp from '@/components/commentSumaryComp/commentSumaryComp';
import { getCommentList } from '@/api/common';

class Comment extends Component {

  config = {
    navigationBarTitleText: '评论',
    usingComponents: {
      'i-row': '../../iView/row/index',
      'i-col': '../../iView/col/index',
      'i-divider': '../../iView/divider/index',
    },
  }
  constructor() {
    super(...arguments);
    this.state = {
      list: [],
      total: 0,
      pageSize: 20,
      pageNo: 1,
      loading: false,
    };
  }
  componentDidMount() {
    this.fetchCommentList(true)
  }
  // 留言列表
  fetchCommentList(override) {
    Taro.showLoading({
      title: '加载中-评论',
    });
    // 向后端请求指定页码的数据
    const data = {
      pageSize: this.state.pageSize,
      pageNo: this.state.pageNo,
      id: this.$router.params.id,
    };
    this.setState({ loading: true });

    return getCommentList(data)
      .then(res => {
        this.setState({
          list: override
            ? res.data.list
            : this.state.list.concat(res.data.list),
          total: res.data.total,
          loading: false,
        });
      })
      .catch(err => {
        console.log('==> [ERROR]', err);
      });
  }
  onPullDownRefresh() {
    if (!this.state.loading) {
      this.setState({ pageNo: 1 }, () => {
        this.fetchCommentList(true).then(res => {
          // 处理完成后，终止下拉刷新
          Taro.stopPullDownRefresh();
        });
      });
    }
  }
  onReachBottom() {
    if (
      !this.state.loading &&
      this.state.pageNo * this.state.pageSize < this.state.total
    ) {
      this.setState({ pageNo: this.state.pageNo + 1 }, () => {
        this.fetchCommentList();
      });
    }
  }

  render() {
    const { list } = this.state
    return (
      <View className='comment'>
        <i-row i-class='recommend-row'>
          <i-col span='6' i-class='col-class'>
            <View className='recommend-title'>
              <Text>相关评论</Text>
            </View>
          </i-col>
        </i-row>
        <View className='CommentSumaryCompWrapper'>
          <CommentSumaryComp list={list} />
        </View>
        <i-divider i-class='divider' content='加载已经完成,没有其他数据'></i-divider>
      </View>
    )
  }
}

export default Comment
