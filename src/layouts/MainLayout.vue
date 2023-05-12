<script setup lang="ts">
import { ref,watch } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/userStore'

const $q = useQuasar()
const userStore = useUserStore()
const DarkMode = ref<boolean>(false)
const leftDrawerOpen = ref<boolean>(false)
const text = ref<string>('')

const toggleLeftDrawer = ()=> {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(DarkMode, (newVal) => {
  $q.dark.set(newVal)
})

</script>



<template>
  <q-layout view="lHr lpR fFf">

    <q-header elevated class="bg-info text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">Qwitter</span>
          <q-icon name="flutter_dash" 
          class="lt-md header-icon" 
          size="sm" 
          color="primary"/>
        </q-toolbar-title>


        <q-btn-dropdown
          class="glossy"
          color="secondary"
          :label="userStore.userProfile?.name ? userStore.userProfile?.name: userStore.userProfile?.username"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle
                class="toggle_style"
                v-model="DarkMode"
                checked-icon="dark_mode"
                :color="DarkMode ? 'info' : 'yellow'"
                label="Dark Mode"
                size="lg"
                unchecked-icon="light_mode"
                keep-color
                :dark="DarkMode"
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="userStore.getAvatarUrl">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userStore.userProfile?.username }}</div>

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
                @click="userStore.Logout()"
              />
            </div>
          </div>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="250" bordered>
      <q-icon name="flutter_dash" class="q-pa-sm" size="2rem" color="primary"/>

      <div class="q-pa-md" style="max-width: 350px">
        <q-list>
          <q-item to="/" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="home" size="md"/>
            </q-item-section>
            <q-item-section class="text-weight-bold">Home</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="tag" size="md" />
            </q-item-section>
            <q-item-section class="text-weight-bold">Explore</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications" size="md" />
            </q-item-section>
            <q-item-section class="text-weight-bold">notifications</q-item-section>
          </q-item>

          <q-item to="/about" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help_outline" size="md" />
            </q-item-section>
            <q-item-section class="text-weight-bold">About</q-item-section>
          </q-item>

        </q-list>
      </div>
    </q-drawer>

    <q-drawer show-if-above side="right" bordered>
      <q-input v-model="text" class="q-ma-md" label="Label" rounded outlined>
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced inset />

      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>



<style lang="scss">
.header-icon {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
}

.toggle_style > div > div:first-of-type
{
  opacity: 1;
}

.toggle_style  .q-icon {
  color: #f00;
}
</style>