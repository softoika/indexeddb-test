import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { User } from "./db";
import { useUsers } from "./useUsers";

const Popup: React.VFC = () => {
  const { users, error, handleAddUser } = useUsers();

  return (
    <>
      <h1>Popup</h1>
      {error && <p>ERROR: {error}</p>}
      <h2>Add user</h2>
      <AddUserForm
        onSubmit={(user) => {
          handleAddUser(user);
        }}
      />
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Login ID</th>
            <th>Email</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.loginId}>
              <td>{user.loginId}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const AddUserForm: React.VFC<{ onSubmit: (user: User) => void }> = ({
  onSubmit,
}) => {
  const loginIdRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          !loginIdRef.current?.value ||
          !emailRef.current?.value ||
          !nameRef.current?.value
        ) {
          return;
        }
        onSubmit({
          loginId: loginIdRef.current.value ?? "",
          email: emailRef.current.value ?? "",
          name: nameRef.current.value ?? "",
        });
        loginIdRef.current.value = "";
        emailRef.current.value = "";
        nameRef.current.value = "";
      }}
    >
      <label>
        Login ID:
        <input name="loginId" ref={loginIdRef} />
      </label>
      <br />
      <label>
        Email:
        <input name="email" ref={emailRef} />
      </label>
      <br />
      <label>
        Name:
        <input name="name" ref={nameRef} />
      </label>
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
