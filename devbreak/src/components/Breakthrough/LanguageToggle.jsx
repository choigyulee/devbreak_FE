import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { BsCaretDownFill } from "react-icons/bs";

const LanguageToggle = ({ selectedValue, items, setSelectedValue }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  // 항목 선택 처리
  const handleItemClick = (item) => {
    setSelectedValue(item);
    setIsDropdownVisible(false); // 선택 시 드롭다운 닫기
  };

  // 항목 전체 선택

  const handleSelectAll = () => {
    setSelectedValue(""); // 전체 선택 시 필터링 없이 모든 항목을 표시
    setIsDropdownVisible(false); // 드롭다운 닫기
  };

  // 외부 클릭 감지
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

  return (
    <DropdownContainer>
      <Button
        type="button"
        onClick={(e) => e.stopPropagation() || toggleDropdown()}
        selected={!!selectedValue} // selectedValue가 있으면 버튼 스타일 변경
      >
        <ButtonText selected={!!selectedValue}>{selectedValue || "Select Language"}</ButtonText>
        <BsCaretDownFill size={20} />
      </Button>

      {isDropdownVisible && (
        <DropdownMenu>
          <DropdownItem onClick={handleSelectAll}>Select Language</DropdownItem>
          {items.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleItemClick(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

// PropTypes
LanguageToggle.propTypes = {
  selectedValue: PropTypes.string, // 선택된 값은 문자열이어야 함
  items: PropTypes.arrayOf(PropTypes.string).isRequired, // 아이템 배열은 문자열 배열이어야 함
  setSelectedValue: PropTypes.func.isRequired, // 선택 값 업데이트 함수
};

// 기본값 설정
LanguageToggle.defaultProps = {
  selectedValue: "",
  items: [],
};

// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-left: 1vh;
`;

const Button = styled.button`
  width: 20vw;
  border: 1px solid ${({ selected }) => (selected ? "#02f798" : "rgba(255, 255, 255, 0.5)")};
  border-radius: 20vw;
  background-color: rgba(255, 255, 255, 0.05);
  white-space: nowrap; // 줄바꿈 방지
  font-size: 2vh;
  font-weight: 500;
  padding: 1.5vh 2vh;
  color: ${({ selected }) => (selected ? "#02f798" : "rgba(255, 255, 255, 0.5)")};
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 20px;
    margin-right: 0vw;
  }
`;

const ButtonText = styled.span`
  font-size: 2vh;
  color: ${({ selected }) => (selected ? "#02f798" : "rgba(255, 255, 255, 0.5)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  width: 20vw;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: -20vw 5px 5px;
  z-index: 100;
  max-height: 335px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
  }
`;

const DropdownItem = styled.div`
  padding: 2vh 4vh;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 2vh;

  &:hover {
    color: #02f798;
  }
`;

export default LanguageToggle;
