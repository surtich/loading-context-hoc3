import React from "react";
import { LoadingContext } from "./loadingContext";
import { Spin } from "antd";

export default () => WrappedComponent => props => {
  return (
    <LoadingContext.Consumer>
      {({ loading }) => {
        return (
          <Spin spinning={loading} delay={250}>
            <WrappedComponent {...props} />
          </Spin>
        );
      }}
    </LoadingContext.Consumer>
  );
};
