import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const FilterButton = ({ handleStatusChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="pr-0" nav onClick={toggleDropdown}>
        <span className="btn btn-default">Filtrar por Status</span>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={() => handleStatusChange(null)}>Todos</DropdownItem>
        <DropdownItem onClick={() => handleStatusChange(0)}>Aguardando</DropdownItem>
        <DropdownItem onClick={() => handleStatusChange(1)}>Analisando</DropdownItem>
        <DropdownItem onClick={() => handleStatusChange(2)}>Finalizado</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default FilterButton;