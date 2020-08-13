import React from 'react';
import { Table, Button, Modal, Checkbox } from 'antd';
import httpSevice from '../utill/httpservice';
import configreducer from '../configreducer';
import configactions from '../configactions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import invioceListactions from "./invioceListactions";

class TableComponet extends React.Component {

    invoice = {};

    state = {
        visible: false,
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    componentDidUpdate(prevProp) {
        console.log(this.props?.config?.config?.dataEndPoints?.call2)
        if (this.props?.config?.config?.dataEndPoints?.call2 != prevProp?.config?.config?.dataEndPoints?.call2)
            httpSevice.getURL(this.props?.config?.config?.dataEndPoints?.call2).then(res => {
                this.props.setInvoiceList(res.data)
            })
        if (this.props?.config?.config?.dataEndPoints?.call3 != prevProp?.config?.config?.dataEndPoints?.call3)
            httpSevice.getURL(this.props?.config?.config?.dataEndPoints?.call3).then(res => {
                this.props.setVendorsList(res.data)
            })
    }

    showModal = (invoice, vendor) => {
        this.invoice = { ...invoice, ...vendor };
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.history.push('/payment');

        httpSevice.post(this.props?.config?.config?.paymentPost, {
            ...this.invoice,
        }).then((res) => {
            console.log(res.data)
        })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };



    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        let vendorsList = [...(this.props?.invoicelist?.vendorslist || [])];
        let dataSource = [...(this.props?.invoicelist?.invoicelist || [])].map((invoice, index) => {
            let UI = { ...invoice, key: index + 'invoiceList' };
            let vendor = vendorsList.find((vendor) => vendor.vendorId == invoice.vendorId);
            console.log(vendor)
            if (this.props?.config?.config?.tableConfig?.paymentEnabled &&
                +invoice.amountDue > 0
            ) {
                UI.payUI = <React.Fragment key={`payUI${index}`}>
                    <button onClick={() => this.showModal(vendor, invoice)}>Pay</button>
                </React.Fragment>
            }
            return UI;
        });
        let columns = [];
        [...(this.props?.config?.config?.tableConfig?.columns || [])].forEach((column) => {
            let data = {
                title: column.displayName || undefined,
                dataIndex: column.fieldName || undefined,
                key: column.fieldName || undefined,
            };
            if (column.filteringEnabled) {
                data.filteredValue = filteredInfo.name || null;
                data.onFilter = (value, record) => record?.[column.fieldName]?.indexOf(value) === 0;
            }
            if (column.sortingEnabled) {
                data.sortOrder = sortedInfo.columnKey === column.fieldName && sortedInfo.order;
                data.sorter = (a, b) => a?.[column.fieldName]?.length - b?.[column.fieldName]?.length;
            }
            if (column.display)
                columns.push(data);
        });


        if (this.props?.config?.config?.tableConfig?.paymentEnabled) {
            columns.push({
                title: 'Pay',
                dataIndex: 'payUI',
                key: 'payUI',
            })
        }

        return <React.Fragment>
            <Table dataSource={dataSource} columns={columns} onChange={this.handleChange} />

            <Modal
                title={this.invoice["name"]}
                visible={this.state.visible}
                onOk={this.handleOk}
                okText="Pay Now"
                onCancel={this.handleCancel}
            >
                <p>InvoiceId:{this.invoice["invoiceId"]}</p>
                <p>Vendor Name:{this.invoice["vendorName"]}</p>
                <p>product:{this.invoice["product"]}</p>
                <p>amountBal:{this.invoice["amountBal"]}</p>
                <p>amountDue:{this.invoice["amountDue"]}</p>

                {+this.invoice["creditBal"] > 0 && <React.Fragment>
                    <Checkbox onChange={(event) => {
                        httpSevice.post(this.props?.config?.config?.creditPost, {
                            ...this.invoice,
                            creditPost: event.target.value
                        }).then((res) => {
                            console.log(res.data)
                        })
                    }}></Checkbox> Use Credit </React.Fragment>}
            </Modal>
        </React.Fragment>
    }
}

export default connect(configreducer, { ...configactions, ...invioceListactions })(withRouter(TableComponet));