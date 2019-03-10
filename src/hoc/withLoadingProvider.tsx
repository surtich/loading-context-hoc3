import React, { useState, useEffect } from "react";
import { Subject } from "rxjs";
import { LoadingContext } from "./loadingContext";

export default ({ messages = {} } = {}) => WrappedComponent =>
  class extends React.Component {
    state = {
      loading: false
    };
    cancel$: null;
    cancel = () => {
      this.cancel$.next();
    };
    setLoading = value => {
      this.setState({ loading: value });
    };
    constructor(props) {
      super(props);
      this.cancel$ = new Subject();
    }
    render() {
      const { loading } = this.state;
      const { setLoading, cancel$, cancel } = this;
      const props = this.props;
      return (
        <LoadingContext.Provider
          value={{ loading, setLoading, cancel$, cancel, messages }}
        >
          <WrappedComponent {...props} />
        </LoadingContext.Provider>
      );
    }
    componentWillUnmount() {
      this.cancel();
      this.cancel$.unsubscribe();
    }
  };
