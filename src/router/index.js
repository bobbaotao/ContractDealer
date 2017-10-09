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
import ACDealerPage from '@/components/ZeissWeb/ACDealerList'
import TaskDetail from '@/components/ZeissWeb/TaskDetail'
import DealerApplicationPage from '@/components/ZeissWeb/DealerApplicationPage'

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
      path: '/TaskDetail/:dealerId/:taskId',
      name: 'TaskDetail',
      component: TaskDetail
    }
    ,
    {
        path: '/DealerDetail/:dealerId',
        name: 'DealerDetail',
        component: DealerDetail
    }
    ,
    {
      path: '/ACDealerPage',
      name: 'ACDealerPage',
      component: ACDealerPage
    }
    ,
    {
      path: '/DealerApplicationPage/:dealerId',
      name: 'DealerApplicationPage',
      component: DealerApplicationPage
    }
    ,
    {
      path: '/DealerApplicationTask/:dealerId/:taskId',
      name: 'DealerApplicationTask',
      component: DealerApplicationPage
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
