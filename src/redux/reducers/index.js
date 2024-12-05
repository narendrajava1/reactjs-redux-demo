import { combineReducers } from 'redux'
import employeeReducer from './employeeReducer'

const rootReducers = combineReducers({
  employees: employeeReducer,
  /*  export default combineReducers({
    registerReducer,
    loginReducer
  });
  Remember that this syntax:

  {
    registerReducer,
    loginReducer
  }
  is equivalent to this:

  {
    registerReducer: registerReducer,
    loginReducer: loginReducer
  }*/
})
export default rootReducers
