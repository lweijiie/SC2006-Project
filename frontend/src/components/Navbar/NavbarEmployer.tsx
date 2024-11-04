import Navbar from "./Navbar";
import { NAV_LINKS } from "../../constants";

const navbarLeftItems = [
  { label: "Home", link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_home}` },
  {
    label: "Jobs Post",
    link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_job_post}`,
  },
];

const navbarRightItems = [
  {
    label: "Profile",
    link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_profile}`,
  },
];

const NavbarEmployer = () => {
  return (
    <Navbar
      homeLink={`${NAV_LINKS.base_link}${NAV_LINKS.employer_home}`}
      navLeftItems={navbarLeftItems}
      navRightItems={navbarRightItems}
    />
  );
};

export default NavbarEmployer;
