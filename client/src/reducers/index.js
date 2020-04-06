import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./authReducer";
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));
export default store;
