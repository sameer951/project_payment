import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import TableComponet from './app/table/table';
import ProfileComponet from './app/pages/profiliepage';
import LoginComponet from './app/pages/loginpage';
import PaymentComponent from './app/pages/payment';
import ConfigComponent from './app/pages/configpage';
import LayoutComponet from './app/layout/layout';
import 'antd/dist/antd.css';
import './App.css';
import configreducer from './app/configreducer';
import configactions from './app/configactions';
import Axios from "axios";
class App extends React.Component {

  componentDidMount() {
    console.log(this.props)
    this.getConfig()
  }

  async getConfig() {
    if (this.props?.config?.configURL)
      await Axios.get(this.props?.config?.configURL).then(config => {
        console.log("config updated", config.data)
        this.props.setConfig(config.data)
      })
    else this.props.history.push('config');
  }
  componentDidUpdate(prevProp) {
    if (this.props?.config?.configURL != prevProp?.config?.configURL)
      this.getConfig()

  }

  render() {
    return (
      <div className="App">
        <LayoutComponet>
          <Switch>
            <Route exact path="/" component={TableComponet} />
            <Route path="/payment" component={PaymentComponent} />
            <Route path="/config" component={ConfigComponent} />
            <Route path="*" component={ConfigComponent} />
          </Switch>
        </LayoutComponet>
      </div>
    );
  }
}

export default connect(configreducer, { ...configactions })(withRouter(App));