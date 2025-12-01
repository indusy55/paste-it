import { lazy } from 'react'
import type { RouteObject } from 'react-router'

export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('@/layouts/GuestLayout')),
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/IndexPage')),
      },
      {
        path: 'list',
        Component: lazy(() => import('@/pages/ListPage'))
      }
    ],
  },
]
