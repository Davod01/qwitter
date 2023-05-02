<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from 'src/stores/userStore'

const userStore = useUserStore()

const form = ref<{
  email: string,
  password: string
}>({
  email: '',
  password: ''
})

const formNotEmpty = computed<boolean>( () => {
  if (form.value.email.length > 6 && form.value.password.length >= 6) return false

  return true
})

</script>



<template>
  <div class="column">
    <div class="row justify-center">
      <h4 class="text-white q-my-md">Login Page</h4>
    </div>
    <div class="row">
      <q-card class="q-pa-lg shadow-1 round-b">
        <q-card-section>
          <q-form class="q-gutter-md text-center"
          @submit="userStore.Login(form.email, form.password)">

            <q-input 
            rounded 
            standout 
            bottom-slots 
            v-model="form.email" 
            type="email"  
            label="email" 
            counter>
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:append>
                <q-icon v-if="form.email" name="close" @click="form.email = ''" class="cursor-pointer" />
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>

            <q-input 
            rounded 
            standout 
            bottom-slots 
            v-model="form.password" 
            type="password"  
            label="password" 
            counter>
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:append>
                <q-icon v-if="form.password" name="close" @click="form.password = ''" class="cursor-pointer" />
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>

            <q-btn 
            type="submit"
            rounded
            class="back-gradiant purpleStyle q-px-lg"
            label="Login"
            :disable="formNotEmpty"/>

          </q-form>
        </q-card-section>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">Not reigistered?
            <q-btn flat class="purpleStyle" to="/auth/register" label="Created an Account" />
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss">
.round-b{
  border-radius: 1rem !important;
}
</style>