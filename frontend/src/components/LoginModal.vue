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
          <h5 class="modal-title" id="loginModalLabel">Log In</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="emailInput">Email address</label>
              <input type="email" class="form-control" id="emailInput" v-model="email" />
            </div>
            <div class="form-group">
              <label for="passwordInput">Password</label>
              <input type="password" class="form-control" id="passwordInput" v-model="password" />
            </div>
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your data with anyone else.</small>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" @click="register">Register</button>
          <button type="button" class="btn btn-primary" @click="login">Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$("#loginModal").modal("hide");
    },
    register() {

      this.$("#loginModal").modal("hide");
    }
  },
  mounted() {
    this.$EventBus.$on("open-login-modal", () => {
      // eslint-disable-next-line
      console.log(navigator.userAgent);
      this.$("#loginModal").modal("show");
    });
  }
};
</script>

<style>
</style>