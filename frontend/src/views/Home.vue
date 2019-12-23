<template>
  <div class="container-fluid">
    <Modal></Modal>
    <div class="row align-items-center">
      <div class="col text-left">
        <!-- TODO: Logo here -->
        <h2 class="ml-5 font-weight-bold">EventReport</h2>
      </div>
      <div class="col text-right">
        <!-- TODO: Show current user or login btn -->
        User
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <events-list/>
      </div>
      <div class="col-9">
        <google-map/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import GoogleMap from "../components/GoogleMap/GoogleMap";
import EventsList from "../components/EventsList";
import Modal from "../components/Modal";
export default {
  name: "Home",
  components: {
    GoogleMap,
    EventsList,
    Modal
  }
};
</script>

<style>
.no-gutters {
  margin-right: 0;
  margin-left: 0;
  min-height: 100vh;
}
</style>