<template>
  <div class="events-list">
    <div>
      <button 
        class="btn btn-lg btn-block"
        :class="{
          'btn-danger': showList,
          'btn-warning': !showList
        }"
        @click="showList = !showList"
      >
        {{ showList ? "REPORT AN EVENT" : "BACK TO LIST"}}
      </button>
    </div>
    <div v-bind:hidden="showList">
      <new-event-card />
    </div>
    <div v-bind:hidden="!showList" class="overflow-auto" style="max-height: 88vh;">
      <div v-if="eventsList.length > 0">
        <div v-for="event in eventsList" :key="event.id">
          <event-card :event="event"></event-card>
        </div>
      </div>
      <div v-else class="my-5">No events reported</div>
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard";
import NewEventCard from "./NewEventCard";
export default {
  name: "EventsList",
  components: {
    NewEventCard,
    EventCard
  },
  data() {
    return {
      showList: true,
      eventsList: []
    };
  },
  async mounted() {
    const result = await this.$api.get('/events');
    this.eventsList.push(...result.data);
  },
  methods: {}
};
</script>

<style>
.events-list {
  max-height: 90vh;
  -ms-overflow-style: none;
}
.events-list:-webkit-scrollbar {
  display: none;
}
</style>