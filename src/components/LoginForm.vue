<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr>
    <b-form @submit.prevent="onSubmit">
      <b-alert variant="danger" :show="!!error">{{ error }} </b-alert>

      <b-form-group id="userInputGroup"
                    label="User Name"
                    label-for="userInput">
        <b-form-input id="userInput"
                      type="text"
                      placeholder="Enter user name"
                      v-model="userId"
                      autocomplete="off"
                      :disabled="loading"
                      required>
        </b-form-input>
      </b-form-group>

      <b-button type="submit"
                variant="primary"
                class="ld-ext-right"
                v-bind:class="{ running: loading }"
                :disabled="isValid">
        Login <div class="ld ld-ring ld-spin"></div>
      </b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Getter, Action } from 'vuex-class';
  import { IChatTypes } from '@/types/chat.types';

  @Component({
    name: 'login-form',
  })
  export default class LoginForm extends Vue {
    @Getter('loading')
    private loading: IChatTypes['loading'];
    @Getter('error')
    private error: IChatTypes['error'];

    @Action('login')
    private login: any;

    private userId: string = '';

    get isValid() {
      const result = this.userId.length < 3;
      return result ? result : this.loading;
    }

    private async onSubmit() {
      const result = await this.login(this.userId);
      if (result) {
        await this.$router.push('chat');
      }
    }
  }
</script>
