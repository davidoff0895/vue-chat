import Vue from 'vue';
import Vuex, { ActionTree } from 'vuex';
import VuexPersistence from 'vuex-persist';

import { IChatTypes, IRoom } from '@/types/chat.types';
// @ts-ignore
import chatkit from '@/api/chatkit';
import moment from 'moment';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence<IChatTypes>({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: null,
    user: null,
    reconnect: false,
    activeRoom: null,
    rooms: [],
    users: [],
    messages: [],
    userTyping: null,
  },
  getters: {
    loading: (state: IChatTypes) => state.loading,
    sending: (state: IChatTypes) => state.sending,
    error: (state: IChatTypes) => state.error,
    user: (state: IChatTypes) => state.user,
    reconnect: (state: IChatTypes) => state.reconnect,
    activeRoom: (state: IChatTypes) => state.activeRoom,
    rooms: (state: IChatTypes) => state.rooms,
    users: (state: IChatTypes) => state.users,
    messages: (state: IChatTypes) => state.messages,
    userTyping: (state: IChatTypes) => state.userTyping,
  },
  actions: {
    async login({ commit, state }, userId) {
      try {
        commit('loginInitial');

        const currentUser = await chatkit.connectUser(userId);
        commit('setUser', {
          username: currentUser.id,
          name: currentUser.name,
        });

        commit('setReconnect', false);

        const rooms = currentUser.rooms.map((room: IRoom) => ({
          id: room.id,
          name: room.name,
        }));
        commit('setRooms', rooms);

        const activeRoom = state.activeRoom || rooms[0];
        commit('setActiveRoom', {
          id: activeRoom.id,
          name: activeRoom.name,
        });
        await chatkit.subscribeToRoom(activeRoom.id);

        return true;
      } catch (error) {
        const message = error.message || error.info.error_description;
        commit('setError', message);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  mutations: {
    loginInitial(state) {
      state.error = null;
      state.loading = true;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setUser(state, user) {
      state.user = user;
    },
    setReconnect(state, reconnect) {
      state.reconnect = reconnect;
    },
    setActiveRoom(state, roomId) {
      state.activeRoom = roomId;
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setUsers(state, users) {
      state.users = users;
    },
    clearChatRoom(state) {
      state.users = [];
      state.messages = [];
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
    setSending(state, status) {
      state.sending = status;
    },
    setUserTyping(state, userId) {
      state.userTyping = userId;
    },
    reset(state) {
      state.error = null;
      state.users = [];
      state.messages = [];
      state.rooms = [];
      state.user = null;
    },
  },
  plugins: [vuexLocal.plugin],
  strict: debug,
});
