<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <b-card
          v-for="(value, key) in why"
          :key="key"
          :header="$options.filters.capitalize(key)"
        >
          <draggable
            v-model="why[key]"
            :options="{group: 'textItems'}"
            class="row"
            v-if="isArray(value)"
          >
            <div
              class="col-md-6 item-wrapper"
              v-for="(itemValue, itemKey) in value"
              :key="itemKey">
              <div
                class="text-wrapper"
                v-for="(objectValue, objectKey) in itemValue"
                :key="objectKey"
              >
                <h1>{{ objectKey | capitalize }}</h1>
                <div v-if="isArray(objectValue)">
                  <p
                    v-for="(arrayValue, arrayKey) in objectValue"
                    :key="arrayKey">{{ arrayValue | truncate(50) }}</p>
                </div>
                <p v-else>{{ objectValue | truncate(50) }}</p>
              </div>
            </div>
          </draggable>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import textFilters from '../filters/textFilters'

  export default {
    name: 'VisualComposer',
    mixins: [textFilters],
    components: {draggable},
    data () {
      return {
        why: {
          items: [
            {
              title: 'What do successful operating systems have in common?',
              descriptions: [
                'Consider the earliest example of a “killer app”: the VisiCalc spreadsheet software catapulted Apple II personal computers to unprecedented levels of adoption in the early 80s, simply because for ten months, the best spreadsheet software on the market was only available for the Apple II.',
                'Likewise, Microsoft invested heavily in promoting Internet Explorer as a user-friendly application with mass appeal because they understood that even without making IE the best browser on the market, including it as a built-in perk with Windows would facilitate adoption of both their application and their OS, driving software developers to follow suit in a snowballing effect which helped to make market dominance all but inevitable.'
              ]
            },
            {
              title: 'Shift is the first next-gen blockchain with a built-in “killer dApp.”',
              descriptions: [
                'While other companies are busy writing whitepapers and raising hundreds of millions of dollars, Shift has been busy working: we have created the backbone of a robust dApp ecosystem, with a strong and democratic dPOS platform of decentralization that can be used by anyone who knows JavaScript. The Phantom dApp with Shift will create a new decentralized web, empowering everyday users and keeping their content safe.',
                'We are confident that providing the first low cost, easy-to-use decentralized hosting infrastructure, which saves users money over traditional file storage methods and protects their content from external censorship, will act as a massive stimulus for the mainstream adoption of Shift.'
              ]
            }
          ],
          listItems: [
            {
              title: 'What do successful operating systems have in common?',
              descriptions: [
                'Consider the earliest example of a “killer app”: the VisiCalc spreadsheet software catapulted Apple II personal computers to unprecedented levels of adoption in the early 80s, simply because for ten months, the best spreadsheet software on the market was only available for the Apple II.',
                'Likewise, Microsoft invested heavily in promoting Internet Explorer as a user-friendly application with mass appeal because they understood that even without making IE the best browser on the market, including it as a built-in perk with Windows would facilitate adoption of both their application and their OS, driving software developers to follow suit in a snowballing effect which helped to make market dominance all but inevitable.'
              ]
            },
            {
              title: 'Shift is the first next-gen blockchain with a built-in “killer dApp.”',
              descriptions: [
                'While other companies are busy writing whitepapers and raising hundreds of millions of dollars, Shift has been busy working: we have created the backbone of a robust dApp ecosystem, with a strong and democratic dPOS platform of decentralization that can be used by anyone who knows JavaScript. The Phantom dApp with Shift will create a new decentralized web, empowering everyday users and keeping their content safe.',
                'We are confident that providing the first low cost, easy-to-use decentralized hosting infrastructure, which saves users money over traditional file storage methods and protects their content from external censorship, will act as a massive stimulus for the mainstream adoption of Shift.'
              ]
            }
          ]
        }
      }
    },
    methods: {
      getKeys (item) {
        return Object.keys(item)
      },
      isArray (item) {
        return Array.isArray(item)
      }
    }
  }
</script>

<style scoped>

</style>
