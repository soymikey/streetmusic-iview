import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import './searchComp.scss'
import PropTypes from 'prop-types';
import { goToPage } from '@/utils/tools.js';

export default class WSearch extends Component {



    config = {
        usingComponents: {

            'i-divider': '../../iView/divider/index',
        },
    }
    state = {
        searchText: '',								//搜索关键词
        hList: Taro.getStorageSync('search_cache')		//历史记录
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }


    searchStart = () => {	//触发搜索
        let _this = this;
        if (_this.state.searchText == '') {
            Taro.showToast({
                title: '请输入关键字',
                icon: 'none',
                duration: 1000
            });
        } else {
            this.props.getSearchText(this.state.searchText)
            Taro.getStorage({
                key: 'search_cache',
                success(res) {
                    console.log(res)
                    let list = res.data;
                    if (list.length > 5) {
                        for (let item of list) {
                            if (item == _this.state.searchText) {
                                return;
                            }
                        }
                        list.pop();
                        list.unshift(_this.state.searchText);
                    } else {
                        for (let item of list) {
                            if (item == _this.state.searchText) {
                                return;
                            }
                        }
                        list.unshift(_this.state.searchText);
                    }
                    _this.setState({
                        hList: list
                    }, () => {
                        console.log(_this.state.hList)
                        Taro.setStorage({
                            key: 'search_cache',
                            data: _this.state.hList
                        });
                    })
                },
                fail(err) {
                    _this.setState({
                        hList: []
                    }, () => {
                        let hList = _this.state.hList
                        hList.push(_this.state.searchText)
                        _this.setState({
                            hList
                        }, () => {
                            console.log(_this.state.hList)
                            Taro.setStorage({
                                key: 'search_cache',
                                data: _this.state.hList
                            });
                            _this.props.getSearchText(_this.state.searchText)
                        })
                    })
                }
            })
        }
    }

    keywordsClick = (item, e) => {	//关键词搜索与历史搜索
        console.log(item)
        this.setState({
            searchText: item
        }, () => {
            this.searchStart();
        })
    }

    delhistory = () => {		//清空历史记录
        this.setState({
            hList: []
        }, () => {
            Taro.setStorage({
                key: 'search_cache',
                data: []
            });
        })
    }

    imageSearch = () => {
        Taro.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                this.props.getSearchImage(res.tempFilePaths)
            },
            fail: (err) => {

            }
        });
    }

    handleChane = (e) => {
        this.setState({
            searchText: e.target.value
        }, () => {
            console.log(this.state.searchText)
        })
    }
    goToSignerPage(item) {
        Taro.redirectTo({ url: `/pages/singer/singer?id=${item.id}` })
    }
    goToEventPage(item) {
        Taro.redirectTo({ url: `/pages/event/eventDetail/eventDetail?id=${item.id}` })

    }

    render() {
        const { searchText, hList } = this.state
        const { isFocus, theme, showWant, hotList, isImageSearch, resultList } = this.props
        return (
            <View>
                <View className="search">
                    {
                        isFocus ? (<Input maxLength="20" focus type="text" onInput={this.handleChane} value={searchText} confirmType="search" onConfirm={this.searchStart} placeholder="请输入关键词搜索" />) : (
                            <Input maxLength="20" type="text" onInput={this.handleChane} value={searchText} confirmType="search" onConfirm={this.searchStart} placeholder="请输入关键词搜索" />
                        )
                    }
                    <Image src={require("./static/search.svg")} mode="aspectFit" className="search-left-icon"></Image>
                    {
                        isImageSearch ? (
                            <Image src={require("./static/search-right.png")} mode="aspectFit" onClick={this.imageSearch} className="search-right-icon"></Image>
                        ) : null
                    }

                </View>
                {
                    resultList.singers.length || resultList.events.length ? (<View className='result' >
                        <View className="header">
                            搜索结果
                        </View>
                        <View className="resultList">
                            {resultList.singers.length && <View className='title'>歌手</View>}

                            {
                                resultList.singers.map((item, index) => {
                                    return (<View key={index} className='result-item' onClick={this.goToSignerPage.bind(this, item)}>{item.nickName}
                                        <i-divider i-class='divider' height={24}></i-divider>
                                    </View>)
                                })
                            }
                            {resultList.events.length && <View className='title'>活动</View>}

                            {
                                resultList.events.map((item, index) => {
                                    return (<View key={index} className='result-item' onClick={this.goToEventPage.bind(this, item)}>{item.name}
                                        <i-divider i-class='divider' height={24}></i-divider>
                                    </View>)
                                })
                            }
                        </View>
                    </View>) : null
                }
                {
                    hList.length > 0 ? (<View className={'s-' + theme} >
                        <View className="header">
                            历史记录
				            <Image src={require("./static/delete.svg")} mode="aspectFit" onClick={this.delhistory}></Image>
                        </View>
                        <View className="list">
                            {
                                hList.map((item, index) => {
                                    return (<View key={index} onClick={this.keywordsClick.bind(this, item)}>{item}</View>)
                                })
                            }
                        </View>
                    </View>) : null
                }
                {/* {
                    showWant ? (<View className={'wanted-' + theme}>
                        <View className="header">猜你想搜的</View>
                        <View className="list">
                            {
                                hotList.map((item, index) => {
                                    return (
                                        <View key={index} onClick={this.keywordsClick.bind(this, item)}>{item}</View>
                                    )
                                })
                            }
                        </View>
                    </View>) : null
                } */}

            </View>

        )
    }
}
WSearch.propTypes = {
    isFocus: PropTypes.bool,//是否自动获取焦点
    theme: PropTypes.string,//选择块级显示还是圆形显示
    showWant: PropTypes.bool,//是否展示推荐菜单
    hotList: PropTypes.array,//推荐列表数据 
    resultList: PropTypes.object,//推荐列表数据 
    isImageSearch: PropTypes.bool //是否有上传图片搜索
}
WSearch.defaultProps = {
    isFocus: false,
    theme: 'block',
    showWant: false,
    hotList: [],
    resultList: {
        events: [],
        singer: []
    },
    isImageSearch: false
};
