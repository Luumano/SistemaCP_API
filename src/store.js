import { createStore, combineReducers } from 'redux';

const initialProductState = {
    produtos: []
};

const produtoReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case 'SET_PRODUTOS':
            return {
                ...state,
                produtos:  action.payload
            };
        case 'ADD_PRODUTO':
            return {
                ...state,
                produtos: [...state.produtos, action.payload]
            };
        case 'UPDATE_PRODUTO':
            return{
                ...state,
                produtos: state.produtos.map(produto => produto.id === action.payload.id ? action.payload : produto)
            };
        case 'DELETE_PRODUTO':
            return {
                ...state,
                produtos: state.produtos.filter((_, idx) => idx !== action.payload)
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    produto: produtoReducer
});

const store = createStore(rootReducer);

export default store;