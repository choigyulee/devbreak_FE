import styled from "@emotion/styled";
import CopywritingBoxItem from "./CopywritingBoxItem";

const CopywritingItem = () => {
  return (
    <ItemBox>
      <CopywritingBoxItem
        title="Tailored for developers!"
        contents="You can create a more developer-friendly technical blog by creating a blog with GitHub repository integration."
        rotate={4} // 회전 각도 설정
      />
      <CopywritingBoxItem
        title="Team PR made easier!"
        contents="You can import development issues and commits into your text to convey your team's development story more intuitively."
        rotate={-4} // 회전 각도 설정
      />
      <CopywritingBoxItem
        title="Team-based Blog operation"
        contents="You can manage your blog with your team members by adding contributors through GitHub repository integration."
        rotate={4} // 회전 각도 설정
      />
    </ItemBox>
  );
};

export default CopywritingItem;

const ItemBox = styled.div`
  display: flex; /* Flexbox를 사용하여 자식 요소를 수평으로 배치 */
  flex-direction: row; /* 가로 방향으로 정렬 */
  align-items: center;
  justify-content: center;
`;
