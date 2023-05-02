import { defineStore } from 'pinia'
import { TProfile } from 'src/types/QwittsType'
import useAuthUser from 'src/composables/UserAuthUser'

const { GetProfile } = useAuthUser()

export const useProfileStore = defineStore('profile',{
  state: () => ({
    profile: null as TProfile | null
  }),
  getters: {
    getUserName: (state) => state.profile?.username 
  },
  actions: {
    intit () {
      GetProfile().then( (res) => {
        this.profile = res[0] as TProfile
      })
    }
  }
})