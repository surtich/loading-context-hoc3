import React, { useState } from "react";
import "antd/dist/antd.css";
import { render } from "react-dom";
import Login from "./login";
import { Button, Modal } from "antd";
import withLoadingProvider from "./hoc/withLoadingProvider";
import withSpinConsumer from "./hoc/withSpinConsumer";
import withCancelActionConsumer from "./hoc/withCancelActionConsumer.tsx";

import "./styles.css";

const messages = {
  start: "action login started",
  end: "action login ended",
  cancel: "action login cancelled",
  error: "action login error"
};

const ModalWithLoading = withLoadingProvider()(
  withCancelActionConsumer()(Modal)
);

const LoginWithSpin = withSpinConsumer()(Login);

const Login2 = withLoadingProvider({ messages })(
  withCancelActionConsumer()(({ remove, onCancel, ...props }) => (
    <div>
      <LoginWithSpin {...props} />
      <Button onClick={onCancel}>Cancel</Button>
      <Button
        onClick={() => {
          onCancel();
          remove();
        }}
      >
        Delete
      </Button>
    </div>
  ))
);

function App() {
  const [visible, setVisible] = useState(false);
  const [logins, setLogins] = useState([]);
  const [numLogins, incLogin] = useState(0);
  const hideModal = () => setVisible(false);

  const addLogin = () => {
    incLogin(numLogins + 1);
    setLogins([...logins, numLogins]);
  };
  const removeLogin = key => () => {
    setLogins(logins.filter(k => key !== k));
  };
  return (
    <div className="App">
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Login
      </Button>
      <ModalWithLoading visible={visible} onOk={hideModal} onCancel={hideModal}>
        <LoginWithSpin />
      </ModalWithLoading>
      <Button onClick={addLogin}>Add</Button>
      {logins.map(key => (
        <Login2 remove={removeLogin(key)} key={key} />
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
