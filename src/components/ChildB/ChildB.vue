<template>
	<div id="childB">
		<p>{{ c_msg }}</p>
		<button @click="getParent">获取父组件信息</button>
		<button @click="toParent">传值给父组件</button>
	</div>
</template>

<script>
export default {
	name: 'childB',
	props: ['msgFromParent'],
	data: function(){
		return{
			c_msg: 'I am childB\'s message'
		}
	},
	methods: {
		getParent: function(){
			this.c_msg = this.msgFromParent;
		},
		toParent: function(){
			this.$emit('toParent', this.c_msg);
		}
	}
}
</script>

<style scoped>
#childB{ width: 400px; height: 200px; border:2px solid blue; margin:0 auto}
</style>
