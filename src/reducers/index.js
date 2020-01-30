import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import TodoReducer from './TodoReducer' 
export default combineReducers({

    UserReducer,
    TodoReducer

})
