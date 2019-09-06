<template>
  <div class="message-form ld-over">
    <small class="text-muted">@{{ user.username }}</small>
    <b-form @submit.prevent="onSubmit" class="ld-over" v-bind:class="{ running: sending }">
      <div class="ld ld-ring ld-spin"></div>
      <b-alert variant="danger" :show="!!error">{{ error }} </b-alert>
      <b-form-group>
        <b-form-input id="message-input"
                      type="text"
                      v-model="message"
                      placeholder="Enter Message"
                      autocomplete="off"
                      required
                      @input="isTyping">
        </b-form-input>
      </b-form-group>
      <div class="clearfix">
        <b-button type="submit" variant="primary" class="float-right">
          Send
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Getter, Action } from 'vuex-class';
  import { isTyping } from '@/api/chatkit';

  import { IChatTypes } from '@/types/chat.types';

  @Component({
    name: 'message-form',
  })
  export default class MessageForm extends Vue {
    @Getter('user')
    private user: IChatTypes['user'];
    @Getter('sending')
    private sending: IChatTypes['sending'];
    @Getter('error')
    private error: IChatTypes['error'];
    @Getter('activeRoom')
    private activeRoom: IChatTypes['activeRoom'];

    @Action('sendMessage')
    private sendMessage: any;

    private message: string = null;

    private async onSubmit() {
      const result = await this.sendMessage(this.message);
      if (result) {
        this.message = '';
      }
    }
    private async isTyping() {
      await isTyping(this.activeRoom.id);
    }
  }
</script>
