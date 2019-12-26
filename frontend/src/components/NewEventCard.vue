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
        <div class="form-group mb-3">
          <div>
            <label>Event Type</label>
          </div>
          <select class="custom-select" v-model="event.tag">
            <option selected value>Choose...</option>
            <option
              v-for="eventType in eventTypes"
              :key="eventType"
              :value="eventType"
            >{{eventType | capitalize}}</option>
          </select>
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

        <div class="form-group mb-3">
          <div>
            <label>Event Picture</label>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="photoInput" @change="onFileChange" />
            <label class="custom-file-label" for="photoInput">{{filename || "Choose file"}}</label>
          </div>
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
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              @click="pickLocationOnMap"
            >Pick Location on Map</button>
          </div>
          <input
            type="title"
            class="form-control form-control-sm mt-2 text-center"
            id="eventTitleInput"
            v-model="location"
            disabled
          />
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
        tag: "",
        location: {
          lat: null,
          lng: null
        },
        image_id: ""
      },
      filename: undefined,
      eventTypes: ["bla", "one", "two"]
    };
  },
  filters: {
    capitalize(str) {
      let x = str;

      return x.charAt(0).toUpperCase() + x.substring(1);
    }
  },
  mounted() {
    this.$EventBus.$on("pick-location-on-map-result", result => {
      this.event.location = result.lat_lng;
    });
  },
  methods: {
    async onFileChange(e) {
      var file = event.target.files[0];
      if (!file) return;

      this.filename = file.name;
      const form = new FormData();
      form.append("image", file, file.name);

      const response = await this.$imgServiceApi({
        method: "POST",
        url: "/image/upload",
        data: form,
        headers: {
          "content-type": `multipart/form-data; boundary=${form._boundary}`
        }
      });

      if (response && response.data) {
        this.event.image_id = response.data.image_id;
      }
    },
    getBrowserLocation() {
      if (!navigator.geolocation) {
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.event.location.lat = latitude;
          this.event.location.lng = longitude;
          this.$EventBus.$emit("point-browser-location", this.event.location);
        },
        error => console.error(error)
      );
    },
    pickLocationOnMap() {
      this.$EventBus.$emit("pick-location-on-map");
    },
    async reportEvent() {
      const { title, description, location, tag, image_id } = this.event;
      const { lat, lng } = location;
      if (
        title.length < 3 ||
        description.length < 10 ||
        !lat ||
        !lng ||
        tag.length === 0 ||
        !image_id
      ) {
        return;
      }
      const result = await this.$api.post("/events", this.event);
      const storedEvent = result.data;
      this.$parent.eventsList.unshift(storedEvent);
      console.log(storedEvent);
      this.$EventBus.$emit("hide-point-marker");
    }
  }
};
</script>

<style>
</style>