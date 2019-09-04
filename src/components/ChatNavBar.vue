<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Vue Chat
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.name }} | </b-nav-text>
      <b-nav-item href="#" active>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Getter } from 'vuex-class';
  import { IChatTypes } from '@/types/chat.types';

  @Component({
    name: 'chat-nav-bar',
  })
  export default class ChatNavBar extends Vue {
    @Getter('user')
    public user: IChatTypes['user'];
  }
</script>

<style>
  #chat-navbar {
    margin-bottom: 15px;
  }
</style>
