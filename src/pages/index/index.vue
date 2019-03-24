<template>
    <div class="index">
        <nav>
            <ul class="menu">
                <li class="list-item">
                    <h3><router-link :to="{name: 'index'}">Index</router-link></h3>
                    <ul class="sub-list">
                        <li><router-link :to="{name: 'innerPage1'}">嵌套页面1</router-link></li>
                        <li><router-link :to="{name: 'innerPage2'}">嵌套页面2</router-link></li>
                    </ul>
                </li>
                <li class="list-item"><h3><router-link :to="{name: 'todo'}">ToDo示例</router-link></h3></li>
                <li class="list-item"><h3><router-link :to="{name: 'goods', query:{sellerId: 1}}">仿饿了么案例</router-link></h3></li>
            </ul>
        </nav>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'index'
}
</script>

<style scoped>
.menu{padding-left:30px;}
.list-item{line-height:45px;list-style: decimal outside;}
.list-item h3{line-height: 30px;}
.sub-list{ padding-left:20px}
.sub-list li{
    list-style: circle outside; background:deepskyblue; margin:10px 0;
}
</style>