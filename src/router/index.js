import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/components/Main'
import MusicItemPreview from '@/components/MusicItemPreview'
import Home from '@/views/Home'
import Events from '@/views/Events'
import Music from '@/views/Music'
import About from '@/views/About'
import Contacts from '@/views/Contacts'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/events',
        name: 'events',
        component: Events,
    },
    {
        path: '/music',
        name: 'music',
        component: Music,
        children:[
            {
                path: ':itemprop',
                //props: { itemprop: 321 },
                name: 'MusicItemPreview',
                component: MusicItemPreview
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/contact',
        name: 'contacts',
        component: Contacts,
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
