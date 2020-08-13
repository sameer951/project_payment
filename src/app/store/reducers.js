import configreducer from '../configreducer';
import invoicelistreducer from '../table/invoicelistreducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    config: configreducer,
    invoicelist: invoicelistreducer
});

export default rootReducer;