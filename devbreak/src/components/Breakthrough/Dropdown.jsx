import React, { useState } from 'react';
import styled from "@emotion/styled";
import { BsCaretDownFill } from 'react-icons/bs';

const Dropdown = ({ selectedValue, items, setSelectedValue }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
  };

  return (
    <DropdownContainer>
      <Button onClick={toggleDropdown}>
        <ButtonText>{selectedValue}</ButtonText>
        <BsCaretDownFill size={20} />
      </Button>

      {isDropdownVisible && (
        <DropdownMenu>
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                setSelectedValue(item.title);
                setIsDropdownVisible(false);
              }}
            >
              {item.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100%;
  height: 67px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  padding-left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 20px;
    margin-right: 20px;
  }
`;

const ButtonText = styled.span`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 70px;
  width: 100%; 
  background-color: rgba(0, 0, 0, 0.8); 
  border-radius: 5px;
  z-index: 100;
  max-height: 335px; 
  overflow-y: auto;
  padding: 0;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const DropdownItem = styled.div`
  padding: 30px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default Dropdown;
