import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '七夕快乐'
  }
  constructor(props) {
    super(props)
    this.state = {
      id: ''
    }
  }

  componentWillMount() { }

  componentDidMount() {
    let res = Taro.getStorageSync('id')
    if (res) {
      Taro.redirectTo({
        url: '../index/index?id=' + res.data
      })
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getUserInfo = () => {
    let _this = this
    Taro.getUserInfo({
      success: (res) => {
        var userInfo = res.userInfo
        userInfo['num'] = 0
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        const db = Taro.cloud.database()
        Taro.showLoading({
          title: 'loading'
        })
        db.collection('user').add({
          data: userInfo,
          success: (res) => {
            _this.setState({
              id: res._id
            })
            // 存储到本地
            Taro.setStorage({
              key: 'id',
              data: res._id,
              success: res => {
                Taro.hideLoading()
                Taro.navigateTo({
                  url: '../index/index?id=' + res._id
                })
              },
              fail: (res) => {
                Taro.hideLoading()
                console.log(res)
              }
            })
          },
          fail: (res) => {
            Taro.hideLoading()
            console.log(res.errMsg)
            Taro.showToast({
              title: res.errMsg,
              icon: 'none'
            })
          }
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  }

  render() {
    return (
      <View className='index'>
        <Button className='indexButton' onGetUserInfo={this.getUserInfo.bind(this)} openType='getUserInfo'>登录</Button>
      </View>
    )
  }
}
