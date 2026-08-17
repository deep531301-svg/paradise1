import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex py-4 px-1 text-gray-500 dark:text-gray-400 text-xs md:text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center hover:text-primary dark:hover:text-gold transition-colors duration-200"
          >
            <FaHome className="mr-1.5 text-sm" />
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <FaChevronRight className="mx-1.5 md:mx-2 text-[10px] text-gray-400" />
              {item.link && !isLast ? (
                <Link
                  to={item.link}
                  className="hover:text-primary dark:hover:text-gold transition-colors duration-200 font-medium max-w-[120px] md:max-w-none truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 dark:text-gray-200 font-semibold max-w-[150px] md:max-w-none truncate">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
