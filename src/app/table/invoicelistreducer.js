import actionConstants from '../actions'

const initialState = {
    invoicelist: [],
    vendorslist: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionConstants.SET_INVOICE_LIST:
            return {
                ...state,
                invoicelist: action.payload
            };
        case actionConstants.SET_VENDORS_LIST:
            return {
                ...state,
                vendorslist: action.payload
            };
        default:
            return state;
    }
};