import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import CombineReducer from '../reducers/combine-recuders'

export default function (initialState) {
    const enhancer = compose(applyMiddleware(Thunk));
    return createStore(CombineReducer, initialState, enhancer);
}
