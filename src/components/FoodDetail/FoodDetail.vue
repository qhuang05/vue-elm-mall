<template>
    <transition name="slide">
        <div class="food-detail" v-show="showFlag">
            <div class="image-wrap">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498168770233&di=77da893c57440ec65d5a986e7f453f89&imgtype=0&src=http%3A%2F%2Fimg4.cache.netease.com%2Fjiankang%2F2016%2F4%2F14%2F20160414113413c57fe_550.jpg" />
                <button class="back" @click="hide">返回</button>
                <!--<cart-control :food="food"></cart-control>-->
                <button class="buy" v-show="!food.count" @click="addFood">加入购物车</button>
            </div>
            <div class="desc-info">
                <h3>{{food.name}}</h3>
                <p>{{food.info}}</p>
            </div>
            <ratings :ratings="food.ratings" :initRatingType="ratingType" :ratingTitle="ratingTitle"></ratings>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import CartControl from '@/components/CartControl/CartControl'
import Ratings from '@/components/Ratings/Ratings'
export default{
    props:{
        food:{
            type: Object
        }
    },
    data(){
        return{
            showFlag: false,
            ratingType: -1,
            ratingTitle:{
                'all':　'全部',
                'good': '推荐',
                'bad': '吐槽'
            }
        }
    },
    methods: {
        show(){
            this.showFlag = true;
            this.ratingType = -1;
        },
        hide(){
            this.showFlag = false;
        },
        addFood(){
            Vue.set(this.food, 'count', 1);
        }
    },
    components:{CartControl, Ratings}
}
</script>

<style scoped>
.food-detail{
    position: fixed; top:0; bottom:46px; width:100%; z-index:30; background:#fff; overflow: auto;
}
.slide-enter-active{
    -webkit-animation: slideInRight 0.5s;
    -o-animation: slideInRight 0.5s;
    animation: slideInRight 0.5s;
}
.slide-leave-active{
    -webkit-animation: slideOutRight 0.5s;
    -o-animation: slideOutRight 0.5s;
    animation: slideOutRight 0.5s;
}
@keyframes slideInRight {
    0%{
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
    }
    100%{
        transform: translateX(0);
        -webkit-transform: translateX(0);
    }
}
@keyframes slideOutRight {
    0%{
        transform: translateX(0);
        -webkit-transform: translateX(0);
    }
    100%{
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
    }
}
.image-wrap{
    position:relative;width:100%; height: 0; padding-top:100%
}
.image-wrap img{
    position:absolute; top:0;left:0; width:100%; height: 100%;
}
.image-wrap .back{
    position:absolute; top:15px; left:15px; background: none;
}
.image-wrap .buy{
    position:absolute; bottom:15px; right:15px; background: dodgerblue; border:0; padding:10px 15px; color:#fff; border-radius:10px;-webkit-border-radius: 10px;
}
.desc-info{padding:15px;}
</style>