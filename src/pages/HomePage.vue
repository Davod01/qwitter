<template>
  <q-page class="column">
    <q-input bottom-slots
      v-model="text"
      label="Label"
      class="q-pa-md"
      counter maxlength="255"
      autogrow
     :dense="dense">
        <template v-slot:before>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
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
          <q-btn color="primary" label="Qwitter" :disable="!text" no-caps unelevated rounded />
        </template>
      </q-input>

      <q-separator class="q-mt-md divider" size="10px" color="grey-2"/>

      <div class="relative-position" style="flex-grow: 1;">
        <q-scroll-area class="absolute fullscreen">
          <q-list>
            <q-item class="q-py-md">
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1">
                  <strong>Single line item</strong>
                  <span class="text-grey-5">
                    @Davod.nar
                  </span>
                </q-item-label>
                <q-item-label class="text-body1 text-grey-8" lines="6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.

                  Eos doloribus vitae odit ab dolor labore, inventore sint. Ut cum sint, modi incidunt cupiditate, commodi culpa voluptates nihil quibusdam excepturi dolores!
                  Alias deleniti ipsum a et reiciendis? Voluptatibus distinctio odio, alias beatae iure amet tempora sit, neque totam dolores ad ea quasi! Quam quasi repudiandae rerum! Necessitatibus reiciendis saepe quam dolorum.
                  Ipsum, vitae libero iste id, nihil esse dolorum, adipisci placeat totam tempora nam ad voluptate labore? Unde, quisquam eaque odio, corporis voluptate dicta quae rerum aperiam autem at nesciunt nobis.
                  Necessitatibus cupiditate ut facere at aliquid. Veniam est odit dolores tenetur nostrum vel nisi a consequuntur, deleniti eum ratione. Tenetur error neque perferendis aliquid, sunt impedit temporibus ad ipsam quas.
                  Illo nostrum exercitationem assumenda sunt sed ad porro reprehenderit ipsa commodi impedit repellendus autem id minima harum at, pariatur nulla soluta dolor debitis officiis culpa et! Amet iste ad optio.
                </q-item-label>
                <div class="row justify-between q-mt-sm qwitt-icons">
                  <q-btn flat round color="grey" size="sm" icon="chat_bubble" />
                  <q-btn flat round color="grey" size="sm" icon="favorite" />
                  <q-btn flat round color="grey" size="sm" icon="delete" />
                </div>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />


            <q-item class="q-py-md">
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1">
                  <strong>Single line item</strong>
                  <span class="text-grey-5">
                    @Davod.nar
                  </span>
                </q-item-label>
                <q-item-label class="text-body1 text-grey-8" lines="6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.

                  Eos doloribus vitae odit ab dolor labore, inventore sint. Ut cum sint, modi incidunt cupiditate, commodi culpa voluptates nihil quibusdam excepturi dolores!
                  Alias deleniti ipsum a et reiciendis? Voluptatibus distinctio odio, alias beatae iure amet tempora sit, neque totam dolores ad ea quasi! Quam quasi repudiandae rerum! Necessitatibus reiciendis saepe quam dolorum.
                  Ipsum, vitae libero iste id, nihil esse dolorum, adipisci placeat totam tempora nam ad voluptate labore? Unde, quisquam eaque odio, corporis voluptate dicta quae rerum aperiam autem at nesciunt nobis.
                  Necessitatibus cupiditate ut facere at aliquid. Veniam est odit dolores tenetur nostrum vel nisi a consequuntur, deleniti eum ratione. Tenetur error neque perferendis aliquid, sunt impedit temporibus ad ipsam quas.
                  Illo nostrum exercitationem assumenda sunt sed ad porro reprehenderit ipsa commodi impedit repellendus autem id minima harum at, pariatur nulla soluta dolor debitis officiis culpa et! Amet iste ad optio.
                </q-item-label>
                <div class="row justify-between q-mt-sm qwitt-icons">
                  <q-btn flat round color="grey" size="sm" icon="chat_bubble" />
                  <q-btn flat round color="grey" size="sm" icon="favorite" />
                  <q-btn flat round color="grey" size="sm" icon="delete" />
                </div>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />

            <q-item class="q-py-md">
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1">
                  <strong>Single line item</strong>
                  <span class="text-grey-5">
                    @Davod.nar
                  </span>
                </q-item-label>
                <q-item-label class="text-body1 text-grey-8" lines="6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.

                  Eos doloribus vitae odit ab dolor labore, inventore sint. Ut cum sint, modi incidunt cupiditate, commodi culpa voluptates nihil quibusdam excepturi dolores!
                  Alias deleniti ipsum a et reiciendis? Voluptatibus distinctio odio, alias beatae iure amet tempora sit, neque totam dolores ad ea quasi! Quam quasi repudiandae rerum! Necessitatibus reiciendis saepe quam dolorum.
                  Ipsum, vitae libero iste id, nihil esse dolorum, adipisci placeat totam tempora nam ad voluptate labore? Unde, quisquam eaque odio, corporis voluptate dicta quae rerum aperiam autem at nesciunt nobis.
                  Necessitatibus cupiditate ut facere at aliquid. Veniam est odit dolores tenetur nostrum vel nisi a consequuntur, deleniti eum ratione. Tenetur error neque perferendis aliquid, sunt impedit temporibus ad ipsam quas.
                  Illo nostrum exercitationem assumenda sunt sed ad porro reprehenderit ipsa commodi impedit repellendus autem id minima harum at, pariatur nulla soluta dolor debitis officiis culpa et! Amet iste ad optio.
                </q-item-label>
                <div class="row justify-between q-mt-sm qwitt-icons">
                  <q-btn flat round color="grey" size="sm" icon="chat_bubble" />
                  <q-btn flat round color="grey" size="sm" icon="favorite" />
                  <q-btn flat round color="grey" size="sm" icon="delete" />
                </div>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />

            <q-item class="q-py-md">
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-subtitle1">
                  <strong>Single line item</strong>
                  <span class="text-grey-5">
                    @Davod.nar
                  </span>
                </q-item-label>
                <q-item-label class="text-body1 text-grey-8" lines="6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.

                  Eos doloribus vitae odit ab dolor labore, inventore sint. Ut cum sint, modi incidunt cupiditate, commodi culpa voluptates nihil quibusdam excepturi dolores!
                  Alias deleniti ipsum a et reiciendis? Voluptatibus distinctio odio, alias beatae iure amet tempora sit, neque totam dolores ad ea quasi! Quam quasi repudiandae rerum! Necessitatibus reiciendis saepe quam dolorum.
                  Ipsum, vitae libero iste id, nihil esse dolorum, adipisci placeat totam tempora nam ad voluptate labore? Unde, quisquam eaque odio, corporis voluptate dicta quae rerum aperiam autem at nesciunt nobis.
                  Necessitatibus cupiditate ut facere at aliquid. Veniam est odit dolores tenetur nostrum vel nisi a consequuntur, deleniti eum ratione. Tenetur error neque perferendis aliquid, sunt impedit temporibus ad ipsam quas.
                  Illo nostrum exercitationem assumenda sunt sed ad porro reprehenderit ipsa commodi impedit repellendus autem id minima harum at, pariatur nulla soluta dolor debitis officiis culpa et! Amet iste ad optio.
                </q-item-label>
                <div class="row justify-between q-mt-sm qwitt-icons">
                  <q-btn flat round color="grey" size="sm" icon="chat_bubble" />
                  <q-btn flat round color="grey" size="sm" icon="favorite" />
                  <q-btn flat round color="grey" size="sm" icon="delete" />
                </div>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />


          </q-list>
        </q-scroll-area>
      </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref<string>('')
const dense = ref<boolean>(false)
</script>

<style lang="scss">
.qwitt-icons {
  margin-left: -5px;
}
</style>
