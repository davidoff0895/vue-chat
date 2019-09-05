<template>
  <div class="user-list">
    <h4>Members</h4>
    <hr>
    <b-list-group>
      <b-list-group-item v-for="user in users" :key="user.username">
        {{ user.name }}
        <b-badge v-if="user.presence"
                 :variant="statusColor(user.presence)"
                 pill>
          {{ user.presence }}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Getter } from 'vuex-class';
  import { IChatTypes } from '@/types/chat.types';

  @Component({
    name: 'user-list',
  })
  export default class UserList extends Vue {
    @Getter('loading')
    private loading: IChatTypes['loading'];
    @Getter('users')
    private users: IChatTypes['users'];

    private statusColor(status: string) {
      return status === 'online' ? 'success' : 'warning';
    }
  }
</script>
