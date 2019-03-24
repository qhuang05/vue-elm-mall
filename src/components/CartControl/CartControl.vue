<template>
    <div class="cart-control">
        <button class="decrease" v-show="food.count>0" @click.stop="reduceFromCart">－</button>
        <span class="count" v-show="food.count>0">{{food.count}}</span>
        <button class="increase" @click.stop="addToCart">＋</button>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default{
    props:{
        food:{
            type: Object
        }
    },
    methods:{
        addToCart(){
            if(!this.food.count){
                    //备注：当添加属性时，要使用Vue.set(), 才能使DOM产生变化
                    //this.food.count = 1; //DOM不生效
                    Vue.set(this.food, 'count', 1);
                } else{
                    this.food.count++;
                }
            },
            reduceFromCart(){
                if(this.food.count){
                    this.food.count--;
                }
            }
        }
    }
    </script>

    <style scoped>
    .cart-control button{
        padding:2px 10px; background:transparent; outline:0; border:1px solid #ccc; cursor: pointer;
    }
    .cart-control .count{
        display:inline-block; width:20px; text-align: center;
    }
    </style>