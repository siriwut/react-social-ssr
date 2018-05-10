import React from 'react'

import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('containers/home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/other',
    exact: true,
    component: asyncComponent({
      loader: () => import('containers/other'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  }
]
