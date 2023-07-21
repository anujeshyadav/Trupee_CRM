import React from "react";
import {
  Container,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Button,
  CardHeader,
  Card,
  Col,
  Row,
  Form,
  TabContent,
  TabPane,
} from "reactstrap";
// import classnames from "classnames";
import logo from "../../../../assets/img/logo/logo.png";
//import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { history } from "../../../../history";
import LoginAuth0 from "./LoginAuth0";
import LoginFirebase from "./LoginFirebase";
import LoginJWT from "./LoginJWT";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  handlechange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    axios
      .post("http://3.6.37.16:8000/admin/adminlogin", this.state)
      .then((response) => {
        swal("Successful!", "You clicked the button!", "success");
        console.log(response.data.user);
        console.log(response.data);
        localStorage.setItem("auth-admintoken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        this.props.history.push("/dashboard");
        // history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.response);
        swal("Error!", "Invalid! Email or Password ", "error");
      });
  };

  render() {
    return (
      <Container>
        <Row className="m-0 justify-content-center">
          <Col
            sm="5"
            xl="5"
            lg="5"
            md="5"
            className="d-flex justify-content-center"
          >
            <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
              <Row className="m-0">
                <Col lg="12" md="12" className="p-1">
                  <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                    <div className="logo-box text-center p-1">
                      <img src={logo} alt="loginImg" width="150" />
                    </div>
                    <CardHeader className="pb-1">
                      <CardTitle>
                        <h4 className="mb-0">
                          <strong>Login</strong>
                        </h4>
                      </CardTitle>
                    </CardHeader>
                    <p className="px-2 auth-title mb-2">
                      Welcome back, Please login to your account.
                    </p>
                    <Form onSubmit={this.loginHandler}>
                      <Label>Email</Label>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handlechange}
                          // required
                        />
                      </FormGroup>

                      <Label>Password</Label>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handlechange}
                          // required
                        />
                      </FormGroup>

                      <div className="d-flex justify-content-between">
                        <Button.Ripple
                          color="primary"
                          outline
                          onClick={() => {
                            history.push("/pages/forgotpassword");
                          }}
                        >
                          Forget Password
                        </Button.Ripple>
                        <Button.Ripple color="primary" type="submit">
                          Login
                        </Button.Ripple>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <LoginJWT />
                          </TabPane>
                          <TabPane tabId="2">
                            <LoginFirebase />
                          </TabPane>
                        </TabContent>
                      </div>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps)(Login);
