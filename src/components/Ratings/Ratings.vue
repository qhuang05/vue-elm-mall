<template>
    <div class="ratings">
        <div class="rating-type">
            <h3>商品评价：</h3>
            <ul>
                <li :class="{'active': ratingType===-1}" @click="changeRatingTab(-1, $event)">{{ratingTitle.all}} {{ratings.length}}</li>
                <li :class="{'active': ratingType===0}" @click="changeRatingTab(0, $event)">{{ratingTitle.good}} {{goodRatings.length}}</li>
                <li :class="{'active': ratingType===1}" @click="changeRatingTab(1, $event)">{{ratingTitle.bad}} {{badRatings.length}}</li>
            </ul>
        </div>
        <div class="rating-content">
            <ul v-show="ratingType===-1">
                <li v-for="rating in ratings">
                    <p v-if="rating.text">{{rating.text}}</p>
                    <p v-else="rating.text">没有评价！</p>
                    <p class="name">{{rating.username}}</p>
                </li>
            </ul>
            <ul v-show="ratingType===0">
                <li v-for="rating in goodRatings">
                    <p v-if="rating.text">{{rating.text}}</p>
                    <p v-else="rating.text">没有评价！</p>
                    <p class="name">{{rating.username}}</p>
                </li>
            </ul>
            <ul v-show="ratingType===1">
                <li v-for="rating in badRatings">
                    <p v-if="rating.text">{{rating.text}}</p>
                    <p v-else="rating.text">没有评价！</p>
                    <p class="name">{{rating.username}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const ALL = -1;
export default{
    props:{
        ratings: {
            type: Array,
            default(){
                return [];
            }
        },
        initRatingType: {
            type: Number,
            default: ALL
        },
        ratingTitle:{
            type: Object,
            default(){
                return {
                    'all': '全部',
                    'good': '满意',
                    'bad': '不满意'
                }
            }
        }
    },
    data(){
      return {
          ratingType: this.initRatingType
      }
  },
  computed:{
    goodRatings(){
        return this.ratings.filter(function(rating){
            return rating.rateType === 0;
        });
    },
    badRatings(){
        return this.ratings.filter(function(rating){
            return rating.rateType === 1;
        });
    }
    },
    methods:{
        changeRatingTab(ratingType, event){
            this.ratingType = ratingType;
            this.$emit('ratingTabChange', ratingType);
        }
    }
}
</script>

<style scoped>
.rating-type h3{padding-left:10px;}
.rating-type ul{background: #f4f4f4; padding:10px;}
.rating-type li{display: inline-block; padding:5px 15px; background: #ccc; color:#fff; cursor: pointer}
.rating-type li.active{background: dodgerblue;}
.rating-content ul{padding-bottom: 15px;}
.rating-content li{
    padding:10px; border-bottom:1px solid #f4f4f4;
}
.rating-content li p{display: inline-block}
.rating-content li p.name{float:right}
</style>