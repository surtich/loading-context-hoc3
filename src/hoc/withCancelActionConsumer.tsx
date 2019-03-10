import React from "react";
import { message } from "antd";
import { LoadingContext } from "./loadingContext";

export default (action = "onCancel") => WrappedComponent => ownProps => {
  return (
    <LoadingContext.Consumer>
      {({ cancel, setLoading, loading, messages }) => {
        const props = {
          ...ownProps,
          [action]: (...args) => {
            setLoading(false);
            loading && messages.cancel && message.warning(messages.cancel);
            cancel();
            if (typeof ownProps[action] === "function") {
              return ownProps[action](...args);
            }
          }
        };
        return <WrappedComponent {...props} />;
      }}
    </LoadingContext.Consumer>
  );
};
