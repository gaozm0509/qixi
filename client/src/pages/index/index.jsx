import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import Img from '../../images/img.png'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '七夕快乐'
  }
  constructor(props) {
    super(props)
    this.state = {
      noTapCount: 0,
      id: ''
    }
  }

  componentWillMount() {
    this.state.id = this.$router.params.id
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  noTap = () => {

    let _this = this
    let content
    if (this.state.noTapCount == 0) {
      content = '工资上交'
    } else if (this.state.noTapCount == 1) {
      content = '家务全包'
    } else if (this.state.noTapCount == 2) {
      content = '我妈会游泳'
    } else if (this.state.noTapCount == 3) {
      content = '保大'
    } else if (this.state.noTapCount == 4) {
      content = '别点了，能给的都给了😿'
    } else if (this.state.noTapCount == 5) {
      content = '还点？'
    } else if (this.state.noTapCount == 6) {
      content = '有完没完？'
    } else {
      content = '好吧，晚上请你吃饭'
    }
    Taro.showModal({
      title: '提示',
      content: content,
      success: function (res) {
        if (res.confirm) {
          _this.state.noTapCount = _this.state.noTapCount + 1
          // _this.noTap()
        }
      }
    })
  }

  yesTap = () => {
    this.updataData()
    Taro.showModal({
      title: '提示',
      content: '爱心已收到，爱你吆~',
      success: function (res) {
      }
    })
  }

  updataData = () => {
    let db = Taro.cloud.database()
    db.collection('user').doc(this.state.id).update({
      data: {
        num: 1
      },
      success: function (res) {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  }

  render() {
    return (
      <View className='index'>
        <Text className='topText'>小姐姐，我注意你很久了~</Text>
        <Text className='midText'>做我女朋友好不好？</Text>
        <Image src={Img}></Image>
        <View className='optionView'>
          <Text className='yes' onClick={this.yesTap}>好</Text>
          <Text className='no' onClick={this.noTap}>不好</Text>
        </View>
      </View>
    )
  }
}
