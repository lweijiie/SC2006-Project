import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

interface NavItem {
  label: string;
  link?: string;
  dropdown?: { label: string; link: string }[];
}

interface NavbarProps {
  homeLink: string;
  navLeftItems: NavItem[];
  navRightItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ homeLink, navLeftItems, navRightItems }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <Box bg="gray.800" px={4} py={2} color="white">
      <Flex h="60px" alignItems="center" maxW="1200px" mx="auto">
        
        {/* Logo Section */}
        <ChakraLink href={homeLink} mr={10} display="flex" alignItems="center">
          <img src={logo} alt="CareerPathNow Logo" style={{ height: "100px" }} />
        </ChakraLink>

        {/* Left Navigation Links */}
        <HStack as="nav" spacing={4} flex="1">
          {navLeftItems.map((item, index) =>
            item.dropdown ? (
              <Menu key={index}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="link" color="white">
                  {item.label}
                </MenuButton>
                <MenuList bg="gray.700" color="black" borderColor="gray.600">
                  {item.dropdown.map((subItem, subIndex) => (
                    <MenuItem key={subIndex} onClick={() => navigate(subItem.link)} _hover={{ bg: "white.600" }}>
                      {subItem.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            ) : (
              <ChakraLink
                key={index}
                href={item.link}
                fontWeight="bold"
                color="white"
                _hover={{ color: "gray.300" }}
              >
                {item.label}
              </ChakraLink>
            )
          )}
        </HStack>

        {/* Right Navigation Links */}
        <HStack spacing={4}>
          {navRightItems.map((item, index) => (
            <ChakraLink
              key={index}
              href={item.link}
              fontWeight="bold"
              color="white"
              _hover={{ color: "gray.300" }}
            >
              {item.label}
            </ChakraLink>
          ))}
          <Button colorScheme="red" onClick={handleLogOut}>
            Log Out
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
