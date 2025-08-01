import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { createSelector } from "reselect";

const UserProfile = () => {
  document.title = "Profile | Symox - React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);

  // const { error, success } = useSelector((state) => ({
  //   error: state.profile.error,
  //   success: state.profile.success,
  // }));

  const selectUserProfileState = (state) => state.Profile;
  const userprofileData = createSelector(
    selectUserProfileState,
    (state) => ({
      success: state.success,
      error: state.error
    })
  );
  // Inside your component
  const {
    success, error 
  } = useSelector(userprofileData);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || "",
      idx: idx || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    },
  });

  return (
    <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title="Upzet" breadcrumbItem="Profile" />

            <Row>
              <Col lg="12">
                {error && error ? (
                  <Alert color="danger">
                    <div>{error}</div>
                  </Alert>
                ) : null}
                {success ? (
                  <Alert color="success">
                    <div>{success}</div>
                  </Alert>
                ) : null}

                <Card>
                  <CardBody>
                    <div className="d-flex">
                      <div className="ms-3">
                        <img
                          src={avatar}
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </div>
                      <div className="flex-grow-1 align-self-center">
                        <div className="text-muted">
                          <h5>{name}</h5>
                          <p className="mb-1">{email}</p>
                          <p className="mb-0">Id no: #{idx}</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <h4 className="card-title mb-4">Change User Name</h4>

            <Card>
              <CardBody>
                <Form
                  className="form-horizontal"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <div className="form-group">
                    <Label className="form-label">User Name</Label>
                    <Input
                      name="username"
                      // value={name}
                      className="form-control"
                      placeholder="Enter User Name"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.username || ""}
                      invalid={
                        validation.touched.username &&
                        validation.errors.username
                          ? true
                          : false
                      }
                    />
                    {validation.touched.username &&
                    validation.errors.username ? (
                      <FormFeedback type="invalid">
                        <div>{validation.errors.username}</div>
                      </FormFeedback>
                    ) : null}
                    <Input name="idx" value={idx} type="hidden" />
                  </div>
                  <div className="text-center mt-4">
                    <Button type="submit" color="danger">
                      Update User Name
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Container>
        </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
