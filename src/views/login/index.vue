<template>
  <div class="login">
    <!-- 头部 NavBar -->
    <van-nav-bar title="会员登陆" left-arrow @click-left="$router.go(-1)"/>
     <!-- 主体 -->
      <div class="container">
        <!-- 标题 -->
        <div class="title">
          <h3>手机号登陆</h3>
          <p>未注册手机号登陆后将自动注册</p>
        </div>
        <!-- 表单 -->
        <div class="form">
          <div class="form-item">
            <input v-model="mobile" type="text" class="inp" maxlength="11" placeholder="请输入手机号">
          </div>
          <div class="form-item">
            <input v-model="picCode" type="text" class="inp" maxlength="4" placeholder="请验证码">
            <img v-if="picUrl" v-bind:src="picUrl" v-on:click="getPicCode" alt="验证码">
          </div>
          <div class="form-item">
            <input v-model="msgCode" type="text" class="inp" maxlength="6" placeholder="请输入短信验证码">
            <button v-on:click="getCode">
              {{ seccond === totalSeccond ? '获取验证码' : seccond + '秒后重新发送' }}
            </button>
          </div>
        </div>
        <div class="login-btn" v-on:click="login">登录</div>
      </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'

export default {
  name: 'loginIndex',
  data () {
    return {
      picKey: '', // 将来用来传递的图像验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSeccond: 60, // 总秒数
      seccond: 60, // 当前秒数
      timer: null, // 定时器id
      mobile: '', // 手机号
      picCode: '', // 用户输入的图像验证码
      msgCode: '' // 短信验证码
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 检验 手机 和 图像验证码是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) return
      if (!this.timer && this.seccond === this.totalSeccond) {
        // 发起请求，获取验证码
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功，请注意查收！')
        // 开启倒计时
        this.timer = setInterval(() => {
          this.seccond--
          if (this.seccond <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.seccond = this.totalSeccond
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码！')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      // 进行判断, 地址栏有没有回跳地址
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer) // 离开页面时清除定时器
  }
}
</script>

<style>
  .container {
    padding: 49px 29px;

    .title {
      margin-bottom: 20px;
      h3 {
        font-size: 26px;
        font-weight: normal;
      }
      p {
        line-height: 40px;
        font-size: 14px;
        color: #b8b8b8;
      }
    }

    .form-item {
      border-bottom: 1px solid #f3f1f2;
      padding: 8px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      .inp {
        flex: 1;
        display: block;
        border: none;
        outline: none;
        height: 32px;
        font-size: 14px;
      }
      img {
        width: 94px;
        height: 31px;
      }
      button {
        height: 31px;
        border: none;
        font-size: 13px;
        color: #cea26a;
        background-color: transparent;
        padding-right: 9px;
      }
    }

    .login-btn {
      width: 100%;
      height: 42px;
      margin-top: 39px;
      background: linear-gradient(90deg,#ecd53c,#ff9211);
      color: #fff;
      border-radius: 21px;
      box-shadow: 0 10px 20px 0 rgb(0 0 0 / .1);
      letter-spacing: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
