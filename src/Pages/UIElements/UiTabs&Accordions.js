import React, { useState } from "react";
import classnames from "classnames";

 import { Card, CardBody, Col, Collapse, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiTabs = () => {
  document.title = "Tabs & Accordions | Symox - React Admin & Dashboard Template";


  const [activeTab, setactiveTab] = useState("1");
  const [activeTab2, setactiveTab2] = useState("1");
  const [activeTab3, setactiveTab3] = useState("1");

  const [verticalActiveTabWithIcon, setverticalActiveTabWithIcon] = useState("1");
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [customActiveTabsm, setcustomActiveTabsm] = useState("1");

  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(false);
  const [col3, setcol3] = useState(false);

  const [col5, setcol5] = useState(true);
  const [col6, setcol6] = useState(true);
  const [col7, setcol7] = useState(true);

  const [col9, setcol9] = useState(true);
  const [col10, setcol10] = useState(false);
  const [col11, setcol11] = useState(false);

  const [col12, setcol12] = useState(true);

  const t_col1 = () => {
    setcol1(!col1);
    setcol2(false);
    setcol3(false);
  };

  const t_col2 = () => {
    setcol2(!col2);
    setcol1(false);
    setcol3(false);
  };

  const t_col3 = () => {
    setcol3(!col3);
    setcol1(false);
    setcol2(false);
  };

  const t_col5 = () => {
    setcol5(!col5);
  };

  const t_col6 = () => {
    setcol6(!col6);
  };

  const t_col7 = () => {
    setcol7(!col7);
  };

  const t_col8 = () => {
    setcol6(!col6);
    setcol7(!col7);
  };

  const t_col9 = () => {
    setcol9(!col9);
    setcol10(false);
    setcol11(false);
  };

  const t_col10 = () => {
    setcol10(!col10);
    setcol9(false);
    setcol11(false);
  };

  const t_col11 = () => {
    setcol11(!col11);
    setcol10(false);
    setcol9(false);
  };

  const t_col12 = () => {
    setcol12(!col12);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const toggle2 = (tab) => {
    if (activeTab2 !== tab) {
      setactiveTab2(tab);
    }
  };

  const toggle3 = (tab) => {
    if (activeTab3 !== tab) {
      setactiveTab3(tab);
    }
  };

  const toggleVerticalIcon = (tab) => {
    if (verticalActiveTabWithIcon !== tab) {
      setverticalActiveTabWithIcon(tab);
    }
  };

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const toggleCustomsm = (tab) => {
    if (customActiveTabsm !== tab) {
      setcustomActiveTabsm(tab);
    }
  };

  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid={true}>

          <Breadcrumbs title="UI Elements" breadcrumbItem="Tabs & Accordions" />

          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Default Tabs</h4>
                  <p className="card-title-desc">Use the tab JavaScript plugin—include
                    it individually or through the compiled <code className="highlighter-rouge">bootstrap.js</code> {" "}
                    file—to extend our navigational tabs and pills to create tabbable panes
                    of local content, even via dropdown menus.</p>
                </CardHeader>

                <CardBody>

                  <Nav tabs role="tablist" className="nav-tabs">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                        <span className="d-none d-sm-block">Home</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                        <span className="d-none d-sm-block">Profile</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                        <span className="d-none d-sm-block">Messages</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          toggle("4");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="fas fa-cog"></i></span>
                        <span className="d-none d-sm-block">Settings</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1" id="home">

                      <p className="mb-0">
                        Raw denim you probably haven't heard of them jean shorts Austin.
                        Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                        cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                        butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                        qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                        iphone. Seitan aliquip quis cardigan american apparel, butcher
                        voluptate nisi qui.
                      </p>

                    </TabPane>
                    <TabPane tabId="2" id="profile">

                      <p className="mb-0">
                        Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                        single-origin coffee squid. Exercitation +1 labore velit, blog
                        sartorial PBR leggings next level wes anderson artisan four loko
                        farm-to-table craft beer twee. Qui photo booth letterpress,
                        commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                        vinyl cillum PBR. Homo nostrud organic, assumenda labore
                        aesthetic magna delectus.
                      </p>

                    </TabPane>
                    <TabPane tabId="3" id="messages">

                      <p className="mb-0">
                        Etsy mixtape wayfarers, ethical wes anderson tofu before they
                        sold out mcsweeney's organic lomo retro fanny pack lo-fi
                        farm-to-table readymade. Messenger bag gentrify pitchfork
                        tattooed craft beer, iphone skateboard locavore carles etsy
                        salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                        Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
                        mi whatever gluten yr.
                      </p>

                    </TabPane>
                    <TabPane tabId="4" id="settings">
                      <p className="mb-0">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                        art party before they sold out master cleanse gluten-free squid
                        scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                        art party locavore wolf cliche high life echo park Austin. Cred
                        vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                        farm-to-table VHS.
                      </p>

                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Justify Tabs</h4>
                  <p className="card-title-desc">Use the tab JavaScript plugin—include
                    it individually or through the compiled <code className="highlighter-rouge">bootstrap.js</code>{" "}
                    file—to extend our navigational tabs and pills to create tabbable panes
                    of local content, even via dropdown menus.</p>
                </CardHeader>

                <CardBody>
                  <Nav pills className="navtab-bg nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab2 === "1",
                        })}
                        onClick={() => {
                          toggle2("1");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                        <span className="d-none d-sm-block">Home</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab2 === "2",
                        })}
                        onClick={() => {
                          toggle2("2");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                        <span className="d-none d-sm-block">Profile</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab2 === "3",
                        })}
                        onClick={() => {
                          toggle2("3");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                        <span className="d-none d-sm-block">Messages</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab2 === "4",
                        })}
                        onClick={() => {
                          toggle2("4");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="fas fa-cog"></i></span>
                        <span className="d-none d-sm-block">Settings</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab2} className="p-3 text-muted">
                    <TabPane tabId="1" id="home-1">

                      <p className="mb-0">
                        Raw denim you probably haven't heard of them jean shorts Austin.
                        Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                        cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                        butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                        qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                        iphone. Seitan aliquip quis cardigan american apparel, butcher
                        voluptate nisi qui.
                      </p>

                    </TabPane>
                    <TabPane tabId="2" id="profile-1">

                      <p className="mb-0">
                        Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                        single-origin coffee squid. Exercitation +1 labore velit, blog
                        sartorial PBR leggings next level wes anderson artisan four loko
                        farm-to-table craft beer twee. Qui photo booth letterpress,
                        commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                        vinyl cillum PBR. Homo nostrud organic, assumenda labore
                        aesthetic magna 8-bit.
                      </p>

                    </TabPane>
                    <TabPane tabId="3" id="messages-1">

                      <p className="mb-0">
                        Etsy mixtape wayfarers, ethical wes anderson tofu before they
                        sold out mcsweeney's organic lomo retro fanny pack lo-fi
                        farm-to-table readymade. Messenger bag gentrify pitchfork
                        tattooed craft beer, iphone skateboard locavore carles etsy
                        salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                        Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
                        mi whatever gluten-free.
                      </p>

                    </TabPane>

                    <TabPane tabId="4" id="settings-1">

                      <p className="mb-0">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                        art party before they sold out master cleanse gluten-free squid
                        scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                        art party locavore wolf cliche high life echo park Austin. Cred
                        vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                        farm-to-table.
                      </p>

                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Vertical Nav Tabs</h4>
                  <p className="card-title-desc">Example of Vertical nav tabs</p>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col md="3">
                      <Nav pills className="flex-column" id="v-pills-tab">
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTabWithIcon === "1",
                            })}
                            onClick={() => {
                              toggleVerticalIcon("1");
                            }}
                            id="v-pills-home-tab"
                          >
                            Home
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTabWithIcon === "2",
                            })}
                            onClick={() => {
                              toggleVerticalIcon("2");
                            }}
                            id="v-pills-profile-tab"
                          >
                            Profile
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              "mb-2": true,
                              active: verticalActiveTabWithIcon === "3",
                            })}
                            onClick={() => {
                              toggleVerticalIcon("3");
                            }}
                            id="v-pills-messages-tab"
                          >
                            Messages
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: verticalActiveTabWithIcon === "4",
                            })}
                            onClick={() => {
                              toggleVerticalIcon("4");
                            }}
                            id="v-pills-settings-tab"
                          >
                            Settings
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col md="9">
                      <TabContent
                        activeTab={verticalActiveTabWithIcon}
                        className="text-muted mt-4 mt-md-0"
                        id="v-pills-tabContent"
                      >
                        <TabPane tabId="1" id="v-pills-home">
                          <p>
                            Raw denim you probably haven't heard of them jean shorts Austin.
                            Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                            cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                            butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                            qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                            iphone. Seitan aliquip quis cardigan.
                          </p>
                          <p>
                            Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                            qui irure terry richardson ex squid.
                          </p>
                        </TabPane>
                        <TabPane tabId="2" id="v-pills-profile">
                          <p>
                            Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                            single-origin coffee squid. Exercitation +1 labore velit, blog
                            sartorial PBR leggings next level wes anderson artisan four loko
                            farm-to-table craft beer twee. Qui photo booth letterpress,
                            commodo enim craft beer mlkshk.
                          </p>
                          <p className="mb-0"> Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna 8-bit</p>

                        </TabPane>
                        <TabPane tabId="3" id="v-pills-messages">
                          <p>
                            Etsy mixtape wayfarers, ethical wes anderson tofu before they
                            sold out mcsweeney's organic lomo retro fanny pack lo-fi
                            farm-to-table readymade. Messenger bag gentrify pitchfork
                            tattooed craft beer, iphone skateboard locavore carles etsy
                            salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                            Leggings gentrify squid 8-bit cred.
                          </p>
                          <p className="mb-0">
                            DIY synth PBR banksy irony.
                            Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
                            mi whatever gluten-free
                          </p>
                        </TabPane>

                        <TabPane tabId="4" id="v-pills-settings">
                          <p>
                            Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                            art party before they sold out master cleanse gluten-free squid
                            scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                            art party locavore wolf cliche high life echo park Austin. Cred
                            vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                            farm-to-table
                          </p>
                          <p className="mb-0">
                            Fanny pack portland seitan DIY,
                            art party locavore wolf cliche high life echo park Austin. Cred
                            vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                            farm-to-table.
                          </p>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Custom Tabs</h4>
                  <p className="card-title-desc">Example of custom tabs</p>
                </CardHeader>

                <CardBody>
                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                        <span className="d-none d-sm-block">Home</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                        <span className="d-none d-sm-block">Profile</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "3",
                        })}
                        onClick={() => {
                          toggleCustom("3");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                        <span className="d-none d-sm-block">Messages</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "4",
                        })}
                        onClick={() => {
                          toggleCustom("4");
                        }}
                      >
                        <span className="d-block d-sm-none"><i className="fas fa-cog"></i></span>
                        <span className="d-none d-sm-block">Settings</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent
                    activeTab={customActiveTab}
                    className="p-3 text-muted"
                  >
                    <TabPane tabId="1" id="home1">

                      <p className="mb-0">
                        Raw denim you probably haven't heard of them jean shorts Austin.
                        Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                        cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                        butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                        qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                        iphone. Seitan aliquip quis cardigan american apparel, butcher
                        voluptate nisi qui.
                      </p>

                    </TabPane>
                    <TabPane tabId="2">

                      <p className="mb-0" id="profile1">
                        Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                        single-origin coffee squid. Exercitation +1 labore velit, blog
                        sartorial PBR leggings next level wes anderson artisan four loko
                        farm-to-table craft beer twee. Qui photo booth letterpress,
                        commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                        vinyl cillum PBR. Homo nostrud organic, assumenda labore
                        aesthetic magna delectus.
                      </p>

                    </TabPane>
                    <TabPane tabId="3">

                      <p className="mb-0" id="messages1">
                        Etsy mixtape wayfarers, ethical wes anderson tofu before they
                        sold out mcsweeney's organic lomo retro fanny pack lo-fi
                        farm-to-table readymade. Messenger bag gentrify pitchfork
                        tattooed craft beer, iphone skateboard locavore carles etsy
                        salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                        Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
                        mi whatever gluten-free carles.
                      </p>

                    </TabPane>
                    <TabPane tabId="4">

                      <p className="mb-0" id="settings1">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                        art party before they sold out master cleanse gluten-free squid
                        scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                        art party locavore wolf cliche high life echo park Austin. Cred
                        vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                        farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral,
                        mustache readymade keffiyeh craft.
                      </p>

                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Card Header Tabs</h4>
                  <div className="flex-shrink-0">
                    <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTabsm === "1",
                          })}
                          onClick={() => {
                            toggleCustomsm("1");
                          }}
                        >
                          <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                          <span className="d-none d-sm-block">Home</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTabsm === "2",
                          })}
                          onClick={() => {
                            toggleCustomsm("2");
                          }}
                        >
                          <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                          <span className="d-none d-sm-block">Profile</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTabsm === "3",
                          })}
                          onClick={() => {
                            toggleCustomsm("3");
                          }}
                        >
                          <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                          <span className="d-none d-sm-block">Message</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </div>

                <CardBody>
                  <TabContent
                    activeTab={customActiveTabsm}
                    className="text-muted"
                  >
                    <TabPane tabId="1" id="home2">

                      <p className="mb-0">
                        Raw denim you probably haven't heard of them jean shorts Austin.
                        Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                        cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                        butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                        qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                        iphone. Seitan aliquip quis cardigan american apparel, butcher
                        voluptate nisi qui.
                      </p>

                    </TabPane>
                    <TabPane tabId="2" id="profile2">

                      <p className="mb-0">
                        Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                        single-origin coffee squid. Exercitation +1 labore velit, blog
                        sartorial PBR leggings next level wes anderson artisan four loko
                        farm-to-table craft beer twee. Qui photo booth letterpress,
                        commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                        vinyl cillum PBR. Homo nostrud organic, assumenda labore
                        aesthetic magna delectus.
                      </p>

                    </TabPane>
                    <TabPane tabId="3" id="messages2">

                      <p className="mb-0">
                        Etsy mixtape wayfarers, ethical wes anderson tofu before they
                        sold out mcsweeney's organic lomo retro fanny pack lo-fi
                        farm-to-table readymade. Messenger bag gentrify pitchfork
                        tattooed craft beer, iphone skateboard locavore carles etsy
                        salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                        Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
                        mi whatever gluten-free carles.
                      </p>

                    </TabPane>

                  </TabContent>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Card Header Pills</h4>
                  <div className="flex-shrink-0">
                    <Nav pills className="nav justify-content-end nav-pills card-header-pills">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab3 === "1",
                          })}
                          onClick={() => {
                            toggle3("1");
                          }}
                        >
                          <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                          <span className="d-none d-sm-block">Home</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab3 === "2",
                          })}
                          onClick={() => {
                            toggle3("2");
                          }}
                        >
                          <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                          <span className="d-none d-sm-block">Profile</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab3 === "3",
                          })}
                          onClick={() => {
                            toggle3("3");
                          }}
                        >
                          <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                          <span className="d-none d-sm-block">Message</span>
                        </NavLink>
                      </NavItem>

                    </Nav>
                  </div>
                </div>

                <CardBody>

                  <TabContent activeTab={activeTab3} className="text-muted">
                    <TabPane tabId="1" id="home3">

                      <p className="mb-0">
                        Raw denim you probably haven't heard of them jean shorts Austin.
                        Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                        cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                        butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                        qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                        iphone. Seitan aliquip quis cardigan american apparel, butcher
                        voluptate nisi qui.
                      </p>

                    </TabPane>
                    <TabPane tabId="2" id="profile3">

                      <p className="mb-0">
                        Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                        single-origin coffee squid. Exercitation +1 labore velit, blog
                        sartorial PBR leggings next level wes anderson artisan four loko
                        farm-to-table craft beer twee. Qui photo booth letterpress,
                        commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                        vinyl cillum PBR. Homo nostrud organic, assumenda labore
                        aesthetic magna delectus.
                      </p>

                    </TabPane>
                    <TabPane tabId="3" id="messages3">

                      <p className="mb-0">
                        Etsy mixtape wayfarers, ethical wes anderson tofu before they
                        sold out mcsweeney's organic lomo retro fanny pack lo-fi
                        farm-to-table readymade. Messenger bag gentrify pitchfork
                        tattooed craft beer, iphone skateboard locavore carles etsy
                        salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                        Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
                        mi whatever gluten-free carles.
                      </p>

                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Card Header Form Select</h4>
                  <div className="flex-shrink-0">
                    <select className="form-select form-select-sm mb-0 my-n1">
                      <option defaultValue="MAY">May</option>
                      <option defaultValue="AP">April</option>
                      <option defaultValue="MA">March</option>
                      <option defaultValue="FE">February</option>
                      <option defaultValue="JA">January</option>
                      <option defaultValue="DE">December</option>
                    </select>
                  </div>
                </div>

                <CardBody className="text-muted">
                  <p className="mb-0">
                    Etsy mixtape wayfarers, ethical wes anderson tofu before they
                    sold out mcsweeney's organic lomo retro fanny pack lo-fi
                    farm-to-table readymade. Messenger bag gentrify pitchfork
                    tattooed craft beer, iphone skateboard locavore carles etsy
                    salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                    Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
                    mi whatever gluten-free carles.
                  </p>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Card Header Button</h4>
                  <div className="flex-shrink-0">
                    <div className="d-flex flex-wrap gap-2 mb-0 my-n1">
                      <div className="btn-group">

                        <UncontrolledDropdown>
                          <DropdownToggle tag="button" className="btn btn-sm btn-primary">
                            Dropdown <i className="mdi mdi-chevron-down"></i>
                          </DropdownToggle>
                          <DropdownMenu >
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another action</DropdownItem>
                            <DropdownItem>Something else here</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Separated link</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <button type="button" className="btn btn-soft-secondary btn-sm">
                        Button
                      </button>
                    </div>
                  </div>
                </div>

                <CardBody className="text-muted">
                  <p className="mb-0">
                    Raw denim you probably haven't heard of them jean shorts Austin.
                    Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                    cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                    butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                    qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                    iphone. Seitan aliquip quis cardigan american apparel, butcher
                    voluptate nisi qui.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Accordion Example</h4>
                  <p className="card-title-desc">Click the accordions below to expand/collapse the accordion content.</p>
                </CardHeader>
                <CardBody>

                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className={classnames(
                            "accordion-button",
                            "fw-medium",
                            { collapsed: !col1 }
                          )}
                          type="button"
                          onClick={t_col1}
                          style={{ cursor: "pointer" }}
                        >
                          Accordion Item #1
                        </button>
                      </h2>

                      <Collapse
                        isOpen={col1}
                        className="accordion-collapse"
                        id="collapseOne"
                      >
                        <div className="accordion-body">
                          <div className="text-muted">
                            <strong className="text-dark">This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className={classnames(
                            "accordion-button",
                            "fw-medium",
                            { collapsed: !col2 }
                          )}
                          type="button"
                          onClick={t_col2}
                          style={{ cursor: "pointer" }}
                        >
                          Accordion Item #2
                        </button>
                      </h2>

                      <Collapse
                        isOpen={col2}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body">
                          <div className="text-muted">
                            <strong className="text-dark">This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.

                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className={classnames(
                            "accordion-button",
                            "fw-medium",
                            { collapsed: !col3 }
                          )}
                          type="button"
                          onClick={t_col3}
                          style={{ cursor: "pointer" }}
                        >
                          Accordion Item #3
                        </button>
                      </h2>
                      <Collapse
                        isOpen={col3}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body">
                          <div className="text-muted">
                            <strong className="text-dark">This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.

                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Flush Accordion</h4>
                  <p className="card-title-desc">Add <code>.accordion-flush</code> to remove the default <code>background-color</code>, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.</p>
                </CardHeader>
                <CardBody>
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className={classnames(
                            "accordion-button",
                            "fw-medium",
                            { collapsed: !col9 }
                          )}
                          type="button"
                          onClick={t_col9}
                          style={{ cursor: "pointer" }}
                        >
                          Accordion Item #1
                        </button>
                      </h2>

                      <Collapse
                        isOpen={col9}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body">
                          <div className="text-muted">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                            quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                            single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice.
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className={classnames(
                            "accordion-button",
                            "fw-medium",
                            { collapsed: !col10 }
                          )}
                          type="button"
                          onClick={t_col10}
                          style={{ cursor: "pointer" }}
                        >
                          Accordion Item #2
                        </button>
                      </h2>

                      <Collapse
                        isOpen={col10}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body">
                          <div className="text-muted">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                            quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                            single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer raw denim
                            aesthetic synth nesciunt you probably haven't heard of them accusamus labore.
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="flush-collapseThree"
                      >
                        <button
                          className={classnames(
                            "accordion-button",
                            "fw-medium",
                            { collapsed: !col11 }
                          )}
                          type="button"
                          onClick={t_col11}
                          style={{ cursor: "pointer" }}
                        >
                          Accordion Item #3
                        </button>
                      </h2>
                      <Collapse
                        isOpen={col11}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body">
                          <div className="text-muted">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                            quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                            single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Collapse Example</h4>
                  <p className="card-title-desc">
                    You can use a link with the <code>href</code> attribute, or a button with the <code>data-bs-target</code> attribute. In both cases, the <code>data-bs-toggle="collapse"</code> is required.
                  </p>
                </CardHeader>

                <CardBody>
                  <div className="mt-2">
                    <div className="d-flex gap-2 flex-wrap mb-3">
                      <Link
                        to="#"
                        onClick={t_col5}
                        style={{ cursor: "pointer" }}
                        className="btn btn-primary"
                      >
                        Link with href{" "}
                      </Link>
                      <button
                        onClick={t_col5}
                        className="btn btn-primary"
                        type="button"
                        style={{ cursor: "pointer" }}
                      >
                        Button with data-target
                      </button>
                    </div>
                    <Collapse isOpen={col5} id="collapseExample">
                      <Card className="card border shadow-none text-muted mb-0">
                        <CardBody>
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Multiple Targets Collapse</h4>
                  <p className="card-title-desc">
                    A <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can show and hide multiple elements by referencing them with a selector in its <code>href</code> or <code>data-bs-target</code> attribute.
                  </p>
                </CardHeader>

                <CardBody>

                  <div className="d-flex gap-2 flex-wrap mb-3">
                    <Link
                      to="#"
                      onClick={t_col6}
                      style={{ cursor: "pointer" }}
                      className="btn btn-primary"
                    >
                      Toggle first element
                    </Link>
                    <button
                      onClick={t_col7}
                      className="btn btn-primary"
                      type="button"
                      style={{ cursor: "pointer" }}
                    >
                      Toggle second element
                    </button>

                    <button
                      onClick={t_col8}
                      className="btn btn-primary"
                      type="button"
                      style={{ cursor: "pointer" }}
                    >
                      Toggle both elements
                    </button>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Collapse isOpen={col6} id="multiCollapseExample1">
                        <Card>
                          <CardBody className="border shadow-none text-muted mb-0">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.

                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                    <div className="col">
                      <Collapse isOpen={col7} id="multiCollapseExample2">
                        <Card>
                          <CardBody className="border shadow-none text-muted mb-0">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.

                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Horizontal Collapse</h4>
                  <p className="card-title-desc">The collapse plugin also supports horizontal collapsing. Add the <code>.collapse-horizontal</code> modifier class to transition the <code>width</code> instead of <code>height</code> and set a <code>width</code> on the immediate child element.</p>
                </CardHeader>

                <CardBody>
                  <p>
                    <button
                      onClick={t_col12}
                      className="btn btn-primary"
                      type="button"
                      style={{ cursor: "pointer" }}
                    >
                      Toggle width collapse
                    </button>
                  </p>

                  <div style={{ minHeight: "120px" }}>

                    <Collapse isOpen={col12} id="collapseWidthExample" horizontal>
                      <div className="card card-body mb-0" style={{ width: "300px" }}>
                        This is some placeholder content for a horizontal collapse. It's hidden by default and shown when
                        triggered.
                      </div>
                    </Collapse>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default UiTabs;