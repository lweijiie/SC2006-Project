import React from "react";
import Navbar from "./Navbar";
import { NAV_LINKS } from "../../constants";

const navbarLeftItems = [
  { label: "Home", link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}` },
  {
    label: "Jobs",
    link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_job_search}`,
  },
  {
    label: "Courses",
    link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_find_course}`,
  },
];

const navbarRightItems = [
  {
    label: "Profile",
    link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_profile}`,
  },
];

const NavbarJobSeeker: React.FC = () => {
  return (
    <Navbar
      homeLink={`${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`}
      navLeftItems={navbarLeftItems}
      navRightItems={navbarRightItems}
    />
  );
};

export default NavbarJobSeeker;
