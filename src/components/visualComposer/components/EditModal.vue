<template>
  <b-modal
    v-model="selectedBool"
    title="Edit item">
    <div
      v-for="(selectedValue, selectedKey) in value"
      :key="selectedKey"
      class="mb-3">
      <label :for="'modal-' + selectedKey"><strong>{{ selectedKey | capitalize }}</strong></label>
      <div
        v-if="Array.isArray(selectedValue)"
        :id="'modal-' + selectedKey">
        <draggable
          v-model="value[selectedKey]"
          :options="{group: 'textItems'}"
          class="mb-2">
          <div
            v-for="(item, key) in selectedValue"
            :key="key">
            <b-input-group>
              <b-form-textarea
                v-model="value[selectedKey][key]"
                :rows="getRows(item.length)"/>
              <b-input-group-text
                slot="append"
                class="cursor-pointer"
                @click="selectedValue.splice(key, 1)">
                <font-awesome-icon
                  icon="trash-alt"/>
              </b-input-group-text>
            </b-input-group>
          </div>
        </draggable>
        <b-btn
          variant="success"
          @click="selectedValue.push('')">Add
        </b-btn>
      </div>
      <b-form-input
        v-else-if="selectedKey === 'cols'"
        v-model.number="value[selectedKey]"
        :id="'modal-' + selectedKey"
        type="number"
        min="0"
        max="12"/>
      <b-form-input
        v-else-if="selectedValue.length <= 75"
        v-model="value[selectedKey]"
        :id="'modal-' + selectedKey"/>
      <b-form-textarea
        v-model="value[selectedKey]"
        :id="'modal-' + selectedKey"
        :rows="getRows(selectedValue.length)"
        v-else/>
    </div>
  </b-modal>
</template>

<script>
  import draggable from 'vuedraggable'
  import textFilters from '../../filters/textFilters'

  export default {
    name: 'EditModal',
    components: {draggable},
    mixins: [textFilters],
    props: {
      value: {
        type: [Array, Object],
        required: false,
        default () {
          return undefined
        }
      }
    },
    methods: {
      getRows (length) {
        return Math.ceil(length / 65)
      }
    },
    computed: {
      selectedBool: {
        get () {
          return !!this.value
        },
        set () {
        }
      }
    }
  }
</script>

<style scoped>

</style>
