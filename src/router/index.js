import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import IECompany from '@/components/IECompany'
import HomePage from '@/components/HomePage'
import NewACCompany from '@/components/NewACCompany'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/IECompany',
      name: 'IECompany',
      component: IECompany
    },
    {
      path: '/NewACCompany',
      name: 'NewACCompany',
      component: NewACCompany
    }
  ]
})
