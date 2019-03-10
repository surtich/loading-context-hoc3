import React from "react";

const login = ({ userName, password }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(userName === "kk" && password === "kk");
    }, 8000);
  }).catch(err => console.error(err));
export const LoginContainer = Component => props => (
  <Component login={login} {...props} />
);
