<template>
    <div class="center">
        <div class="phone:w-[450px] tablet:w-[500px] rounded-2xl p-8 flex flex-col gap-5 shadow-2xl">
            <p class="text-3xl text-center">Login</p>
            <div>
                <label for="username">Username<span class="text-pink-500">*</span></label>
                <input id="username" type="text" class="w-full border border-slate-500 rounded-md py-2 px-3" v-model="credential.username">
            </div>
            <div>
                <label for="password">Password<span class="text-pink-500">*</span></label>
                <input id="password" type="text" class="w-full border border-slate-500 rounded-md py-2 px-3" v-model="credential.password">
            </div>
            <div class="pt-5">
                <button @click="login()" class="w-full bg-green-500 hover:bg-green-400 py-2 px-3 rounded-md text-white">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const credential = ref({
	username: '',
	password: '',
});

const login = async () => {
	const res = await auth.Login(credential.value);
    
	if(res.status == 'success') {
        await new Promise((resolve) => setTimeout(resolve, 200));
        location.reload();
    } else {
        alert(res.message);
    }
}

</script>

<style scoped>

</style>