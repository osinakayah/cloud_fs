import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Footer from '../../components/Footer/';

import Dashboard from '../Dashboard/Dashboard';

import Trash from '../Trash/Trash';

// Base
import UploadFile from '../UploadFile/UploadFile';
import {reactLocalStorage} from 'reactjs-localstorage';
//
import { connect } from 'react-redux'
class Full extends Component {

  render() {
      
      let user = reactLocalStorage.getObject('user_token', {});
      if(!user.token){
          return <Redirect to='/login'/>;
      }else{
          return (
              <div className="app">
                  <Header/>
                  <div className="app-body">
                      <Sidebar {...this.props}/>
                      <main className="main">
                          <Container fluid>
                              <Switch>
                                  <Route path="/dashboard" name="Files" component={Dashboard}/>
                                  <Route path='/add-file' name="Add Files" component={UploadFile}/>
                                  <Route path="/trash" name="Trash" component={Trash}/>
                                  <Redirect from="/" to="/dashboard"/>
                              </Switch>
                          </Container>
                      </main>
                  </div>
                  <Footer/>
              </div>
          );
      }
  }
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Full);
