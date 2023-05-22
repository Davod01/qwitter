import { defineStore } from 'pinia';
import useSupabase from 'src/boot/supabase';
import { User } from '@supabase/supabase-js';
import { TProfile } from 'src/types/QwittsType';
// import quasarIcon from 'src/assets/quasar-logo-vertical'
const quasarIcon = require('src/assets/quasar-logo-vertical.svg');

const { supabase } = useSupabase();

export const useUserStore = defineStore('userStore', {
  state: () => ({
    authUser: null as User | null,
    userProfile: null as TProfile | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.authUser,
    getAvatarUrl: (state) =>
      !!state.userProfile?.avatar_url
        ? state.userProfile.avatar_url
        : quasarIcon,
  },
  actions: {
    async Login(email: string, password: string) {
      try {
        if (!!this.authUser) throw 'user exist';
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        this.authUser = data.user;
        this.getProfile();
        this.router.replace({ name: 'Home' });
      } catch (error) {
        console.log(error)
      }
    },

    async CheckUserLoggedIn() {
      try {
        const { data, error } = await supabase.auth.getSession();
        const user = data.session?.user;

        if (error) throw error;
        if (data.session) {
          this.authUser = user as User;
          this.getProfile();
          this.router.replace({ name: 'Home' });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async Logout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.authUser = null;
        this.userProfile = null;
        this.router.replace({ name: 'Login' });
      } catch (error) {
        console.log(error);
      }
    },

    async getProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', this.authUser?.id);
        if (error) throw error;
        this.userProfile = data[0] as TProfile;
      } catch (error) {
        console.log(error);
      }
    },

    async Register(
      email: string,
      password: string,
      username: string,
      avatar: string
    ) {
      try {
        console.log(avatar);
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              avatar_url: avatar,
            },
          },
        });
        if (error) throw error;
        this.authUser = data.user;
        this.getProfile();
        this.router.replace({ name: 'Home' });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
