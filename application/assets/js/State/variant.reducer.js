import { createStore } from 'redux';

function variantReducer(state = { variant: null }, action) {
    switch (action.type) {
        case 'add': return { data: action.data };
        default: return state;
    }
}

export default createStore(variantReducer);