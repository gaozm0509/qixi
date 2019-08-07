const cloud = require('wx-server-sdk')

cloud.init()


exports.main = async (events,context) => {
  let userInfo = events.data

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}