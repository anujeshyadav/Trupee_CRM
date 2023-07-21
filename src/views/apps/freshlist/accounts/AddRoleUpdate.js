import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button, Label, Input } from "reactstrap";
import { Roles } from "./AddRole";
import axios from "axios";

export default function AddRoleNew() {
  const [Desc, setDesc] = useState("");
  const [Role, setRole] = useState("");
  const [Selected, setSelected] = useState([]);

  // const navigate = useNavigate();

  const handleSelectPage = (value, checked, permit, title, ele) => {
    if (checked) {
      const newarrry = Selected.map((val, i) => {
        let x = val?.pagename;
        if (x === title) {
          const newperset = Selected[i].permission.includes(permit);

          if (newperset) {
            // console.log(newperset);
          } else {
            // console.log(newperset);
            let arr = Selected[i].permission.push(permit);
            console.log(arr);
          }
        } else {
          const found = Selected.find(
            (element, i) => element.pagename === title
          );
          let newfound = found?.pagename === title;
          if (newfound === false) {
            const newarr = Selected.concat({
              pagename: title,
              permission: [permit],
            });
            setSelected(newarr);
          }
        }
      });
      if (Selected.length < 1) {
        const newarr = Selected.concat({
          pagename: title,
          permission: [permit],
        });
        setSelected(newarr);
      }
    } else {
      let remove = Selected?.map((ele, i) => {
        let y = ele?.pagename;
        if (title === y) {
          ele?.permission.splice(ele?.permission.indexOf(permit), 1);
        }
        if (ele?.permission.length === 0) {
          Selected.splice(i, 1);
        }
      });
    }
  };
  useEffect(() => {
    console.log(Selected);
  }, [Selected]);

  const handleSumit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.set("user_id", 1);
    formdata.set("role_name", Role);
    formdata.set("description", Desc);
    formdata.set("selectedarray", JSON.stringify(Selected));

    axios
      .post(
        `https://invoice-o.com/Infinity/api/ApiCommonController/addroles`,
        formdata
      )
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <>
      <Row className="">
        <Col xl={12}>
          <Card>
            <div
              className="container"
              // title={data?.cardTitle}
              // dotsMenu={data?.dotsMenu}
            />
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
                    // className="form-control"
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
                        // background: "#e5dfdf26",
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
                            {/* <input
                              onClick={(e) => {
                                handleSelectTab(value?.title);
                              }}
                              style={{
                                height: "19px",
                                width: "26px",
                              }}
                              type="checkbox"
                            /> */}
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
                              {/* <Col key={i} lg="12" md="12">
                              <div className="container elementsofaddrole py-2">
                                <div>
                                  <Row className="gy-0">
                                    <Col className="gy-0">
                                      <h6 className=""> {ele}</h6>
                                    </Col>
                                    <Col className="gy-0" lg="3" sm="3">
                                      <input
                                        style={{
                                          height: "19px",
                                          width: "26px",
                                        }}
                                        type="checkbox"
                                      />
                                    </Col>
                                  </Row>{" "}
                                </div>
                              </div>
                            </Col> */}
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
