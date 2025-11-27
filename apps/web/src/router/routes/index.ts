import type { RouteObject } from 'react-router'
import { adminRoutes } from './admin'
import { guestRoutes } from './guest'

export const routes: RouteObject[] = [
  {
    path: '/404',
  },
  ...guestRoutes,
  ...adminRoutes,
]
