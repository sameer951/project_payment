import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
class PaymentComponet extends React.Component {

    render() {
        return <React.Fragment>
            Thank you for your Payment
            <Button type="primary" block onClick={() => {
                let path = '';
                this.props.history.push(path);
            }}>
                View other Invoices
            </Button>

        </React.Fragment>
    }
}

export default withRouter(PaymentComponet);