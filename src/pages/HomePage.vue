<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import useSupabase from 'src/boot/supabase'
import { ref, reactive, watch } from 'vue'
import { TQwitt, TProfile, Like } from 'src/types/QwittsType'
import { useUserStore } from 'src/stores/userStore'
import { useQuasar } from 'quasar'


const $q = useQuasar()
const userStore = useUserStore()
const qwittText = ref<string>('')
const { supabase } = useSupabase()
const qwitts = reactive<TQwitt[]>([])
const reQwittPropt = ref<boolean>(false)
let re_qwitt_id: number | null = null

const handleQwitt = async () => {
  try {
    const { data, error } = await supabase
      .from('qwitts')
      .select(
        'id, qwitt, created_at, qwitt_id, profiles!profile_id(*),likes(*), count:likes(count)'
      )
      .eq('likes.profile_id', userStore.authUser?.id.toString())
      .order('created_at', { ascending: false });
    if (error) throw error;
    qwitts.push(...(data as TQwitt[]));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      $q.notify({
        type: 'negative',
        message: ' oops an error occurred ',
        caption: error.message,
        timeout: 2500,
      });
    } else {
      console.log('Unexpected error', error)
      $q.notify({
        type: 'negative',
        message: ' oops an error occurred ',
        timeout: 2500,
      });
    }
  }
};

const insertToQwitts = async () => {
  const newQwitt: TQwitt = {
    qwitt: qwittText.value,
    profile_id: userStore.userProfile?.id,
    profiles: userStore.userProfile as TProfile,
    qwitt_id: re_qwitt_id,
    likes: [],
  };
  qwittText.value = '';
  const notify = $q.notify({
    group: false,
    message: ' please wait...',
    spinner: true,
    timeout: 0,
  })
  notify;
  try {
    const { data, error } = await supabase
      .from('qwitts')
      .insert({ qwitt: newQwitt.qwitt, profile_id: newQwitt.profile_id, qwitt_id: newQwitt.qwitt_id })
      .select()
    if (error) throw error;
    newQwitt.id = data[0].id;
    newQwitt.created_at = data[0].created_at;

    qwitts.unshift(newQwitt);
    notify({
      icon: 'done',
      spinner: false,
      type: 'positive',
      message: ' it,s done',
      timeout: 2500,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      notify({
        type: 'negative',
        spinner: false,
        message: ' oops an error occurred',
        caption: error.message,
        timeout: 2500,
      });
    } else {
      console.log('Unexpected error', error);
      $q.notify({
        type: 'negative',
        message: ' oops an error occurred ',
        spinner: false,
        timeout: 2500,
      });
    }
  }
};

const likeButton = async (qwitt: TQwitt) => {
  const likedQwitt: Like = {
    profile_id: userStore.authUser?.id as string,
    qwitt_id: qwitt.id as number,
  };
  if (qwitt.likes?.length) {
    try {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('profile_id', likedQwitt.profile_id)
        .eq('qwitt_id', likedQwitt.qwitt_id);
      if (error) throw error;
      qwitt.likes?.splice(0);
      if (qwitt.count?.length && qwitt.count[0].count) {
        qwitt.count[0].count--;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { error } = await supabase.from('likes').insert([likedQwitt]);
      if (error) throw error;
      qwitt.likes?.push(likedQwitt);
      if (qwitt.count?.length) {
        if (qwitt.count[0].count) qwitt.count[0].count++;
        else qwitt.count[0].count = 1;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const showReQwittDialog = (qwitt_id: number | null) => {
  reQwittPropt.value = true
  re_qwitt_id = qwitt_id
}
watch(reQwittPropt, (newVal) => {
  if (!newVal){
    re_qwitt_id = null
  }
})

handleQwitt();
</script>

<template>
  <q-page class="column">
    <q-input v-if="!reQwittPropt"
      bottom-slots
      v-model="qwittText"
      label="Label"
      class="q-pa-md"
      counter
      maxlength="255"
      autogrow
    >
      <template v-slot:before>
        <q-avatar>
          <img :src="userStore.userProfile?.avatar_url" />
        </q-avatar>
      </template>

      <template v-slot:append>
        <q-icon
          v-if="qwittText !== ''"
          name="close"
          @click="qwittText = ''"
          class="cursor-pointer"
        />
        <q-icon name="schedule" />
      </template>

      <template v-slot:hint> Field hint </template>

      <template v-slot:after>
        <q-btn
          color="primary"
          label="Qwitter"
          :disable="qwittText.length > 6 ? false : true"
          no-caps
          unelevated
          rounded
          @click="insertToQwitts()"
        />
      </template>
    </q-input>

    <q-separator class="q-mt-md divider" size="10px" />

    <div class="relative-position" style="flex-grow: 1">
      <q-scroll-area class="absolute fullscreen">
        <q-list>
          <q-item v-for="(qwitt, index) in qwitts" :key="index" class="q-py-md">
            <q-item-section top avatar>
              <q-avatar>
                <img :src="qwitt.profiles?.avatar_url" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>{{ qwitt.profiles?.name }}</strong>
                <span class="text-grey-5 q-px-sm text-caption">
                  {{ qwitt.profiles?.username }}
                </span>
              </q-item-label>
              <q-item-label class="text-body1 text-grey-8" lines="6">
                {{ qwitt.qwitt }}
              </q-item-label>

              <div v-if="qwitt.qwitt_id" class="q-ml-sm q-mt-sm q-pa-sm text-weight-regular text-grey-7 re-qwitt">
              {{ qwitts.find(e => e.id === qwitt.qwitt_id)?.qwitt }}
              </div>

              <div class="row justify-between q-mt-sm qwitt-icons">

                <q-btn flat round color="grey" size="sm" icon="chat_bubble" 
                @click="showReQwittDialog( qwitt.id ? qwitt.id : null )" />

                <q-btn
                  flat
                  round
                  :color="!!qwitt.likes?.length ? 'red' : 'grey'"
                  size="sm"
                  icon="favorite"
                  @click="likeButton(qwitt)"
                />

                <div class="row flex-center">
                  <span class="text-overline text-weight-light">{{
                    qwitt.count?.length ? qwitt.count[0].count : ''
                  }}</span>
                  <q-icon
                    color="grey"
                    size="sm"
                    name="signal_cellular_alt"
                  />
                </div>
              </div>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{
                qwitt.created_at ? useTimeAgo(qwitt.created_at) : ''
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </q-list>
      </q-scroll-area>


      <q-dialog v-model="reQwittPropt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Your Qwitt</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="qwittText" autofocus @keyup.enter="reQwittPropt = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Reply Qwitt" v-close-popup @click="insertToQwitts()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>


    </div>
  </q-page>
</template>

<style lang="scss">
.qwitt-icons {
  margin-left: -5px;
}

.re-qwitt{
  border: 1px solid #e0e0e0;
}
</style>
