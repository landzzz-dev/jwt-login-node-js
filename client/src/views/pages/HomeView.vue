<template>
	<button>Get user</button>
	<div>
		{{ user }}
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import $axios from '@/plugins/axios';

const auth = useAuthStore();

const user = ref(null)

onMounted(async () => {
	try {
		const res = await $axios.get('/api/artists');
		user.value = res.data;
	} catch (err) {
		console.error('Error fetching user:', err);
	}
});

// const getUser = async () => {
// 	try {
// 		const res = await $axios.get('/api/artists');
// 		user.value = res.data;
// 	} catch (err) {
// 		console.error('Error fetching user:', err);
// 	}
// }

</script>

<style scoped>

</style>