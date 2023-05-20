import { combineReducers } from "redux";

// import reducers
// import UserReducer from "./User/userReducer";
// import domainReducer from "./Domain/domainReducer";
import ThemeReducer from "./Theme/ThemeOptions";

const rootReducer = combineReducers({
  //   user: UserReducer,
  //   domainInfo: domainReducer,
  theme: ThemeReducer,
});

export default rootReducer;
