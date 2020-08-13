import actionConstants from './actions';
const initialState = {
    configURL: 'http://localhost:3000/data/app/config',
    config: {},
};

export default (state = initialState, action) => {
    console.log(state,action)
    switch (action.type) {
        case actionConstants.SET_CONFIG_URL:
            return {
                ...state,
                configURL: action.payload
            };
        case actionConstants.SET_CONFIG:
            console.log(state)
            return {
                ...state,
                config: action.payload
            }
        default:
            return state;
    }
};