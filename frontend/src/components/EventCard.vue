<template>
  <div class="event-card my-2">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-9 text-left">
            <span
              v-if="adminUser"
              class="text-muted text-uppercase text-monospace"
              style="font-size: 9px;"
            >{{event.id}}</span>
          </div>
          <div class="col-3 text-right">
            <span class="badge badge-pill badge-warning">Event Tag</span>
          </div>
        </div>
        <h5 class="card-title">{{event.title}}</h5>
        <h6
          class="card-subtitle mb-2"
          :class="{ 
                'text-success': event.resolved,
                'text-danger': !event.resolved,
            }"
        >{{event.resolved ? 'Resolved' : 'Unresolved'}}</h6>
        <p class="card-text">{{event.description}}</p>
        <div class="btn-group mb-4">
          <button class="btn btn-warning" @click="showEventImage">Show image</button>
          <button
            v-if="adminUser && !event.resolved"
            class="btn btn-success"
            @click="resolveEvent"
          >Resolve</button>
          <button
            v-if="adminUser && event.resolved"
            class="btn btn-secondary"
            @click="unresolveEvent"
          >Unresolve</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$EventBus.$emit("add-point-on-map", this.event);
  },
  props: {
    adminUser: Boolean,
    event: Object
  },
  methods: {
    showEventImage() {
      this.$EventBus.$emit("open-image-modal", this.event);
    },
    resolveEvent() {
      this.event.resolved = true;
    },
    unresolveEvent() {
      this.event.resolved = false;
    }
  }
};
</script>

<style>
.highlighted {
  background-color: #fed766;
}
</style>