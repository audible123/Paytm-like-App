import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeftRightIcon,
  LayoutDashboard,
  Banknote,
} from "lucide-react";
import { motion } from "framer-motion";


import RightArrowIcon from "./../assets/icons/rightArrow.svg";

const variants = {
  expanded: { width: "21%" },
  nonexpanded: { width: "7%" },
};

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`flex lg:space-x-3 w-full p-2 rounded ${
        location.pathname === to
          ? "text-white bg-[#fea5a5]"
          : "text-black"
      }`}
    >
      <span className={isExpanded ? "hidden" : "block"}>{icon}</span>
      
      <span className={!isExpanded ? "hidden" : "block"}>{label}</span>
    </Link>
  );

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
        (isExpanded ? " px-10" : " px-6") + "xs:text-xs "
      }
    >
      <div
        onClick={toggleNavbar}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#f96363] flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>
      <div className="flex flex-col space-y-8 ">
        <div className="nav-links w-full xs:text-xs lg:text-lg">
          <NavLink to="/home" icon={<LayoutDashboard className="navbar-icon"/>} label="Dashboard" />
        </div>
        <div className="nav-links w-full xs:text-xs lg:text-lg">
          <NavLink
            to="/home/userslist"
            icon={<Banknote className="navbar-icon" />}
            label="Send Money"
          />
        </div>
        <div className="nav-links w-full xs:text-xs lg:text-lg">
          <NavLink
            to="/home/transactions"
            icon={<ArrowLeftRightIcon className="navbar-icon" />}
            label="Transactions"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
