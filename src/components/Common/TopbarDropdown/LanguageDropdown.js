import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { map } from "lodash";

//i18n
import i18n from "../../../i18n";

import { withTranslation } from "react-i18next";

import languages from "../../../CommonData/languages";

const LanguageDropdown = () => {
  const [singlebtn, setSinglebtn] = useState(false);
  const [selectLang, setselectLang] = useState("en");

  useEffect(() => {
    const selectLang = localStorage.getItem("I18N_LANGUAGE");
    setselectLang(selectLang);
  }, [selectLang]);

  const changeLanguageAction = (lang) => {
    //set language as i18n
    i18n.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setselectLang(lang);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={singlebtn}
        toggle={() => setSinglebtn(!singlebtn)}
        className="d-inline-block language-switch"
      >
        <DropdownToggle className="btn header-item" tag="button">
          <img
            src={languages[selectLang].flag}
            alt="Header Language"
            height="16"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {map(Object.keys(languages), (key) => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`dropdown-item notify-item language`}
            >
              <img
                src={languages[key].flag}
                alt="Symox"
                className="me-1"
                height="12"
              />

              <span className="align-middle">{languages[key].label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(LanguageDropdown);

