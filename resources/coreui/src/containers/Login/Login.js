import React, {Component} from 'react';
import { Redirect, NavLink} from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup} from 'reactstrap';
import loginActions from '../../redux/loginRedux'
import { connect } from 'react-redux'
class Login extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {login} = this.props;

    if(login.payload){
        return window.location = '/';
      // return <Redirect to='/' />
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row>
            <Col xs={{ size: 4, offset: 4 }} >
              <RingLoader loading={this.props.login.fetching} />
            </Col>

          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-user"></i>
                        </span>
                      </div>
                      <Input onChange={(event)=>{this.props.setEmail(event.target.value)}} type="text" placeholder="Username"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                      </div>
                      <Input onChange={(event)=>{this.props.setPassword(event.target.value)}} type="password" placeholder="Password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={() => this.props.attemptLogin(this.props.login.email, this.props.login.password)} color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Register and start using our cloud bucket microservices</p>
                      <NavLink to="/register"><Button>Register Now!</Button></NavLink>

                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmail: email => dispatch(loginActions.loginSetEmail(email)),
        setPassword: password => dispatch(loginActions.loginSetPassword(password)),
        attemptLogin: (email, password) => dispatch(loginActions.loginRequest({email, password}))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
