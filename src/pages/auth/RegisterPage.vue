<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from 'src/stores/userStore'

const { Register } = useUserStore()
const avatar = 'https://dxmizvfzkojoyelrysft.supabase.co/storage/v1/object/sign/avatars/user_profile.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3VzZXJfcHJvZmlsZS5wbmciLCJpYXQiOjE2ODM4MjM2OTEsImV4cCI6MTcxNTM1OTY5MX0.FKUokYDwxXOAvwae4qUOWF4-WmG39dhIQ7EXV1ZK7DE&t=2023-05-11T16%3A48%3A10.628Z'

const form = ref<{
  email: string,
  password: string,
  username: string

}>({
  email: '',
  password: '',
  username: ''
})

const handleRegister = ()=> {
  try 
  {
    Register(form.value.email, form.value.password, form.value.username,avatar)
  } 
  catch (error) {
    console.log(error)
  }
}

const formNotEmpty = computed<boolean>( () => {
  if (
    form.value.email.length > 6 && 
    form.value.username.length > 3 && 
    form.value.password.length >= 6
  ) return false

  return true
})
</script>

<template>
  <div class="column">
    <div class="row justify-center">
      <h4 class="text-white q-my-md">Register Page</h4>
    </div>
    <div class="row">
      <q-card class="q-pa-lg shadow-1 round-b">
        <q-card-section>
          <q-form class="q-gutter-md text-center"
          @submit="handleRegister">

            <q-input 
            rounded 
            standout 
            bottom-slots 
            v-model="form.email" 
            type="email"  
            label="email" 
            counter>
              <template v-slot:prepend>
                <q-icon name="mail" />
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
            v-model="form.username" 
            type="text"  
            label="User Name" 
            counter>
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
              <template v-slot:append>
                <q-icon v-if="form.username" name="close" @click="form.username = ''" class="cursor-pointer" />
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
                <q-icon name="key" />
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
            label="Register"
            :disable="formNotEmpty"/>

          </q-form>
        </q-card-section>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">you Have an acount?
            <q-btn flat class="purpleStyle" to="/auth/login" label="Login" />
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss">

</style>