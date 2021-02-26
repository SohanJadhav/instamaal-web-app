
import React, { Component } from 'react';
import Home from './home/index';
import Orders from './orders/index';
import MenuBar from './menubar';
import Products from './products/index';
import AddProduct from './products/add-product';
import Login from './login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class InstaMaal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserInfo: {}
    }
  }

  setLoggedInUserInfo = (info) => {
    this.setState({
      loggedInUserInfo: info
    });
  }

  render() {
    const { loggedInUserInfo } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Login onSetLoggedInUserInfo={this.setLoggedInUserInfo} />} />
          <div className="row" style={{ height: "100%" }}>
            <div className="col-2">
              <MenuBar loggedInUserInfo={loggedInUserInfo}></MenuBar>
            </div>
            <div className="col-10 no-padding">
              <Route exact path="/home">
                <Home />
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route exact path="/products" component={Products} />
              <Route exact path='/products/addProduct' component={AddProduct} />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default InstaMaal;