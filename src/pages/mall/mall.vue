<template>
    <div id="mallPage">
        <mall-header :seller="seller"></mall-header>
        <div class="tab-menu">
            <ul>
                <router-link :to="{name: 'goods'}" tag="li" class="router-link-exact-active">商品</router-link>
                <router-link :to="{name: 'ratings'}" tag="li">评论</router-link>
                <router-link :to="{name: 'seller'}" tag="li">商家</router-link>
            </ul>
        </div>
        <div class="tab-content">
            <transition name="fade">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/css/reset.css'
import MallHeader from '@/components/MallHeader/MallHeader'
import mockData from '../../../data.json'
export default{
    name: 'mall',
    data(){
        return {
            seller: {}
        }
    },
    created(){
        this.$http.get('/api/getSeller').then((response) => {
            response = response.body;
            if (response.status === 0) {
                this.seller = response.data;
            }
        }, (error) => {
            // alert('数据接口请求出错！');
            this.seller = mockData.seller
        });
    },
    components: {MallHeader}
}
</script>

<style scoped>
header {
    width: 100%;
    height: 200px;
    background: cornflowerblue
}

.tab-menu ul {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #666;
}

.tab-menu li {
    width: 100%;
    height: 45px;
    line-height: 45px;
}

.router-link-exact-active.router-link-active {
    color: orangered;
    background: #ccc;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}

.fold-enter-active {
    animation-name: fold-in;
    animation-duration: .5s;
}

.fold-leave-active {
    animation-name: fold-out;
    animation-duration: .5s;
}

@keyframes fold-in {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
    }
}

@keyframes fold-out {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>