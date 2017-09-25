import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
//import IECompany from '@/components/IECompany'
import HomePage from '@/components/PortalWeb/HomePage'
//import NewACCompany from '@/components/NewACCompany'
import ErrorPage from '@/components/ErrorPage'
import ZeissHomePage from '@/components/ZeissWeb/ZeissHomePage'
import AllContractDealerPage from '@/components/ZeissWeb/AllContractDealerPage'
import ZeissTask from '@/components/ZeissWeb/ZeissTask'
import DealerDetail from '@/components/ZeissWeb/DealerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
    ,
    {
      path: '/ErrorPage',
      name: 'ErrorPage',
      component: ErrorPage
    }
    ,
    {
      path: '/ZeissHomePage',
      name: 'ZeissHomePage',
      component: ZeissHomePage
    }
    ,
    {
      path: '/ZeissTask',
      name: 'ZeissTask',
      component: ZeissTask
    }
    ,
    {
      path: '/AllContractDealerPage',
      name: 'AllContractDealerPage',
      component: AllContractDealerPage
    }
    ,
    {
      path: '/DealerDetail/:dealerId',
      name: 'DealerDetail',
      component: DealerDetail
    }
    // ,
    // {
    //   path: '/IECompany',
    //   name: 'IECompany',
    //   component: IECompany
    // },
    // {
    //   path: '/NewACCompany',
    //   name: 'NewACCompany',
    //   component: NewACCompany
    // }
  ]
})
