import { useRouter } from 'vue-router'

export default function useSwitch() {
  const router = useRouter()
  const redirectPage = async (name = 'login', next = 'dashboard') => {
    router.replace({ name, query: { next } })
  }
  return {
    redirectPage
  }
}