import { bxAnaalyse } from '@/assets/icons'

export default [
  {
    path: '/',
    name: 'index',
    meta: { title: 'Home' },
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        hideChildrenInMenu: false,
        meta: { title: 'Dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'dashboard-workplace',
            meta: { title: 'Workplace', keepAlive: true, icon: 'form', permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/analysis',
            name: 'dashboard-analysis',
            meta: { title: 'Analysis', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      }
    ]
  }
]
