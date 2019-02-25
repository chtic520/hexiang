<template>
  <f7-page name="main">
    <div class="login-index" style="background-image: url('./static/images/login_bg.png');">
      <div class="scroll-bg">
        <div class="select-container">
          <span class="pie">
            <span class="logo">
              <img src="static/images/logo_16x16.png" alt="logo">
            </span>
          </span>
          <div class="select-list">
            <div class="select-item" v-for="item in selectList" :key="item.type" :class="item.type">
              <f7-link :href="item.href" :external="item.external">
                <div class="img">
                  <img :src="item.img" :alt="item.type">
                </div>
                <h3>{{item.text}}</h3>
              </f7-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { getQueryString } from '@/utils/index.js';

export default {
  data () {
    let ref = getQueryString('ref')
    return {
      selectList: [
        {
          type: 'member',
          text: '成为会员',
          img: './static/images/member.png',
          external: true,
          href: 'http://api.hiera.cn:9000/index.html#/register?inviteCode=' + ref
        },{
          type: 'business',
          text: '成为商家',
          img: './static/images/business.png',
          external: false,
          href: '/business/'
        },{
          type: 'manager',
          text: '成为经理人',
          img: './static/images/manager.png',
          external: false,
          href: '/manager/'
        }
      ]
    }
  }
}
</script>

<style lang="less">
  .select-container{
    padding-top: 20%;
    margin-bottom: 30%;
    position: relative;

    .pie{
      display: block;
      width: 115px;
      height: 115px;
      border: 2px solid #fff;
      border-radius: 100%;
      margin: auto;
      padding: 78px;

      .logo{
        display: block;
        width: 81px;
        height: 81px;
        border: 2px solid #fff;
        border-radius: 100%;
        margin: auto;
        padding: 15px;
      }
    }

    .select-list{
      display: block;
      width: 275px;
      height: 275px;
      margin: auto;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .select-item{
      width: 33.3333333%;
      height: 74px;
      position: absolute;
      bottom: 0;

      &.member{
        left: 0;
      }

      &.business{
        left: 0;
        right: 0;
        margin: auto;
        bottom: -35px;
      }

      &.manager{
        right: 0;
      }

      .link{
        display: block;
        width: 74px;
        margin: auto;

        .img{
          width: 50px;
          height: 50px;
          border: 2px solid #fff;
          border-radius: 100%;
          margin: auto;
          padding: 10px;
          background-image:linear-gradient(-65deg,#febe7f,#feb37b);
        }

        h3{
          margin-top: 13px;
          margin-bottom: 0;
          white-space: nowrap;
          text-algin: center;
          color: #333;
        }
      }
    }
  }
</style>