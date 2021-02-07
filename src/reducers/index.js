import { combineReducers } from "redux";

import lessons from "./lesson";
import teachers from "./teacher";

export default combineReducers({
  lessons,
  teachers,
});
