<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="loginModal"
    data-backdrop="static"
    tabindex="-1"
    role="dialog"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">...</div>
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
  name: "LoginModal",
  mounted() {
    this.$EventBus.$on("open-login-modal", () => {
      // eslint-disable-next-line
      console.log(navigator.userAgent)
      this.$("#loginModal").modal("show");
    });
  }
};
</script>

<style>
</style>