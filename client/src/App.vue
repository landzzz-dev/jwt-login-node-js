<template>
	<header v-if="$route.path !== '/login' && auth.user" class="h-16 p-4 bg-slate-500 text-white flex items-center justify-between">
		<div>
			<strong class="text-2xl">JWT Node.js</strong>
		</div>
		<div>
			<span class="mr-4">Welcome, {{ auth.user?.username }}</span>
			<button @click="logout()" class="border py-1 px-3 rounded-md">Logout</button>
		</div>
	</header>

	<main class="p-4">
		<router-view></router-view>
	</main>
</template>

<script setup>
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();

const logout = async () => {
	await auth.Logout();
	await new Promise((resolve) => setTimeout(resolve, 200));
	location.reload();
}

</script>