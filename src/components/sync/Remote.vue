<template>
  <div class="card">
    <div
      class="card-header"
      id="remoteHeading">
      <h5 class="mb-0">
        <button
          class="btn btn-link"
          data-toggle="collapse"
          data-target="#remote-content"
          aria-expanded="true"
          aria-controls="remote-content"
        >
          Remote Data
        </button>
      </h5>
    </div>

    <div
      id="remote-content"
      class="collapse show"
      aria-labelledby="remoteHeading"
      data-parent="#accordion">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col"><strong>Remote newer</strong></div>
          <div class="col text-center"><strong>Up-to-date</strong></div>
          <div class="col text-right"><strong>Local newer</strong></div>
        </div>
        <div
          class="item-wrapper mb-3 border p-2"
          v-for="(item, key) in remote"
          :key="key"
        >
          <h6 class="text-center">{{ item }}</h6>
          <b-progress
            :max="2"
            class="mb-3">
            <b-progress-bar
              variant="primary"
              :value="1"
            />
            <b-progress-bar
              variant="secondary"
              :value="1"
              class="transparent"/>
          </b-progress>
          <b-btn
            variant="primary"
            :id="'remotePullButton' + key"
          >Pull
          </b-btn>
          <b-popover
            :target="'remotePullButton' + key"
            title="Confirm Pull"
            triggers="focus blur">
            <p>Are you sure you want to overwrite the local folder?</p>
            <button
              class="btn btn-xs btn-primary"
              @click.prevent.stop="pullData(item, key)">Yes
            </button>
            <button
              class="btn btn-xs btn-danger"
              @click.prevent.stop="closePopover(key)">No
            </button>
          </b-popover>
          <b-btn
            variant="success"
            class="float-right"
            disabled
          >Push
          </b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pullFile from './functions/pullData'

  export default {
    name: 'RemoteSync',
    mixins: [pullFile],
    props: {
      'remote': {
        type: Array,
        default: []
      }
    },
    methods: {
      closePopover (key) {
        this.$root.$emit('bv::hide::popover', 'remotePullButton' + key)
      },
      pullData (item, key) {
        this.closePopover(key)
        VueEventListener.fire('toggleLoading')
        this.pullFile(item)
        this.remote.splice(key, 1)
      }
    }
  }
</script>
