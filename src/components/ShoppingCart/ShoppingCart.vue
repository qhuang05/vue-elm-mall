<template>
    <div class="shopping-cart">
        <div class="wrap">
            <div class="content" @click="toggleList">
                <div class="left">
                    购物车:
                    <span class="total">
                        <i class="count" :class="{'highlight': totalCount>0}">{{totalCount}}</i>
                        <span class="price"><em class="color-red">￥{{totalPrice}}</em></span>
                    </span>
                </div>
                <div class="right">
                    <span class="delivery-price">配送费 <em class="color-red">￥{{deliveryPrice}}</em> 元</span>
                    <!--<span class="min-price" v-if="totalPrice<minPrice"><em>￥{{minPrice}}</em> 元起送</span>-->
                    <!--<span class="enough-price" v-else>去结算</span>-->
                    <span :class="payClass">{{payDesc}}</span>
                </div>
            </div>
            <div class="food-list" v-show="listShow">
                <p class="title">
                    购物车 <span class="clear" @click="clearCart">清空</span>
                </p>
                <ul>
                    <li v-for="food in selectedFoods">
                        {{food.name}}
                        <div class="count-info">
                            ￥{{food.price*food.count}}
                            <div class="cart-control-wrap">
                                <cart-control :food="food"></cart-control>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import CartControl from '@/components/CartControl/CartControl';
export default{
    // props: ['deliveryPrice', 'minPrice', 'selectedFoods']
    props:{
        deliveryPrice:{
            type: Number,
            default: 0
        },
        minPrice:{
            type: Number,
            default:0
        },
        selectedFoods: {
            type: Array,
            // default(){
            //    return [
            //        {
            //            count: 0,
            //            price: 0
            //        }
            //    ];
            // }
            default:[]
        }
    },
    data(){
        return{
            listShow: false
        }
    },
    computed:{
        totalPrice(){
            var total = 0;
            this.selectedFoods.forEach(function(food, index){
                total += Number(food.price) * Number(food.count);
            });
            return total;
        },
        totalCount(){
            var total = 0;
            this.selectedFoods.forEach(function(food, index){
                total += Number(food.count);
            });
            return total;
        },
        payDesc(){
            if(this.totalPrice == 0){
                return '￥' + this.minPrice + '元起送';
            } else if(this.totalPrice < this.minPrice){
                var diff = this.minPrice - this.totalPrice;
                return '还差￥' + diff + '元起送';
            } else{
                return '去结算';
            }
        },
        payClass(){
            if(this.totalPrice == 0 || this.totalPrice < this.minPrice){
                return 'min-price';
            } else{
                return 'enough-price';
            }
        }
    },
    methods:{
        toggleList(){
            this.listShow = !this.listShow;
        },
        clearCart(){
            this.selectedFoods = [];
        }
    },
    components: {CartControl}
}
</script>

<style scoped>
.shopping-cart{
    width:100%;height: 46px; line-height:46px; color:#fff;
    position:fixed; bottom:0;left:0;z-index:100;
}
.shopping-cart .wrap{
    position:relative;background:#000;
}
.shopping-cart .left{
    padding-left:15px;
}
.shopping-cart .right{
    height:46px; line-height:46px; position:absolute;right:0;top:0;
}
.shopping-cart .color-red{
    color:orangered;
}
.shopping-cart .total{
    position: relative; line-height: 46px;
}
.shopping-cart .total .count{
    display:inline-block; width: 25px; height: 25px; line-height:25px; text-align:center;  background:#666; color:#fff; font-size:12px;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    position: absolute; top:-10px; left:0;
}
.shopping-cart .total .count.highlight{
    background: orangered;
}
.shopping-cart .total .price{
    margin-left: 30px;
}
.shopping-cart .min-price, .shopping-cart .enough-price{
    display:inline-block; height: 46px; line-height: 46px; background:#ccc; padding:0 10px; margin-left:10px;

}
.shopping-cart .enough-price{
    border-color:orangered; color:orangered;
}

.shopping-cart .food-list{
    position: absolute; top:0; left:0; z-index:-1;
    width:100%; max-height: 320px; overflow-y:auto; background:#fff; color:#000;
    transform: translateY(-100%); -webkit-transform: translateY(-100%);
}
.shopping-cart .food-list .title{
    padding:0 15px; border-bottom:1px solid #f4f4f4; border-top:1px solid #f4f4f4;
}
.shopping-cart .food-list .clear{
    float:right; color: orangered;
}
.shopping-cart .food-list li{
    padding-left:15px; height: 46px; line-height: 46px; clear:both; border-bottom:1px solid #f4f4f4;
}
.shopping-cart .food-list .count-info{
    display:inline-block; float:right; padding-right: 15px;
}
.shopping-cart .food-list .cart-control-wrap{
    display:inline-block;
}
</style>
