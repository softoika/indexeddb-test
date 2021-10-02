import { useEffect, useReducer } from "react";
import { addUser, connect, getAllUsers, User } from "./db";

type State = {
  loading: boolean;
  users?: User[];
  error?: any;
};

type Action =
  | { type: "loading" }
  | { type: "completed"; users: User[] }
  | { type: "error"; error: any };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "loading":
      return { loading: true, users: state.users, error: state.error };
    case "completed":
      return { loading: false, users: action.users };
    case "error":
      return { loading: false, error: action.error, users: state.users };
    default:
      return state;
  }
};

export function useUsers() {
  const [state, dispatch] = useReducer(reducer, { loading: true });

  useEffect(() => {
    connect()
      .then((db) => getAllUsers(db))
      .then((users) => dispatch({ type: "completed", users }))
      .catch((error) => dispatch({ type: "error", error }));
  }, []);

  const handleAddUser = (user: User) => {
    let db: IDBDatabase;
    dispatch({ type: "loading" });
    connect()
      .then((_db) => (db = _db))
      .then(() => addUser(db, user))
      .then(() => getAllUsers(db))
      .then((users) => dispatch({ type: "completed", users }))
      .catch((error) => dispatch({ type: "error", error }));
  };

  return { ...state, handleAddUser };
}
