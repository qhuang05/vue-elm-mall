import '@/assets/css/reset.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Index from '@/pages/index/index';
import InnerPage1 from '@/pages/innerPage1/innerPage1';
import InnerPage2 from '@/pages/innerPage2/innerPage2';
import Todo from '@/pages/todo/todo';
import Mall from '@/pages/mall/mall';
import Goods from '@/pages/goods/goods';
import Ratings from '@/pages/ratings/ratings';
import Seller from '@/pages/seller/seller';

Vue.use(VueRouter);
Vue.use(VueResource);

export default new VueRouter({
    mode: 'history',
    //base: __dirname,
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index'
            }
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {
                    path: 'innerPage1',
                    name: 'innerPage1',
                    component: InnerPage1
                },
                {
                    path: 'innerPage2',
                    name: 'innerPage2',
                    component: InnerPage2
                }
            ]
        },
        {
            path: '/todo',
            name: 'todo',
            component: Todo
        },
        {
            path: '/mall',
            name: 'mall',
            component: Mall,
            children:[
                {
                    path: 'index',
                    name: 'goods',
                    component: Goods
                },
                {
                    path: 'ratings',
                    name: 'ratings',
                    component: Ratings
                },
                {
                    path: 'seller',
                    name: 'seller',
                    component: Seller
                }
            ]
        }
    ]
})

