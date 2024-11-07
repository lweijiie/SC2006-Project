import Navbar from "./Navbar";
import { NAV_LINKS } from "../../constants";

const navbarLeftItems = [
  { label: "Home", link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_home}` },
  {
    label: "List Internship",
    link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_list_internship}`,
  },
  {
    label: "My Internships",  // New item
    link: `${NAV_LINKS.base_link}${NAV_LINKS.employer_display_internships}`,  // Assuming employer_internships is defined in NAV_LINKS
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
