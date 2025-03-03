import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavbarItems/NavBar";
import Pagination from "../../components/Breakthrough/Pagination";
import { Cookies } from 'react-cookie';
import Footer from "../../components/Footer";
import getNotice from "../../APIs/get/getNotice";
import NotificationList from "../../components/NavbarItems/NotificaitonList";

function NotificationPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState([]); // 전체 데이터
  const [currentPage, setCurrentPage] = useState(1); // 상태로 현재 페이지 관리

  const itemsPerPage = 15; // 1페이지당 아이템 수

  const cookies = new Cookies();

  useEffect(() => {
    const loggedIn = cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

  }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getNotice();
            setFormData(data);
          } catch (error) {
            console.error("데이터 로딩 실패:", error);
          }
        };
  
      fetchData();
    }, []);

    const handleNotificationClick = (notice) => {
      switch (notice.type) {
        case "블로그 초대":
        case "블로그 즐겨찾기":
          // 블로그 페이지로 이동 (blogId 사용)
          navigate(`/blog/${notice.relatedId.blogId}`);
          break;
        case "글 좋아요":
          // 글 페이지로 이동 (articleId 사용)
          navigate(`/breakthrough/${notice.relatedId.articleId}`);
          break;
        default:
          console.log("Notification clicked, but no specific page for this type.");
          break;
      }
    };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <Title>List of all your notifications</Title>
          <NotificationList
            notifications={formData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemClick={handleNotificationClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(formData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </BreakthroughContainer>
      </Container>
      <Footer />
    </>
  );
}

export default NotificationPage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreakthroughContainer = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: baseline;
  flex-grow: 1;
  margin: 0vh 24vw 10vh 24vw;
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 3vh;
  margin-bottom: 3vh;
`;
