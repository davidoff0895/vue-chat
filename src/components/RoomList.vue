<template>
  <div class="room-list">
    <h4>Channels</h4>
    <hr>
    <b-list-group v-if="activeRoom">
      <b-list-group-item v-for="room in rooms"
                         :key="room.name"
                         :active="activeRoom.id === room.id"
                         href="#"
                         @click="onChange(room)">
        # {{ room.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Getter, Action } from 'vuex-class';
  import {IChatTypes, IRoom} from '@/types/chat.types';

  @Component({
    name: 'room-list',
  })
  export default class RoomList extends Vue {
    @Getter('rooms')
    private rooms: IChatTypes['rooms'];
    @Getter('activeRoom')
    private activeRoom: IChatTypes['activeRoom'];

    @Action('changeRoom')
    private changeRoom: any;

    private onChange(room: IRoom) {
      this.changeRoom(room.id);
    }
  }
</script>
