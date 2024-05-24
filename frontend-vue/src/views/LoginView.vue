<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import MoldemeService from '../services/MoldemeService'
  import UserController from '../controllers/UserController'
  const router = useRouter()
  const route = useRoute()
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')

  /*
    O método submitForm trabalha na regra de negócio, porém é uma regra de negócio
    que tem acesso direto ao DOM, enquanto o controller é isolado e acessar o 
    serviço externo.

    Existe duas formas de trabalhar, a primeira é utilizando as promises para separar as 
    responsabilidades e por meio de callbacks.
    em UserController aproveitei o conceito e chamádas assíncrona, e no comando 'then'
    Passando a lógica para acessar o DOM (Virtual DOM na verdade).

    Os outros controllers por sua vez trabalhei 100% com callbacks
  */
  const submitForm = async (e: Event) => {
    e.preventDefault()
    const apiService = new MoldemeService('https://recrutamento.molde.me');
    const userController = new UserController(apiService)
    const next_router = route.query.next as string
    
    if(!next_router) {
      errorMessage.value = ""
    }

    // [method] utilizando promises
    userController.login(email.value, password.value).then(response => {
      const user_auth = response.data.auth_token
      const user_name = response.data.user.name
      if (next_router) {
        router.replace({
          name: next_router ,
          query : { auth: user_auth, name: user_name},
        })
      } else {
        router.push({
          name: 'dashboard',
          query : { auth: user_auth, name: user_name},
        })
      }

      // A aprimorar: Um tratamento genérico como esse não permite verificar se o erro foi de login, senha ou mesmo um erro interno na api (status 500)
    }).catch(error => {      
      errorMessage.value = error.message
    })
  }

  onMounted(() => {
    if(route.query.next) {
      errorMessage.value = "Ops! Parece que o seu token expirou. Por favor, faça o login novamente"
    }
  })
</script>

<style> 
</style>

<template>
  <main>
    <div class="w-full max-w-xs">
      <form @submit="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" name="uname" placeholder="Username" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Senha
          </label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="psw" placeholder="****" required>
        </div>        
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Entrar
          </button>
        </div>
      </form>
    </div>
  </main>
</template>