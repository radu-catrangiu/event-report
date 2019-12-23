<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="imageModal"
    data-backdrop="static"
    tabindex="-1"
    role="dialog"
    aria-labelledby="imageModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="imageModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">{{event}}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageModal",
  data() {
    return {
      event: {}
    }
  },
  mounted() {
    this.$EventBus.$on("open-image-modal", (event) => {
      // eslint-disable-next-line
      console.log(navigator.userAgent)
      this.event = event;
      this.$("#imageModal").modal("show");
    });
  }
};
</script>

<style>
</style>