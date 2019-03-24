<template>
    <div id="goodsPage">
        <div class="menu-wrap">
            <ul>
                <li v-for="good in goods">
                    <span>{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="goods-wrap">
            <ul>
                <li v-for="good in goods" class="good-item">
                    <h2>{{good.name}}</h2>
                    <ul>
                        <li v-for="food in good.foods" class="food-item" @click="showFoodDetail(food, $event)">
                            <div class="food-image">
                                <img src="food.image" width="100" height="100">
                            </div>
                            <div class="food-text">
                                <h4>{{food.name}}</h4>
                                <p class="desc">{{food.description}}</p>
                                <p class="sales">月销量 {{food.sellCount}}份</p>
                                <p><span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}元</span>￥{{food.price}}元</p>
                            </div>
                            <div class="cart-control-wrap">
                                <cart-control :food="food"></cart-control>
                            </div>
                            <!--<div class="opt-btn">-->
                                <!--<button class="reduce" @click="reduceFood">－</button>-->
                                <!--<span>{{food.total}}</span>-->
                                <!--<button class="increase" @click="addFood">＋</button>-->
                                <!--</div>-->
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!--<shopping-cart :seller="seller"></shopping-cart>-->
            <shopping-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectedFoods="selectedFoods"></shopping-cart>
            <food-detail :food="clickedFood" ref="detail"></food-detail>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart'
import CartControl from '@/components/CartControl/CartControl'
import FoodDetail from '@/components/FoodDetail/FoodDetail'
import mockData from '../../../data.json'
export default{
    name: 'goods',
    data(){
        return {
            seller: {},
            goods: [],
            clickedFood: {},
            showFlag: false
        }
    },
    computed:{
      selectedFoods(){
          var foodsArr = [];
          this.goods.forEach(function(good,index){
              good.foods.forEach(function(food, index){
                  if(food.count){
                      foodsArr.push(food);
                  }
              });
          });
          return foodsArr;
      }
  },
  created(){
    this.$http.get('/api/getSeller').then((response) => {
        response = response.body;
        if(response.status == 0){
            this.seller = response.data;
        }
    }, (error) => {
        // alert('数据接口请求出错！');
        this.seller = mockData.seller
    });

    this.$http.get('/api/getGoods').then((response) => {
        response = response.body;
        if (response.status === 0) {
            this.goods = response.data;
            // this.goods.forEach(function(good, index){
            //     good.foods.forEach(function(food, index){
            //         food.total = 1;
            //     });
            // });
            }
        }, (error) => {
            // alert('数据接口请求出错！');
            this.goods = mockData.goods; 
        });
    },
methods:{
    showFoodDetail(food, $event){
        this.clickedFood = food;
        this.$refs.detail.show();
    }
},
components:{ShoppingCart, CartControl, FoodDetail}
}
</script>

<style scoped>
#goodsPage {
    position: absolute;
    top: 191px;
    bottom: 46px;
    border-bottom: 1px solid #666;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
}

.menu-wrap {
    width: 90px;
    border-right: 1px solid #666;
    overflow: hidden;
}
.menu-wrap ul{
    height: 100%;
    overflow: auto;
}
.menu-wrap li {
    display: table;
    width: 100%;
    height: 56px;
    text-align: center;
    background:#f4f4f4;
}
.menu-wrap li:not(:last-child){
    border-bottom:1px solid #666;
}

.menu-wrap li span{
    display:table-cell;
    vertical-align: middle;
}
.goods-wrap {
    width: 100%; overflow: hidden;
}
.goods-wrap ul{
    height: 100%; overflow: auto;
}
.good-item h2{
    height: 36px; line-height: 36px;padding-left:15px; background: #f4f4f4;
}
.food-item{
    display:flex;
    margin-left:15px;
    padding:15px 0;
    position: relative;
}
.food-item:not(:last-child){
    border-bottom:1px solid #ddd;
}
.food-item .food-text{
    display: flex;
    display:-webkit-flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.food-item .old-price{
    text-decoration: line-through;
}
.cart-control-wrap{
    position:absolute;bottom:20px; right:15px;
}
</style>
