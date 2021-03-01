import React from 'react';

const Home = React.lazy(() => import('@page/Home'))
const Realtime = React.lazy(() => import('@page/Realtime'))
const History = React.lazy(() => import('@page/History'))
const Report = React.lazy(() => import('@page/Report'))
const routes = [
  { path: '/client', exact: true, name: 'Home', component: Home },
  { path: '/client/realtime', exact: true, name: 'Realtime', component: Realtime },
  { path: '/client/history', exact: true, name: 'History', component: History },
  { path: '/client/report', exact: true, name: 'Report', component: Report },
]
export default routes;