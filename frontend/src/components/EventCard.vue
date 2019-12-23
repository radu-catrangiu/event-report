<template>
  <div class="event-card my-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{event.title}}</h5>
        <h6
          class="card-subtitle mb-2"
          :class="{ 
                'text-success': event.resolved,
                'text-danger': !event.resolved,
            }"
        >{{event.resolved ? 'Resolved' : 'Unresolved'}}</h6>
        <p class="card-text">{{event.description}}</p>
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
    event: Object
  }
};
</script>

<style>
</style>