import actions from "./actions";
export default {
    setConfig: (config) => {
        return (dispatch) => {
            dispatch({ type: actions.SET_CONFIG, payload: config });
        };
    },
    setConfigURL: (url) => {
        console.log(url)
        return (dispatch) => {
            dispatch({ type: actions.SET_CONFIG_URL, payload: url });
        };
    }
}