interface IChatTypes {
  loading: boolean;
  sending: boolean;
  error: string;
  user: IUser;
  reconnect: boolean;
  activeRoom?: IRoom;
  rooms: IRoom[];
  users: IUser[];
  messages: IMessage[];
  userTyping: any;
}

interface IUser {
  id: string;
  name: string;
  username: string;
  presence: IPresence;
  rooms: IRoom[];

  subscribeToRoom(option: any): any;
  sendMessage(params: any): any;
  isTypingIn(params: any): any;
  disconnect(): any;
}

interface IMessage {
  name: string;
  text: string;
  username: string;
  date: string;
  sender: ISender;
  senderId: string;
  createdAt: string;
}

interface IRoom {
  id: string;
  name: string;
  users: IUser[];
}

interface IPresence {
  state: string;
}

interface ISender {
  name: string;
}

export {
  IChatTypes,
  IUser,
  IMessage,
  IRoom,
  IPresence,
};
