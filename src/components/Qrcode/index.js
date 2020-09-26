import Taro, { Component } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import WQRCode from '../WQRCode/index'
import uqrcode from '../../../common/uqrcode'
import './index.scss'

export default class Index extends Component {

    config = {
        navigationBarTitleText: ''
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    state = {
        imgSrc: ''
    }

    qrcode2233Click() {
        this.refs.qrcode2233.make()
    }

    qrcode2307Complete = (e) => {
        console.log(e);
    }

    qrcode1446Complete = (e) => {
        console.log(e)
    }

    qrcode2229Complete = (e) => {
        console.log(e)
    }

    render() {
        return (
            <View className='index'>

                <View className="block">
                    <View className="title">透明背景</View>
                    <View className="component" style="background-color: #d2e9ff;">
                        <WQRCode cid="qrcode2243" text="uQRCode" backgroundColor="rgba(255,255,255,0)" makeOnLoad />
                    </View>
                </View>

                <View className="block">
                    <View className="title">
                        图片背景
				<View className="tips">实现步骤，将二维码背景颜色设置为透明，再进行二次绘制</View>
                    </View>
                    <View className="component">
                        <WQRCode cid="qrcode2302" text="uQRCode" foregroundColor="rgba(0,0,0,0.3)" backgroundImage={require('../../../assets/images/background-image.jpg')}
                            makeOnLoad />
                    </View>
                </View>

                <View className="block">
                    <View className="title">
                        在二维码上绘制本地图片
				<View className="tips">实现步骤，与图片背景同理，先获取到二维码文件资源，再进行二次绘制</View>
                    </View>
                    <View className="component">
                        <WQRCode cid="qrcode2307" text="uQRCode" foregroundColor="#2b9939" logo={require('../../../assets/images/logo.jpg')} makeOnLoad makeComplete={this.qrcode1446Complete.bind(this)} />
                    </View>
                </View>

                <View className="block">
                    <View className="title">
                        在二维码上绘制网络图片
				<View className="tips">实现步骤，与图片背景同理，先获取到二维码文件资源，再进行二次绘制</View>
                    </View>
                    <View className="component">
                        <WQRCode cid="qrcode1446" text="uQRCode" foregroundColor="#2b9939" makeOnLoad logo="https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/hot_search/top_4@1x-8cffd4622f.png" makeComplete={this.qrcode2307Complete.bind(this)} />
                    </View>
                </View>

                <View className="block">
                    <View className="title">事件触发生成</View>
                    <View className="component" style="background-color: #f0f0f0;">
                        <WQRCode cid="qrcode2233" ref="qrcode2233" text="uQRCode" />
                    </View>
                    <View className="operate">
                        <Button type="primary" size="mini" onClick={this.qrcode2233Click.bind(this)}>点我</Button>
                    </View>
                </View>

                <View className="block">
                    <View className="title">
                        设置边距
				<View className="tips">二维码实际尺寸会根据所设边距值进行缩放调整</View>
                    </View>
                    <View className="component" style="background-color: #f0f0f0;">
                        <WQRCode cid="qrcode2218" text="uQRCode" makeOnLoad margin={10} />
                    </View>
                </View>

                <View className="block">
                    <View className="title">修改背景色和前景色</View>
                    <View className="component">
                        <WQRCode cid="qrcode2229" text="uQRCode" backgroundColor="red" foregroundColor="blue" makeOnLoad makeComplete={this.qrcode2229Complete.bind(this)} />
                    </View>
                </View>
            </View >

        )
    }
}
