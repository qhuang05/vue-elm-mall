<template>
    <div id="todoList">
        <h1 id="title">{{title}}</h1>
        <h3 v-html="tit_desc"></h3>
        <input type="text" class="new-item" v-model="new_item" @keyup.enter="addNewItem" placeholder="请输入内容"/>
        <ul class="todo-list">
            <li v-for="(item, index) in items" :class="['list-item',{finished: item.isFinished}]" @click="showIndex(index)">
                <span>{{item.label}}</span>
                <button @click.stop="toggleStatus(item)">{{item.btnLabel}}</button>
            </li>
        </ul>
        <p class="split">我是分割线</p>
        <p>{{ p_msg }}</p>
        <child-a :msg-from-parent="p_msg" @toParent="getChildMsg"></child-a>
        <child-b :msg-from-parent="p_msg" @toParent="getChildMsg"></child-b>
    </div>
</template>

<script>
import ChildA from '@/components/ChildA/ChildA';
import ChildB from '@/components/ChildB/ChildB';
import Storage from '@/assets/js/storage';
import Zepto from '@/assets/js/lib/zepto-1.1.6.min'
export default{
    data: function(){
        return {
            title: 'This is a Todo List',
            tit_desc: '<i>This is the title description</i>',
            items: '',
            new_item: '',
            p_msg: '我是父组件内容'
        }
    },
    created: function(){
        if(Storage.get()){
            this.items = Storage.get();
        } else{
            this.items = [];
        }
    },
    methods: {
        showIndex: function(index){
            alert('这是第' + (index+1) + '列表');
        },
        toggleStatus: function(item){
            item.isFinished = !item.isFinished;
            if(item.isFinished){
                item.btnLabel = '已完成';
            } else{
                item.btnLabel = '未处理';
            }
        },
        addNewItem:function(){
            this.items.push({
                label: this.new_item,
                isFinished: false,
                btnLabel: '未处理'
            });
            this.new_item = '';
        },
        getChildMsg: function(cMsg){
            this.p_msg = cMsg;
        }
    },
    watch: {
        items: {
            handler: function(newValue, oldValue){
                Storage.set(newValue);
            },
            deep: true
        }
    },
    components:{ ChildA, ChildB }
}
</script>

<style scoped>
#todoList{ padding: 20px;}
#todoList h1{ font-size: 30px; font-weight: bold; color: red; text-align: center}
#todoList h3{ font-weight: normal; font-size: 16px; text-align: center; line-height: 30px;}
#todoList .new-item{ width: 100%; margin:0 auto; display:block; line-height: 40px; outline: none; border:1px solid #ccc; text-align: center}
.todo-list{text-align: center; list-style: none}
.todo-list li{ list-style:none; background: cornflowerblue; margin: 5px 0; padding:10px}
.todo-list li.finished{ color: darkgray; text-decoration: line-through; background: #ccc;}
.todo-list li button{ margin-left: 10px; background: #000; color:#fff; border:0; border-radius: 5px}
.split{
    position:relative; margin:20px 0;
}
.split:before, .split:after{
    display: block; content:''; width:40%; height: 1px; background:red; position:absolute; top:50%;
}
.split:before{left:0}
.split:after{right:0}
p{ text-align: center}
</style>