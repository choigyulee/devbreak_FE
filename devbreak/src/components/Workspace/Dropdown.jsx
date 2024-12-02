import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { BsCaretDownFill } from "react-icons/bs";

const Dropdown = ({ selectedValue, items, setSelectedValue, disabled }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = (e) => {
    if (disabled) return;
    e.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  const handleItemClick = (e, item) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setSelectedValue(item.html_url);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownVisible(false);
    };

    if (isDropdownVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const getDisplayValue = (item) => {
    if (typeof item === "object" && item !== null) {
      return item.html_url || "Select a repository";
    }
    return item || "Select a repository";
  };

  return (
    <DropdownContainer>
      <Button type="button" onClick={toggleDropdown} disabled={disabled} >
        <ButtonText>{getDisplayValue(selectedValue)}</ButtonText>
        <BsCaretDownFill size={20} />
      </Button>

      {isDropdownVisible && !disabled && (
        <DropdownMenu>
          {items.map((item, index) => (
            <DropdownItem key={index} onClick={(e) => handleItemClick(e, item)} disabled={disabled}>
              {getDisplayValue(item.html_url)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

// PropTypes 정의
Dropdown.propTypes = {
  selectedValue: PropTypes.oneOfType([
    PropTypes.string, // 단순 문자열일 경우
    PropTypes.shape({
      // 객체로 전달될 경우
      html_url: PropTypes.string.isRequired,
    }),
  ]), // 선택된 값
  items: PropTypes.arrayOf(
    PropTypes.shape({
      html_url: PropTypes.string.isRequired, // 배열의 각 아이템은 html_url 속성을 가져야 함
    })
  ).isRequired, // 드롭다운의 항목들
  setSelectedValue: PropTypes.func.isRequired, // 선택된 값 설정 함수
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
