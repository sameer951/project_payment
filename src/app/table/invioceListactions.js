import actions from "../actions";
export default {
    setInvoiceList: (invoiceList) => {
        return (dispatch) => {
            dispatch({ type: actions.SET_INVOICE_LIST, payload: invoiceList });
        };
    },
    setVendorsList: (vendorsList) => {
        return (dispatch) => {
            dispatch({ type: actions.SET_VENDORS_LIST, payload: vendorsList });
        };
    },
}