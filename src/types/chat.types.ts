interface IChatTypes {
  loading: boolean;
  sending: boolean;
  error: string;
  user?: IUser;
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
}

interface IMessage {
  name?: string;
  text: string;
  username: string;
  date: string;
}

interface IRoom {
  id: string;
  name?: string;
  users: IUser[];
}

interface IPresence {
  state: string;
}

export {
  IChatTypes,
  IUser,
  IMessage,
  IRoom,
  IPresence,
};
