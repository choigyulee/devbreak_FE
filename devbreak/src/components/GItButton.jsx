import React, { useState } from 'react';
import styled from "@emotion/styled";
import { BsCaretDownFill } from 'react-icons/bs';

const GitButton = ({ label, selectedValue, items, setSelectedValue }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 드롭다운 메뉴 보이기/숨기기 상태

  // 드롭다운 메뉴 클릭 시 보이기/숨기기 토글
  const toggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
  };

  return (
    <GitDiv>
      <GitLabel>{label}</GitLabel>
      <Button onClick={toggleDropdown}>
        <ButtonText>{selectedValue}</ButtonText>
        <BsCaretDownFill size={20} />
      </Button>
      
      {/* 드롭다운 메뉴가 표시되는 경우 */}
      {isDropdownVisible && (
        <Dropdown>
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                setSelectedValue(item.title || item.commit.message);
                setIsDropdownVisible(false); // 선택 시 드롭다운 닫기
              }}
            >
              {item.title || item.commit.message}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </GitDiv>
  );
};

const GitDiv = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 5px;
  align-items: center;
  margin-top: 10px;
`;

const GitLabel = styled.label`
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
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

const Dropdown = styled.div`
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  width: 100%;
  position: absolute;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default GitButton;
