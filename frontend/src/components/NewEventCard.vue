<template>
  <div class="my-2">
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="eventTitleInput" class="col-form-label col-form-label-lg">Event Title</label>
          <input
            type="title"
            class="form-control form-control-lg"
            id="eventTitleInput"
            placeholder="Event Title"
            v-model="event.title"
          />
        </div>
        <div class="form-group">
          <div>
            <label for="bla">Pick Location of Event</label>
          </div>
          <div class="btn-group" id="bla" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="getBrowserLocation"
            >Get Browser Location</button>
            <button type="button" class="btn btn-secondary btn-sm">Pick Location on Map</button>
          </div>
          <input
            type="title"
            class="form-control form-control-sm mt-2 text-center"
            id="eventTitleInput"
            v-model="location"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="eventDescriptionTextarea">Event Description</label>
          <textarea
            class="form-control"
            id="eventDescriptionTextarea"
            rows="3"
            v-model="event.description"
          ></textarea>
        </div>

        <button type="button" class="btn btn-danger btn-lg" @click="reportEvent">REPORT EVENT</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "NewEventCard",
  computed: {
    location() {
      const { lat, lng } = this.event.location;
      if (!lat || !lng) {
        return "";
      }

      return `${lat} ${lng}`;
    }
  },
  data() {
    return {
      event: {
        title: "",
        description: "",
        location: {
          lat: null,
          lng: null
        }
      }
    };
  },
  methods: {
    getBrowserLocation() {
      if (!navigator.geolocation) {
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.event.location.lat = latitude;
          this.event.location.lng = longitude;
        },
        error => console.error(error)
      );
    },
    async reportEvent() {
      const { title, description, location } = this.event;
      const { lat, lng } = location;
      if (title.length < 3 || description.length < 10 || !lat || !lng) {
        return;
      }
      const result = await this.$api.post('/events', this.event);
      const storedEvent = result.data;
      this.$parent.eventsList.unshift(storedEvent)
    }
  }
};
</script>

<style>
</style>