<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Vue Chat
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.name }} | </b-nav-text>
      <b-nav-item href="#" @click="onLogout" active>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Getter, Action, Mutation } from 'vuex-class';
  import { IChatTypes } from '@/types/chat.types';

  @Component({
    name: 'chat-nav-bar',
  })
  export default class ChatNavBar extends Vue {
    @Getter('user')
    protected user: IChatTypes['user'];
    @Getter('reconnect')
    protected reconnect: IChatTypes['reconnect'];

    @Action('login')
    protected login: any;
    @Action('logout')
    protected logout: any;

    @Mutation('setReconnect')
    protected setReconnect: any;

    protected onLogout() {
      this.$router.push({ path: '/' });
      this.logout();
    }
    protected unload() {
      if (this.user.username) {
        this.setReconnect(true);
      }
    }

    private mounted() {
      window.addEventListener('beforeunload', this.unload);
      if (this.reconnect) {
        this.login(this.user.username);
      }
    }
  }
</script>

<style>
  #chat-navbar {
    margin-bottom: 15px;
  }
</style>
