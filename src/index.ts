
import {  router } from "./routes";
import { authSecurity } from "@useCase/Auth";

const auth = authSecurity.execute();
const Api = router
const AuthSecurity = auth.authenticate()




export {AuthSecurity, Api}