import request from '@/utils/request'

// 获取个人信息
export const getUserInfoDatail = () => {
  return request.get('/user/info')
}
