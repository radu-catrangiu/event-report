<template>
  <div>
      <div v-if="user">
          <span class="mx-2">User Name</span>
          <button class="btn btn-secondary" @click="logOut">Log Out</button>
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
            user: null
        }
    },
    async mounted() {
        this.$store.subscribe(mutation => {
            /* eslint-disable */
            console.log(mutation);
            if (mutation.type !== "user") return;
            this.user = this.$store.getters.user;
    });
        const loginToken = this.$cookies.get('login_token');
        if(loginToken) {
            const result = await this.$authApi.get('/auth/token');
            if (result.status === 200, result.data) {
                this.$store.commit('user', result.data);
                this.user = result.data;
            }
        }
    },
    methods: {
        logOut() {
            this.$store.commit("user", null);
            this.$cookies.remove("login_token");
        },
        openLoginModal() {
            this.$EventBus.$emit('open-login-modal');
        }
    }
}
</script>

<style>

</style>