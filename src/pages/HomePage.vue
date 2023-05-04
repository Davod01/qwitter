<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import useSupabase from 'src/boot/supabase'
import { ref } from 'vue'
import { TQwitt } from 'src/types/QwittsType'
import { useUserStore } from 'src/stores/userStore'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const userStore = useUserStore()
const text = ref<string>('')
const { supabase } = useSupabase()
const qwitts: TQwitt[] | undefined = []


const handleQwitt = async ()=> {
  try{
    const { data, error} = await supabase.from('qwitt')
      .select('id, content, created_at, profiles(*)')
      .order('created_at',{ascending: false})
    if(error) throw error
    qwitts.push(...data as TQwitt[])
  }
  catch (error){
    if (error instanceof Error){
      console.log(error)
      $q.notify({
        type: 'negative',
        message: ' oops an error occurred ',
        caption: error.message,
        timeout: 2500
      })
    }
    else{
      console.log('Unexpected error', error);
      $q.notify({
        type: 'negative',
        message: ' oops an error occurred ',
        timeout: 2500
      })
    }
  }
}
const insertToQwitts = async ()=> {
  const message = text.value
  text.value = ''
  const notify = $q.notify({
    group: false,
    message: ' please wait...',
    spinner:true,
    timeout:0
  })
  notify
  try{
    const { error } = await supabase
      .from('qwitt')
      .insert({ content: message, profile_id: userStore.authUser?.id })
    if(error) throw error
    text.value = ''
    qwitts.splice(0)
    handleQwitt()
    notify({
      icon: 'done',
      spinner: false,
      type: 'positive',
      message: ' it,s done',
      timeout: 2500
    })
  }
  catch(error) {
    if(error  instanceof Error){
      console.log(error)
      notify({
        type: 'negative',
        spinner: false,
        message: ' oops an error occurred',
        caption: error.message,
        timeout: 2500
      })
    }
    else{
      console.log('Unexpected error', error);
      $q.notify({
        type: 'negative',
        message: ' oops an error occurred ',
        spinner: false,
        timeout: 2500
      })
    }

  }
}

handleQwitt()
</script>



<template>
  <q-page class="column">
    <q-input bottom-slots
      v-model="text"
      label="Label"
      class="q-pa-md"
      counter maxlength="255"
      autogrow>
        <template v-slot:before>
          <q-avatar>
            <img :src="userStore.userProfile?.avatar_url">
          </q-avatar>
        </template>

        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="schedule" />
        </template>

        <template v-slot:hint>
          Field hint
        </template>

        <template v-slot:after>
          <q-btn color="primary" label="Qwitter" :disable="text.length > 6 ? false: true" no-caps unelevated rounded @click="insertToQwitts()"/>
        </template>
      </q-input>

      <q-separator class="q-mt-md divider" size="10px"/>

      <div class="relative-position" style="flex-grow: 1;">
        <q-scroll-area class="absolute fullscreen">
          <q-list>
            <q-item v-for="qwitt in qwitts" :key="qwitt.id" class="q-py-md">
              <q-item-section top avatar>
                <q-avatar>
                  <img :src="qwitt.profiles?.avatar_url">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1">
                  <strong >{{ qwitt.profiles.name   }}</strong>
                  <span class="text-grey-5 q-px-sm text-caption">
                    {{ qwitt.profiles.username }}
                  </span>
                </q-item-label>
                <q-item-label class=" text-body1 text-grey-8" lines="6">
                  {{ qwitt.content }}
                </q-item-label>
                <div class="row justify-between q-mt-sm qwitt-icons">
                  <q-btn flat round color="grey" size="sm" icon="chat_bubble" />
                  <q-btn flat round color="grey" size="sm" icon="favorite" />
                  <q-btn flat round color="grey" size="sm" icon="delete" />
                </div>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{ useTimeAgo(qwitt.created_at) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />
          </q-list>
        </q-scroll-area>
      </div>
  </q-page>
</template>



<style lang="scss">
.qwitt-icons {
  margin-left: -5px;
}
</style>
