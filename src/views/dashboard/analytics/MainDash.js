import React from "react";
import { Row, Col, Card, CardTitle, CardText } from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import axios from "axios";
import DispatchedOrders from "./DispatchedOrders";

import "../../../assets/scss/pages/dashboard-analytics.scss";
import {
  FcNews,
  FcSalesPerformance,
  FcRules,
  FcCancel,
  FcShop,
  FcOk,
  FcShipped,
  FcBusinessman,
} from "react-icons/fc";
import { FaWallet, Facart, FaCartArrowDown, FaBoxOpen } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AnalyticsDashboard from "./AnalyticsDashboard";

class MainDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      customer: {},
      store: {},
      seller: {},
      order: {},
      banner: {},
      brand: {},
      total_sub: {},
      Coupon: {},
    };
  }

  componentDidMount() {
    axiosConfig
      .get("/admin/product_list")
      .then(response => {
        this.setState({ product: response.data.data.length });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg="3" md="12">
            <Card
              className="bg-secondary  py-3 "
              body
              inverse
              style={{ borderColor: "white" }}
            >
              <CardTitle
                className="fntweight"
                tag="h3"
                style={{ color: "black", fontSize: "16px" }}
              >
                <FaBoxOpen style={{ color: "orange" }} />
                &nbsp;&nbsp; Total Products
              </CardTitle>
              <CardText
                className="wt-text"
                tag="span"
                style={{ color: "black", marginLeft: "4px" }}
              >
                {this.state.product}
              </CardText>
            </Card>
          </Col>
          <Col lg="3" md="12">
            <Card
              className="bg-secondary  py-3"
              body
              inverse
              style={{ borderColor: "white" }}
            >
              <CardTitle
                className="fntweight"
                tag="h3"
                style={{ color: "black", fontSize: "16px" }}
              >
                <FaBoxOpen style={{ color: "orange" }} />
                &nbsp;&nbsp; Total Hub
              </CardTitle>
              <CardText
                className="wt-text"
                tag="span"
                style={{ color: "black", marginLeft: "4px" }}
              >
                {this.state.product}
              </CardText>
            </Card>
          </Col>
          <Col lg="3" md="12">
            <Card
              className="bg-secondary  py-3"
              body
              inverse
              style={{ borderColor: "white" }}
            >
              <CardTitle
                className="fntweight"
                tag="h3"
                style={{ color: "black", fontSize: "16px" }}
              >
                <FaBoxOpen style={{ color: "orange" }} />
                &nbsp;&nbsp; Total Sales
              </CardTitle>
              <CardText
                className="wt-text"
                tag="span"
                style={{ color: "black", marginLeft: "4px" }}
              >
                {this.state.product}
              </CardText>
            </Card>
          </Col>
          <Col lg="3" md="12">
            <Card
              className="bg-secondary py-3"
              body
              inverse
              style={{ borderColor: "white" }}
            >
              <CardTitle
                className="fntweight"
                tag="h3"
                style={{ color: "black", fontSize: "14px" }}
              >
                <FaBoxOpen style={{ color: "orange" }} />
                &nbsp;&nbsp; Total Customers
              </CardTitle>
              <CardText
                className="wt-text"
                tag="span"
                style={{ color: "black", marginLeft: "4px" }}
              >
                {this.state.product}
              </CardText>
            </Card>
          </Col>
        </Row>
        <AnalyticsDashboard />
      </React.Fragment>
    );
  }
}
export default MainDash;
