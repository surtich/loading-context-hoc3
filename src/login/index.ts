import { compose } from "../util/compose";
import { LoginContainer } from "./loginContainer";
import { LoginComponent } from "./loginComponent";
import withLoadingConsumer from "../hoc/withLoadingConsumer";

//export default withLoadingConsumer("login")(LoginContainer);

export default LoginContainer(withLoadingConsumer("login")(LoginComponent));
