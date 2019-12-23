<template>
  <div class="GoogleMapContainer">
  </div>
</template>

<script>
import GoogleMapInit from "./gmaps";
import MapStyle from "./mapStyle";
import init from "./init.json";

let Google;

export default {
  name: "GoogleMap",
  data: function() {
    return {
      map: {},
      points: {},
      mapLoaded: false
    };
  },
  props: [],
  async mounted() {
    /* eslint-disable */
    // this.loadMap();
    this.$EventBus.$on("add-point-on-map", (event) => {
      console.log("Received `add-point-on-map`: ", event);
      this.points[event.id] = event;
    });
  },
  methods: {
    async loadMap() {
      try {
        Google = await GoogleMapInit();

        this.map = new Google.maps.Map(this.$el, {
          styles: MapStyle.blueGray,
          zoom: 12,
          streetViewControl: false,
          disableDefaultUI: true,
          gestureHandling: "cooperative"
        });
        let map = this.map;

        map.setCenter(init.geometry.location);
        map.fitBounds(init.geometry.viewport);

        this.mapLoaded = true;
        this.$parent.map_loaded = true;
      } catch (error) {
        // eslint-disable-next-line
        console.debug(error);
      }
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.GoogleMapContainer {
  width: 100%;
  height: 90vh;
  background: #efefef;
}

.GoogleMapContainer h1 {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>