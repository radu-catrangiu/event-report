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
    async mounted() {
        this.loginToken = this.$cookies.get('login_token');
        if(this.loginToken) {
            const result = await this.$authApi.get('/auth/token');
            if (result.status === 200, result.data) {
                this.$store.commit('user', result.data);
            }
        }
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