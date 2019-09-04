interface IChatTypes {
  loading: boolean;
  sending: boolean;
  error: any;
  user: any[];
  reconnect: boolean;
  activeRoom: any;
  rooms: any[];
  users: any[];
  messages: any[];
  userTyping: any;
}

interface IStorage {
  
}

export {
  IChatTypes,
};
