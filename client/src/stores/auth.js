import { defineStore } from "pinia";
import { computed, ref } from "vue";
import $axios from '@/plugins/axios';

export const useAuthStore = defineStore('auth', () => {
    // const api = ref(import.meta.env.VITE_APP_URL);
    const user = ref(null);
    const token = ref(null);
    const accessToken = computed(() => token.value);

    const Login = async (credential) => {
        try {
            const res = await $axios.post('/auth/login', credential);
            user.value = res.data.user;
            token.value = res.data.accessToken;
            return res.data;
        } catch (err) {
            console.error('Error logging in: ', err);
            return err.response.data;
        }
    };


    const Logout = async () => {
        try {
            await $axios.delete('/auth/logout');   
            user.value = null;
            token.value = null;
        } catch (err) {
            console.error('Error logging out: ', err);
        }
    }

    return {
        user,
        token,
        accessToken,
        Login,
        Logout,
    }
    
}, { persist: true });
