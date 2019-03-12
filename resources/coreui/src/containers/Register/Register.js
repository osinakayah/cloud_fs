import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import {Container, Row, Col, Card, CardBody, Button, Input, InputGroup} from 'reactstrap';
import { connect } from 'react-redux';
import registrationActions from "../../redux/registrationRedux";
import { RingLoader } from 'react-spinners';
class Register extends Component {
  constructor(props){
    super(props)
      this.state = {
          email:'',
          password: ''
      }
  }
  render() {
      const { registration } = this.props;
      if(registration.success){
          return <Redirect to='/login'/>
      }
    return (
      <div className="app flex-row align-items-center">
        <Container>
            <Row>
                <Col xs={{ size: 4, offset: 4 }} >
                    <RingLoader loading={this.props.registration.fetching} />
                </Col>

            </Row>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  <InputGroup className="mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <Input onChange={(event)=>{this.setState({email: event.target.value})}} type="text" placeholder="Email"/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="icon-lock"></i>
                      </span>
                    </div>
                    <Input onChange={(event)=>{this.setState({password: event.target.value})}} type="password" placeholder="Password"/>
                  </InputGroup>
                  <Button color="success" block onClick={()=>{this.props.attemptRegistration({email: this.state.email, password: this.state.password})}}>Create Account</Button>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        registration: state.registration
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      attemptRegistration: data => dispatch(registrationActions.registrationRequest(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
