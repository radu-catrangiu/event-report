<template>
  <div>
      <div v-if="loginToken">
          User Name
      </div>
      <div v-else>
          <button class="btn btn-secondary" @click="openLoginModal">Log In</button>
      </div>
  </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginToken: undefined,
            user: {
                name
            }
        }
    },
    mounted() {
        this.loginToken = this.$cookies.get('login_token');
        // if(this.loginToken) {

        // }
    },
    methods: {
        openLoginModal() {
            this.$EventBus.$emit('open-login-modal');
        }
    }
}
</script>

<style>

</style>