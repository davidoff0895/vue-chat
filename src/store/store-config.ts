import {
  GetterTree,
  ActionContext,
  ActionTree,
  MutationTree,
  StoreOptions,
} from 'vuex';
import VuexPersistence from 'vuex-persist';

import { IChatTypes, IRoom } from '@/types/chat.types';
// @ts-ignore
import chatkit from '@/api/chatkit';

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence<IChatTypes>({
  storage: window.localStorage,
});

const state: IChatTypes = {
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
  };

const getters: GetterTree<IChatTypes, null> = {
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
};

const actions: ActionTree<IChatTypes, null> = {
  async login({ commit, state }: ActionContext<IChatTypes, null>, userId: string) {
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
  async changeRoom({ commit }: ActionContext<IChatTypes, null>, roomId: string) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId);
      commit('setActiveRoom', { id, name });
    } catch (error) {
      const message = error.message || error.info.error_description;
      commit('setError', message);
    }
  },
  async sendMessage({ commit }: ActionContext<IChatTypes, null>, message: string) {
    try {
      commit('setError', '');
      commit('setSending', true);
      return  await chatkit.sendMessage(message);
    } catch (error) {
      const err = error.message || error.info.error_description;
      commit('setError', err);
    } finally {
      commit('setSending', false);
    }
  },
  async logout({ commit }: ActionContext<IChatTypes, null>) {
    commit('reset');
    chatkit.disconnectUser();
    window.localStorage.clear();
  },
};

const mutations: MutationTree<IChatTypes> = {
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
};

export const storeOptions: StoreOptions<any> = {
  state,
  getters,
  actions,
  mutations,
  plugins: [vuexLocal.plugin],
  strict: debug,
};
