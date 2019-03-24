<template>
    <div class="mall-header">
        <div class="content">
            <img src="" width="100" height="100" :src="seller.avatar" @click="showDetail"/>
            <div class="desc">
                <h3>{{seller.name}}</h3>
                <p v-if="seller.infos">{{seller.infos[3]}}</p>
                <p v-if="seller.supports" :class="supportsType[0]">{{seller.supports[0].description}}</p>
            </div>
        </div>
        <transition name="fold">
            <div class="seller-detail" v-show="detailClass">
                <div class="wrap">
                    <div class="detail-content">
                        {{seller.bulletin}}
                    </div>
                    <div class="detail-close" @click="hideDetail">X</div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script type="text/ecmascript-6">
export default{
    // props: ['seller'],
    props: {
        seller:{
            type: Object
        }
    },
    data(){
        return {
            detailClass: false
        }
    },
   // computed:{
   //     supportsType: function(){
   //         return ['a', 'b', 'c', 'd']
   //     }
   // },
       created(){
        this.supportsType = ['a', 'b', 'c', 'd']
    },
    methods:{
        showDetail(){
            this.detailClass = true;
        },
        hideDetail(){
            this.detailClass = false;
        }
    }
}
</script>

<style scoped>
.mall-header{ border-bottom:1px solid rgba(0,0,0,0.5); background:#000; color:#fff; position: relative}
.mall-header img{margin:20px}
.mall-header .desc{
    display:flex;
    display:-webkit-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    left: 140px;
    top:36px;
}
.seller-detail{
    position:fixed; top:0; left:0; z-index:2000;
    width:100%; height: 100%; color:#fff; overflow: hidden;
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
        transform: translate3d(0, 100%, 0);
        /*opacity:0;*/
    }
    100% {
        transform: translate3d(0, 0, 0);
        /*opacity:1;*/
    }
}
@keyframes fold-out {
    0% {
        transform: translate3d(0, 0, 0);
        /*opacity:1;*/
    }
    100% {
        transform: translate3d(0, 100%, 0);
        /*opacity:0;*/
    }
}
.seller-detail .wrap{
    width:100%; height:100%; position:relative; overflow: hidden;
}
.seller-detail .detail-content{
    width:100%; height: 100%; background:rgba(0,0,0,0.8); padding: 20px 20px 80px 20px; margin-bottom: 50px;
    overflow: auto;
}
.seller-detail .detail-close{
    width:100%; height: 50px; line-height:50px; text-align: center;font-size:26px;
    position: absolute; bottom:0; left:0; background:#000;
}
</style>