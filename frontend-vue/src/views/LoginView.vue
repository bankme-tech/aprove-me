<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const signIn = async (e: Event) => {
  e.preventDefault();
  const nextRouter = route.query.next || '/'; 

  const result = await fetch("http://localhost:3000/integrations/auth", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  });
  const data = await result.json();

  if (result.ok) {
    localStorage.setItem("session-token", data.token);
    router.push(nextRouter);
  } else {
    errorMessage.value = data.message || "Erro desconhecido durante o login.";
  }
};

const signUp = async (e: Event) => {
  e.preventDefault();
  const nextRouter = route.query.next || '/'; 

  const result = await fetch("http://localhost:3000/integrations/register", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  });
  const data = await result.json();

  if (result.ok) {
    localStorage.setItem("session-token", data.token);
    router.push(nextRouter);
  } else {
    errorMessage.value = data.message || "Erro desconhecido durante o registro.";
  }
};

onMounted(() => {
  if (route.query.next) {
    errorMessage.value = route.query.message
  }
});
</script>



<template>
  <main>
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Username" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Senha
          </label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="****" required>
        </div>        
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div class="flex items-center justify-between">
          <button @click="signIn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Entrar
          </button>
          <button @click="signUp" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Registrar
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
