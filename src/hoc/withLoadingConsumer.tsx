import React from "react";
import { LoadingContext } from "./loadingContext";
import { switchMap, tap, takeUntil, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { message } from "antd";

const withLoadingConsumer = (
  action = "mutate"
) => WrappedComponent => ownProps => {
  return (
    <LoadingContext.Consumer>
      {({ setLoading, loading, cancel$, messages }) => {
        const props = {
          ...ownProps,
          [action]: (...args) => {
            setLoading(true);
            messages.start && message.info(messages.start);
            const action$ = from(ownProps[action](...args)).pipe(
              tap(result => {
                setLoading(false);
                messages.end && message.info(messages.end);
              }),
              takeUntil(cancel$)
            );
            return action$.pipe(
              catchError(err => {
                setLoading(false);
                console.error(err);
                messages.error && message.error(messages.error);
                return of(err);
              })
            );
          }
        };

        return <WrappedComponent {...props} />;
      }}
    </LoadingContext.Consumer>
  );
};

export default withLoadingConsumer;
