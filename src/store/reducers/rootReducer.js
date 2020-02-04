import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer
});

export default rootReducer;