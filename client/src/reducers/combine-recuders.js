import { combineReducers } from 'redux';
import OrderReducer from './order-reducer';

const appReducer = combineReducers({
    orders: OrderReducer,
});

export default (state, action) => {
    return appReducer(state, action);
}