import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  FormGroup,
  CustomInput,
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";
import swal from "sweetalert";

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      type: "",
      feature: "",
      status: "",
      selectedFile1: null,
      selectedName1: "",
      selectedFile2: null,
      selectedName2: "",
      selectedFile3: null,
      selectedName3: "",
      selectedFile4: null,
      selectedName4: "",
    };
  }

  onChangeHandler1 = event => {
    this.setState({ selectedFile1: event.target.files[0] });
    this.setState({ selectedName1: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler2 = event => {
    this.setState({ selectedFile2: event.target.files[0] });
    this.setState({ selectedName2: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler3 = event => {
    this.setState({ selectedFile3: event.target.files[0] });
    this.setState({ selectedName3: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler4 = event => {
    this.setState({ selectedFile4: event.target.files[0] });
    this.setState({ selectedName4: event.target.files[0].name });
    console.log(event.target.files[0]);
  };

  changeHandler1 = e => {
    this.setState({ status: e.target.value });
  };
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("category_name", this.state.category_name);
    data.append("type", this.state.type);
    data.append("feature", this.state.feature);
    data.append("status", this.state.status);
    data.append("image", this.state.selectedFile1, this.state.selectedName1);
    data.append(
      "thumbnail_img",
      this.state.selectedFile2,
      this.state.selectedName2
    );
    data.append(
      "web_banner",
      this.state.selectedFile3,
      this.state.selectedName3
    );
    data.append(
      "app_banner",
      this.state.selectedFile4,
      this.state.selectedName4
    );

    axiosConfig
      .post(`/admin/addcategory`, data)
      .then(response => {
        console.log(response);
        if (response.data.msg === "success") {
          swal("Success!", "You Data IS been Submitted", "success");
          this.props.history.push("/app/freshlist/category/categoryList");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Card>
          <h1 className="p-2 ">Product Upload</h1>
          <Row className="m-2">
            <Col>
              <h2>Basic Information</h2>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/category/categoryList")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row className="mb-2">
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      placeholder="Title"
                      name="title"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>Description</Label>
                    <Input
                      type="textarea"
                      placeholder="Description"
                      name="description"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>REGULAR PRICE (₹)</Label>
                    <Input
                      type="number"
                      placeholder="Amount In Number"
                      name="title"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>DISCOUNT PRICE (₹)</Label>
                    <Input
                      type="number"
                      placeholder="Amount In Number"
                      name="DISCOUNT"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>STOCK</Label>
                    <Input
                      type="TEXT"
                      placeholder="STOCK"
                      name="STOCK"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>SHIPING FEE(₹)</Label>
                    <Input
                      type="number"
                      placeholder="Amount In Number"
                      name="DISCOUNT"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>TAX RATE (%)</Label>
                    <Input
                      type="number"
                      placeholder="Tax in Percentage"
                      name="TAX"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup>
                    <Label>TAGS</Label>
                    <Input
                      type="textarea"
                      placeholder="Type here..."
                      name="TAGS"
                      bsSize="lg"
                      //   value={this.state.category_name}
                      //   onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="my-2" lg="12" md="6">
                  <h2>Media & Published</h2>
                </Col>

                <Col lg="3" md="3">
                  <FormGroup>
                    <CustomInput type="file" onChange={this.onChangeHandler3} />
                  </FormGroup>
                </Col>
                <Col lg="3" md="3">
                  <FormGroup>
                    <CustomInput type="file" onChange={this.onChangeHandler3} />
                  </FormGroup>
                </Col>
                <Col lg="3" md="3">
                  <FormGroup>
                    <CustomInput type="file" onChange={this.onChangeHandler3} />
                  </FormGroup>
                </Col>
                <Col lg="3" md="3">
                  <FormGroup>
                    <CustomInput type="file" onChange={this.onChangeHandler3} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Add Product
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddProduct;
