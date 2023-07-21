import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button, Label, Input } from "reactstrap";
import { Roles } from "./AddRole";
import axios from "axios";
import AddRoleUpdate from "./AddRoleUpdate";
import axiosConfig from "../../../../axiosConfig";
// import navigationConfig from "../../../../configs/navigationConfig";
import swal from "sweetalert";
import { CloudLightning } from "react-feather";

export default function AddRoleNew() {
  const [Desc, setDesc] = useState("");
  const [Role, setRole] = useState("");
  const [Selected, setSelected] = useState([]);

  // const navigate = useNavigate();

  const handleSelectPage = (value, checked, permit, title, ele) => {
    if (checked) {
      const newarr = Selected.concat({
        pagename: title,
        permission: [permit],
      });
      setSelected(newarr);
    } else {
      const unselceted = Selected.map((ele, i) => {
        if (ele.permission[0] === permit && ele?.PageName === title) {
          Selected.splice(i, 1);
        }
      });
    }
  };
  useEffect(() => {
    // console.log(navigationConfig);
  }, []);

  const handleSumit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.set("user_id", 1);
    formdata.set("role_name", Role);
    formdata.set("description", Desc);
    formdata.set("selectedarray", JSON.stringify(Selected));

    axiosConfig
      .post(`/addroles`, formdata)
      .then((res) => {
        console.log(res);
        swal("Success", "Role Created");
        setSelected("");
        setDesc("");
        setRole("");
        var checkboxes = document.getElementsByName("check");
        for (var checkbox of checkboxes) {
          checkbox.checked = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section>
        <AddRoleUpdate />
      </section>

      <Row className="">
        <Col xl={12}>
          <Card>
            <div className="container" />
            <div className="container py-2">
              <div className="d-flex justify-content-end">
                <a
                  onClick={() => navigate("/m/role")}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  <Button color="primary">Back</Button>
                </a>
              </div>
            </div>
            <div className="container mt-5">
              <Row className="mb-3 container">
                <Col>
                  <Label>Enter Role </Label>
                  <Input
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                    type="text"
                    placeholder="Enter Role"
                    className="form-control"
                  />
                </Col>
                <Col>
                  <Label>Enter Role Description </Label>
                  <Input
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                    type="text"
                    placeholder="Enter Role Desc.."
                  />
                </Col>
              </Row>
            </div>
            <section className="mt-5 container">
              <Row className="gy-0 container">
                {Roles &&
                  Roles?.map((value, index) => (
                    <Col
                      key={index}
                      style={{
                        borderRadius: "12px",

                        height: "340px",
                      }}
                      className="customcol gy-0 mb-2 "
                      lg="12"
                      md="12"
                      sm="12"
                    >
                      <Row
                        style={{
                          lineHeight: "44px",
                          borderRadius: "6px",
                          background: "#f7f7f8",
                        }}
                        className="roleheading"
                      >
                        <Col className="gy-2" lg="4" sm="4" md="4">
                          <div className="align-item-center">
                            <span className="mx-3 gy-0"> {value?.title}</span>
                          </div>
                        </Col>
                        <Col className="gy-2">
                          <div className="d-flex justify-content-center">
                            <span className="mx-3"> View</span>
                          </div>
                        </Col>
                        <Col className="gy-2">
                          <div className="d-flex justify-content-center">
                            <span className="mx-3"> Create</span>
                          </div>
                        </Col>
                        <Col className="gy-2">
                          <div className="d-flex justify-content-center">
                            <span className="mx-3"> Edit</span>
                          </div>
                        </Col>
                        <Col className="gy-2">
                          <div className="d-flex justify-content-center">
                            <span className="mx-3"> Delete</span>
                          </div>
                        </Col>
                      </Row>
                      <div className="container">
                        <div className="gy-2 mt-2">
                          {value?.TabName?.map((ele, i) => (
                            <>
                              <Row key={i} className="">
                                <Col lg="4" sm="4" md="4">
                                  <h6 className="mt-1"> {ele?.title}</h6>
                                </Col>
                                {ele?.permission?.map((permit, ind) => (
                                  <Col key={ind} lg="2" md="2" sm="2">
                                    <div className="d-flex justify-content-center">
                                      <input
                                        name="check"
                                        onClick={(e) => {
                                          handleSelectPage(
                                            e.target.value,
                                            e.target.checked,
                                            permit,
                                            ele.title,
                                            ind
                                          );
                                        }}
                                        style={{
                                          height: "19px",
                                          width: "26px",
                                        }}
                                        type="checkbox"
                                      />
                                    </div>
                                  </Col>
                                ))}
                              </Row>
                            </>
                          ))}
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-center mb-2">
                    <Button onClick={(e) => handleSumit(e)} color="primary">
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </section>
          </Card>
        </Col>
      </Row>
    </>
  );
}
