import Vue from 'vue';
import Router from 'vue-router';
import ContactPage from '@/components/contact-page.vue';
import Home from '@/components/home-page.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path:'/',
        component: Home,
    },{
        path:'/contact/:id',
        props: true,
        component: ContactPage
    }]
});
