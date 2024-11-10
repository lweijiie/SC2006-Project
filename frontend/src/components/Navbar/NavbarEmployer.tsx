import React from "react";
import Navbar from "./Navbar";
import { NAV_LINKS } from "../../constants";

const navbarLeftItems = [
  { label: "Home", link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_home}` },
  {
    label: "Internships",
    dropdown: [
      {
        label: "List Internship",
        link: `${NAV_LINKS.employer_list_internship}`,
      },
      {
        label: "My Internships",
        link: `${NAV_LINKS.employer_display_internships}`,
      },
    ],
  },
  {
    label: "Endorse Course",
    link: `${NAV_LINKS.base_link}employer/endorse-course`,
  },
];

const navbarRightItems = [
  {
    label: "Profile",
    link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_profile}`,
  },
];

const NavbarEmployer: React.FC = () => {
  return (
    <Navbar
      homeLink={`${NAV_LINKS.base_link}${NAV_LINKS.employer_home}`}
      navLeftItems={navbarLeftItems}
      navRightItems={navbarRightItems}
    />
  );
};

export default NavbarEmployer;
