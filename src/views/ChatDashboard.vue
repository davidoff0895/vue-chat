<template>
  <div class="chat-dashboard">
    <ChatNavBar />
    <b-container fluid class="ld-over" v-bind:class="{ running: loading }">
      <div class="ld ld-ring ld-spin"></div>
      <b-row>
        <b-col cols="2">
          <RoomList />
        </b-col>

        <b-col cols="8">
          <b-row>
            <b-col id="chat-content">
              <MessageList />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <MessageForm />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="2">
          <UserList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Getter } from 'vuex-class';

  import ChatNavBar from '@/components/ChatNavBar.vue';
  import RoomList from '@/components/RoomList.vue';
  import MessageList from '@/components/MessageList.vue';
  import MessageForm from '@/components/MessageForm.vue';
  import UserList from '@/components/UserList.vue';

  import { IChatTypes } from '@/types/chat.types';

  @Component({
    name: 'chat-dashboard',
    components: {
      ChatNavBar,
      RoomList,
      UserList,
      MessageList,
      MessageForm,
    },
  })
  export default class ChatDashboard extends Vue {
    @Getter('loading')
    private loading: IChatTypes['loading'];
  }
</script>
