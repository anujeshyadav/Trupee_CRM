import React from "react";
import {
  Card,
  CardBody,
  Input,
  Label,
  Row,
  CustomInput,
  Col,
  Form,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
} from "reactstrap";
import "../../../../assets/css/main.css";
import axiosConfig from "../../../../axiosConfig";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import { Eye, Trash2, ChevronDown, Edit } from "react-feather";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import swal from "sweetalert";
import AnalyticsDashboard from "../../../dashboard/analytics/AnalyticsDashboard";
import { Route, Link } from "react-router-dom";
class All extends React.Component {
  state = {
    rowData: [],
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    info: true,
    columnDefs: [
      {
        headerName: "S.No",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        width: 70,
        filter: true,
      },
      {
        headerName: "Status",
        field: "status",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return params.value === "complete" ? (
            <div className="badge badge-pill badge-success">Completed</div>
          ) : params.value === "pending" ? (
            <div className="badge badge-pill badge-warning">
              {params.data.status}
            </div>
          ) : params.value === "delivery" ? (
            <div className="badge badge-pill bg-primary">Delivered</div>
          ) : params.value === "canceled" ? (
            <div className="badge badge-pill bg-danger">
              {params.data.status}
            </div>
          ) : params.value === "Order Placed" ? (
            <div className="badge badge-pill bg-success">Order Placed</div>
          ) : null;
        },
      },

      {
        headerName: "Actions",
        field: "sortorder",
        field: "transactions",
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Route
                render={({ history }) => (
                  <Edit
                    className="mr-50"
                    size="25px"
                    color="blue"
                    onClick={() =>
                      history.push(
                        `/app/freshlist/order/EditOrder/${params.data._id}`
                      )
                    }
                  />
                )}
              />
              <Route
                render={() => (
                  <Trash2
                    className="mr-50"
                    size="25px"
                    color="red"
                    onClick={() => {
                      let selectedData = this.gridApi.getSelectedRows();
                      this.runthisfunction(params.data._id);
                      this.gridApi.updateRowData({ remove: selectedData });
                    }}
                  />
                )}
              />
            </div>
          );
        },
      },
      {
        headerName: "Order ID ",
        field: "orderId",
        filter: true,
        resizable: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data.orderId}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Email",
        field: "email",
        filter: true,
        resizable: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data.email}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Phone",
        field: "phone",
        filter: true,
        resizable: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data.phone_no}</span>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "Order Date",
      //   field: "order_date",
      //   filter: "true",
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div className="">
      //           <span>{params.data.order_date}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Ordered",
      //   field: "ordered",
      //   filter: true,
      //   resizable: true,
      //   width: 80,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data.orderd_from}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "Zone",
        field: "zone",
        filter: true,
        resizable: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data.order_zone}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Delivery Address",
        field: "delivery_address",
        filter: true,
        resizable: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div>
                <span>{params.data.delivery_add}</span>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "Assign Driver",
      //   field: "assign_driver",
      //   filter: true,
      //   resizable: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="d-flex align-items-center cursor-pointer">
      //         <div>
      //           <span>{params.data.assing_drive}</span>
      //         </div>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "Permitions",
      //   field: "permitions",
      //   filter: true,
      //   width: 180,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <CustomInput
      //         type="switch"
      //         className="mr-1"
      //         id="primary"
      //         name="primary"
      //         inline
      //         onChange={this.handleSwitchChange}
      //       ></CustomInput>
      //     );
      //   },
      // },
      // {
      //   headerName: "Status",
      //   field: "status",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return params.value === "complete" ? (
      //       <div className="badge badge-pill badge-success">
      //         {params.data.status}
      //       </div>
      //     ) : params.value === "pending" ? (
      //       <div className="badge badge-pill badge-warning">
      //         {params.data.status}
      //       </div>
      //     ) : params.value === "delivery" ? (
      //       <div className="badge badge-pill bg-primary">
      //         {params.data.status}
      //       </div>
      //     ) : params.value === "canceled" ? (
      //       <div className="badge badge-pill bg-danger">
      //         {params.data.status}
      //       </div>
      //     ) : (
      //       "No Status"
      //     );
      //   },
      // },

      // {
      //   headerName: "Actions",
      //   field: "sortorder",
      //   field: "transactions",
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="actions cursor-pointer">
      //         <Route
      //           render={({ history }) => (
      //             <Edit
      //               className="mr-50"
      //               size="25px"
      //               color="blue"
      //               onClick={() =>
      //                 history.push(
      //                   `/app/freshlist/order/viewAll/${params.data._id}`
      //                 )
      //               }
      //             />
      //           )}
      //         />
      //         <Route
      //           render={() => (
      //             <Trash2
      //               className="mr-50"
      //               size="25px"
      //               color="red"
      //               onClick={() => {
      //                 let selectedData = this.gridApi.getSelectedRows();
      //                 this.runthisfunction(params.data._id);
      //                 this.gridApi.updateRowData({ remove: selectedData });
      //               }}
      //             />
      //           )}
      //         />
      //       </div>
      //     );
      //   },
      // },
    ],
  };
  handleSwitchChange = () => {
    return swal("Success!", "Submitted SuccessFull!", "success");
  };
  async componentDidMount() {
    await axiosConfig.get("/admin/allorder_list").then((response) => {
      let rowData = response.data.data;
      this.setState({ rowData });
      console.log(rowData);
    });
  }

  async runthisfunction(id) {
    await axiosConfig.delete(`/admin/del_order/${id}`).then((response) => {
      swal("Row Deleted!", "SuccessFull Deleted!", "error");
      console.log(response);
    });
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ selectedName: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files });
    this.setState({ selectedName: event.target.files.name });
    console.log(event.target.files);
  };
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
  };

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <h2> Select Date Range</h2>
          <Card>
            <CardBody>
              <Form className="m-1" onSubmit={this.submitHandler}>
                <Row>
                  <Col lg="3" className="mb-2">
                    <Label>All</Label>
                    <Input
                      required
                      type="select"
                      name="bannertype"
                      placeholder=""
                      value={this.state.bannertype}
                      onChange={this.changeHandler}
                    >
                      <option value="select">--Select--</option>
                      <option value="All">All</option>
                      <option value="Painding">Painding</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="in_process">In Process</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="returned">Returned</option>
                      <option value="failed_to_deliver">
                        Failed to Deliver
                      </option>
                    </Input>
                  </Col>
                  <Col lg="3" className="mb-2">
                    <Label>Start Date</Label>
                    <Input
                      required
                      type="date"
                      name="bannertype"
                      placeholder=""
                      value={this.state.bannertype}
                      onChange={this.changeHandler}
                    ></Input>
                  </Col>
                  <Col lg="3" className="mb-2">
                    <Label>End Date</Label>
                    <Input
                      required
                      type="date"
                      name="bannertype"
                      placeholder=""
                      value={this.state.bannertype}
                      onChange={this.changeHandler}
                    ></Input>
                  </Col>

                  <Col lg="3" className="mb-2">
                    <Button.Ripple className="bt" color="primary" type="submit">
                      Show Data
                    </Button.Ripple>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <AnalyticsDashboard />
        </Col>
        <Col sm="12">
          <Card>
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  All Order List
                </h1>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" float-right"
                      color="primary"
                      onClick={() =>
                        history.push("/app/freshlist/order/addOrder")
                      }
                    >
                      Add Order
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody>
              {this.state.rowData === null ? null : (
                <div className="ag-theme-material w-100 my-2 ag-grid-table">
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="mb-1">
                      <UncontrolledDropdown className="p-1 ag-dropdown">
                        <DropdownToggle tag="div">
                          {this.gridApi
                            ? this.state.currenPageSize
                            : "" * this.state.getPageSize -
                              (this.state.getPageSize - 1)}
                          -
                          {this.state.rowData.length -
                            this.state.currenPageSize * this.state.getPageSize >
                          0
                            ? this.state.currenPageSize * this.state.getPageSize
                            : this.state.rowData.length}
                          of {this.state.rowData.length}
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(20)}
                          >
                            20
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(50)}
                          >
                            50
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(100)}
                          >
                            100
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(134)}
                          >
                            134
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between mb-1">
                      <div className="table-input mr-1">
                        <Input
                          placeholder="Hub Name"
                          onChange={(e) =>
                            this.updateSearchQuery(e.target.value)
                          }
                          value={this.state.value}
                        />
                      </div>
                      <div className="table-input mr-1">
                        <Input
                          placeholder="Order Id"
                          onChange={(e) =>
                            this.updateSearchQuery(e.target.value)
                          }
                          value={this.state.value}
                        />
                      </div>
                      <div className="table-input mr-1">
                        <Input
                          placeholder="Phone Number"
                          onChange={(e) =>
                            this.updateSearchQuery(e.target.value)
                          }
                          value={this.state.value}
                        />
                      </div>
                      <div className="table-input mr-1">
                        <Input
                          placeholder="Enter Email"
                          onChange={(e) =>
                            this.updateSearchQuery(e.target.value)
                          }
                          value={this.state.value}
                        />
                      </div>
                      <div className="export-btn">
                        <Button.Ripple
                          color="primary"
                          onClick={() => this.gridApi.exportDataAsCsv()}
                        >
                          Export as CSV
                        </Button.Ripple>
                      </div>
                    </div>
                  </div>
                  <ContextLayout.Consumer>
                    {(context) => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={false}
                        pagination={true}
                        paginationPageSize={this.state.paginationPageSize}
                        pivotPanelShow="always"
                        enableRtl={context.state.direction === "rtl"}
                      />
                    )}
                  </ContextLayout.Consumer>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default All;
