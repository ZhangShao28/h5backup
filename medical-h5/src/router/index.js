import Vue from 'vue'
import VueRouter from 'vue-router'
import { cookie } from 'vux'
import Login from '@/components/Login/Login'
import Clause from '@/components/Login/Clause'
import ClauseTwo from '@/components/Login/ClauseTwo'
import Home from '@/components/Home/Home'
import MemberRule from '@/components/ApplyMember/MemberRule'
import ApplyMember from '@/components/ApplyMember/ApplyMember'
import Recommend from '@/components/Recommend/Recommend'
import MyInfo from '@/components/MyInfo/MyInfo'
import InfoModify from '@/components/MyInfo/InfoModify'
import ModifyPhone from '@/components/MyInfo/ModifyPhone'
import Wallet from '@/components/Wallet/Wallet'
import CashRecord from '@/components/Wallet/CashRecord'//提現記錄
import ApplyCash from '@/components/Wallet/ApplyCash'//申請提現
import AccountSetting from '@/components/Wallet/AccountSetting'//賬戶設置
import OrderCommission from '@/components/Wallet/OrderCommission'//訂單佣金
import MyReward from '@/components/Wallet/MyReward'//我的獎勵
import MyTeam from '@/components/MyTeam/MyTeam'//我的團隊
import MyTeams from '@/components/MyTeam/MyTeams'//我的團隊
import MyUser from '@/components/MyUser/MyUser'//我的客戶
import NonMerPayment from '@/components/MyInfo/NonMerPayment'
import ProductList from '@/components/ProductList/ProductList'
import ProductDetail from '@/components/ProductList/ProductDetail'
import OrderList from '@/components/ProductList/OrderList'
import Author from '@/components/Author/author'
import AuthorTwo from '@/components/Author/authorTwo'
//用户端
import UserLogin from '@/components/User/Login/Login'
import UserApplyMember from '@/components/User/ApplyMember/ApplyMember'
import UserHome from '@/components/User/Home/Home'
import UserMyInfo from '@/components/User/MyInfo/MyInfo'
import UserInfoModify from '@/components/User/MyInfo/InfoModify'
import UserModifyPhone from '@/components/User/MyInfo/ModifyPhone'
import UserOrderList from '@/components/User/OrderList/OrderList'
import UserOrderDetail from '@/components/User/OrderList/OrderDetail'
import UserPaymentDetail from '@/components/User/PaymentDetail/PaymentDetail'
import UserAppointment from '@/components/User/Home/Appointment'
import UserClauseTwo from '@/components/User/Login/ClauseTwo'
import UserMyClient from '@/components/User/MyClient/MyClient'
import UserRecommend from '@/components/User/Recommend/Recommend'
Vue.use(VueRouter)
Vue.use(cookie)
const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/Clause',
    name: 'Clause',
    component: Clause,
    meta: {
      keepAlive: false,
      keepAliveList: false,

    }
  },
  {
    path: '/ClauseTwo',
    name: 'ClauseTwo',
    component: ClauseTwo,
    meta: {
      keepAlive: false,
      keepAliveList: false,

    }
  },
  {
    path: '/Author',//检查授权
    name: 'Author',
    component: Author,
    meta: {
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/AuthorTwo',//检查授权2
    name: 'AuthorTwo',
    component: AuthorTwo,
    meta: {
      requireAuth: true,
      keepAliveList: false
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/MemberRule',
    name: 'MemberRule',
    component: MemberRule,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/ApplyMember',
    name: 'ApplyMember',
    component: ApplyMember,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/Recommend',
    name: 'Recommend',
    component: Recommend,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/MyInfo',
    name: 'MyInfo',
    component: MyInfo,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/InfoModify',
    name: 'InfoModify',
    component: InfoModify,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/ModifyPhone',
    name: 'ModifyPhone',
    component: ModifyPhone,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/NonMerPayment',
    name: 'NonMerPayment',
    component: NonMerPayment,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/Wallet',
    name: 'Wallet',
    component: Wallet,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/CashRecord',
    name: 'CashRecord',
    component: CashRecord,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/ApplyCash',
    name: 'ApplyCash',
    component: ApplyCash,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/AccountSetting',
    name: 'AccountSetting',
    component: AccountSetting,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/OrderCommission',
    name: 'OrderCommission',
    component: OrderCommission,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/MyReward',
    name: 'MyReward',
    component: MyReward,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/MyTeam',
    name: 'MyTeam',
    component: MyTeam,
    meta: {
      keepAlive: false,
      keepAliveList: true,
      requireAuth: true
    }
  },
  {
    path: '/MyTeams',
    name: 'MyTeams',
    component: MyTeams,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/MyUser',
    name: 'MyUser',
    component: MyUser,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/ProductList',
    name: 'ProductList',
    component: ProductList,
    meta: {
      keepAlive: false,
      keepAliveList: true,
      requireAuth: true
    }
  },
  {
    path: '/ProductDetail',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/OrderList',
    name: 'OrderList',
    component: OrderList,
    meta: {
      keepAlive: false,
      keepAliveList: true,
      requireAuth: true
    }
  },
  //用户平臺
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: UserLogin,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserApplyMember',
    name: 'UserApplyMember',
    component: UserApplyMember,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserHome',
    name: 'UserHome',
    component: UserHome,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserMyInfo',
    name: 'UserMyInfo',
    component: UserMyInfo,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserInfoModify',
    name: 'UserInfoModify',
    component: UserInfoModify,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserModifyPhone',
    name: 'UserModifyPhone',
    component: UserModifyPhone,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserOrderList',
    name: 'UserOrderList',
    component: UserOrderList,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserOrderDetail',
    name: 'UserOrderDetail',
    component: UserOrderDetail,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserPaymentDetail',
    name: 'UserPaymentDetail',
    component: UserPaymentDetail,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: true
    }
  },
  {
    path: '/UserAppointment',
    name: 'UserAppointment',
    component: UserAppointment,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: false
    }
  },
  {
    path: '/UserMyClient',
    name: 'UserMyClient',
    component: UserMyClient,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: false
    }
  },
  {
    path: '/UserRecommend',
    name: 'UserRecommend',
    component: UserRecommend,
    meta: {
      keepAlive: false,
      keepAliveList: false,
      requireAuth: false
    }
  },
]
const scrollBehavior = (to, from, savedPosition) => {
  var to_path = to.name.toLocaleLowerCase()
  var from_path = from.name.toLocaleLowerCase()
    // (to_path == 'userorderdetail' && from_path == 'userorderlist')||
  if ((to_path == 'productdetail' && from_path == 'orderlist')||(to_path == 'productdetail' && from_path == 'productlist')||(to_path == 'myteams' && from_path == 'myteam')) {
    from.meta.keepAliveList = true
  }else {
    to.meta.keepAliveList = false
    from.meta.keepAliveList = false
  }
  if (savedPosition) {
    return savedPosition
  } else {
    if (from.meta.keepAliveList) {
      from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop
    }
    return {x: 0, y: to.meta.savedPosition || 0}
  }
}
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior
})
//判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return (arr[2]);
    return null;
  }
  let l_state = document.cookie.indexOf('login_state='),//登陆状态
    // c_state = document.cookie.indexOf('login_id='),//授权状态
    // t_state = document.cookie.indexOf('token='),//token状态
    c_state = getCookie('login_id'),//token状态
    t_state = getCookie('token'),//token状态
    vip_state = document.cookie.indexOf('isvip='),//是否是vip状态
    to_path = to.path.toLocaleLowerCase().split('/')[1].split('?')[0],//路由去往
    from_path = from.path.toLocaleLowerCase().split('/')[1].split('?')[0],//路由去往
    quid = window.location.href.split('?quid=')[1],
    uquid = window.location.href.split('?uquid=')[1],
    //用户端
    user_l_state = document.cookie.indexOf('user_login_state='),//登陆状态
    // user_c_state = document.cookie.indexOf('user_login_id='),//授权状态
    // user_t_state = document.cookie.indexOf('ctoken='),//token状态
    user_c_state = getCookie('user_login_id'),//授权状态
    user_t_state = getCookie('ctoken'),//token状态
    user_vip_state = getCookie('user_isvip')//是否是vip状态
    // user_vip_state = document.cookie.indexOf('user_isvip=')//是否是vip状态
  // console.log(l_state, c_state, t_state, to_path, quid)
  // cookie.set('name', '恒高尊尚會', {expires: 30000, path: '/'})
  // if(from_path=='clause'||from_path=='clausetwo'){
  //   cookie.set('loginType', '3', {expires: 0.004, path: '/'})
  // }else{
  //   cookie.remove('loginType')
  // }
  if(to_path=='login'){
    cookie.set('loginState', 'login', {expires: 30000, path: '/'})
  }else if(to_path=='userlogin'){
    cookie.set('loginState', 'userlogin', {expires: 30000, path: '/'})
  }
  if (cookie.get('loginState') == 'login') {  //分销端
    if (to_path == 'productdetail' || from_path == 'productdetail') {
    } else {
      cookie.remove('SelectId')
      cookie.remove('proSelectId')
    }
    if (to_path == 'home') {
      document.title = cookie.get('h5_name')
    } else if (to_path == 'applymember') {
      document.title = '填寫基本資料'
    } else if (to_path == 'memberrule') {
      document.title = '入會規則'
    } else if (to_path == 'infomodify') {
      document.title = '修改信息'
    } else if (to_path == 'modifyphone') {
      document.title = '修改手提電話'
    } else if (to_path == 'myinfo') {
      document.title = '我的信息'
    } else if (to_path == 'myteam') {
      document.title = '我的團隊'
    } else if (to_path == 'productlist') {
      document.title = '產品列表'
    } else if (to_path == 'productdetail') {
      document.title = '產品詳情'
    } else if (to_path == 'recommend') {
      document.title = '我的推薦碼'
    } else if (to_path == 'accountsetting') {
      document.title = '銀行賬戶設置'
    } else if (to_path == 'applycash') {
      document.title = '申請提現'
    } else if (to_path == 'cashrecord') {
      document.title = '提現記錄'
    } else if (to_path == 'myreward') {
      document.title = '我的獎勵'
    } else if (to_path == 'ordercommission') {
      document.title = '訂單佣金'
    } else if (to_path == 'wallet') {
      document.title = '我的錢包'
    } else if (to_path == 'myuser') {
      document.title = '我的客戶'
    } else if (to_path == 'orderlist') {
      document.title = '訂單'
    } else {
        document.title = cookie.get('h5_name')
    }

    cookie.set('beforeLoginUrl', to.fullPath, {expires: 30000, path: '/'}) // 保存用户进入的url
    if (to.meta.requireAuth) {
      if (t_state == null) {//未登录
        if (to_path != 'login') {
          next({path: '/Login'})
        } else {
          next()
        }
      } else {//已登录
        if (c_state == null) {//未授权
          if (to_path != 'author' && to_path != 'authortwo') {
            next('/Author?t=' + (new Date().getTime()))
          } else if ((to_path == 'author' && to_path != 'authortwo') || (to_path != 'author' && to_path == 'authortwo')) {
            next()
          } else {
            next()
          }
        } else {//已授权
          // console.log('已授权已登录')
          if (to_path == 'login') {
            next('/MemberRule')
            // if(vip_state==-1){//不是会员
            //   next('/MemberRule')
            // }else{
            //   next('/Home')
            // }
          } else {
            next()
          }
        }
      }
    }else{
      next()
    }
  }
  else if(cookie.get('loginState')=='userlogin'){//用户端
    cookie.set('beforeLoginUrl', to.fullPath, {expires: 30000, path: '/'}) // 保存用户进入的url
    if (to_path == 'userhome') {
      document.title = '首頁'
    } else if (to_path == 'userapplymember') {
      document.title = '填寫基本資料'
    } else if (to_path == 'userinfomodify') {
      document.title = '修改信息'
    } else if (to_path == 'usermodifyphone') {
      document.title = '修改手提電話'
    } else if (to_path == 'usermyinfo') {
      document.title = '我的信息'
    } else if (to_path == 'usermyteam') {
      document.title = '我的團隊'
    } else if (to_path == 'usermyteams') {
      document.title = '我的下下級'
    } else if (to_path == 'userorderlist') {
      document.title = '訂單列表'
    } else if (to_path == 'userorderdetail') {
      document.title = '產品詳情'
    } else if (to_path == 'userrecommend') {
      document.title = '我的推薦碼'
    } else if (to_path == 'userpaymentdetail') {
      document.title = '支付明細'
    } else if (to_path == 'userappointment') {
      document.title = '預約'
    } else if (to_path == 'modifyphone') {
      document.title = '預約'
    } else {
      document.title = cookie.get('h5_name')
    }

    if (to.meta.requireAuth) {
      // next()
      if (user_t_state == null) {//未登录
        if (to_path != 'userlogin') {
          next({path: '/UserLogin'})
        } else {
          next()
        }
      } else {//已登录
        if (user_c_state == null) {//未授权
          if (to_path != 'author' && to_path != 'authortwo') {
            next('/Author?t=' + (new Date().getTime()))
          } else if ((to_path == 'author' && to_path != 'authortwo') || (to_path != 'author' && to_path == 'authortwo')) {
            next()
          } else {
            next()
          }
        } else {//已授权
          // console.log('已授权已登录')
          if (to_path == 'userlogin') {
            // next('/UserApplyMember')
            if(user_vip_state==null){
              next('/UserApplyMember')
            }else{
              next('/UserHome')
            }
          } else {
            next()
          }
        }
      }
    }else{
      next()
    }
  }

})
Vue.prototype.goBeforeLoginUrl = () => {
  let url = cookie.get('beforeLoginUrl')
  // alert("跳回原地址"+url)
  router.push(url)
}
export default router