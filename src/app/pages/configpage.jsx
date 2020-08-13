import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import configreducer from '../configreducer';
import configactions from '../configactions';
import { withRouter } from 'react-router-dom';
import { Button, Space, Row, Col } from 'antd';
class ConfigComponet extends React.Component {
    configURL = '';

    componentWillMount() {

    }

    render() {
        console.log(this.configURL, this.props)
        return <React.Fragment>
            <Row>
                <Col span={18} push={6}>
                    <Button className="" type="primary" size={5} onClick={() => {
                        this.props.history.push('');
                    }}>
                        Save
                    </Button>
                </Col>
                <Col span={6} pull={18}>
                    <Input placeholder="config url to be loaded" onChange={(event) => {
                        console.log(event.target.value)
                        this.props.setConfigURL(event.target.value)
                    }} defaultValue={this.props?.config?.configURL} />
                </Col>
            </Row>


        </React.Fragment>
    }
}

export default connect(configreducer, { ...configactions })(withRouter(ConfigComponet));