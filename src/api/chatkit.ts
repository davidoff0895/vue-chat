// @ts-ignore
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import moment from 'moment';
import store from '../store';
import {IMessage, IRoom, IUser} from '@/types/chat.types';

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser: IUser = null;
let activeRoom: IRoom = null;

async function connectUser(userId: string) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId,
  });
  currentUser = await chatManager.connect();
  return currentUser;
}

function setMembers() {
  const members = activeRoom.users.map((user) => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state,
  }));
  store.commit('setUsers', members);
}

async function subscribeToRoom(roomId: string) {
  store.commit('clearChatRoom');
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      onMessage: (message: IMessage) => {
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY'),
        });
      },
      onPresenceChanged: () => {
        setMembers();
      },
      onUserStartedTyping: (user: IUser) => {
        store.commit('setUserTyping', user.id);
      },
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null);
      },
    },
  });
  setMembers();
  return activeRoom;
}

async function sendMessage(text: string) {
  return  await currentUser.sendMessage({
    text,
    roomId: activeRoom.id,
  });
}

export function isTyping(roomId: string) {
  currentUser.isTypingIn({ roomId });
}

function disconnectUser() {
  currentUser.disconnect();
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser,
};
