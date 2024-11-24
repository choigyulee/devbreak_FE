import BlogPage from "./pages/BlogPage";
import BreakthroughPage from "./pages/breakthrough/BreakthroughPage";
import ContentsPage from "./pages/home/ContentsPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SitemapPage from "./pages/SitemapPage";
import StartPage from "./pages/StartPage";
import MakeBlogPage from "./pages/workspace/MakeBlogPage";
import MyBolgPage from "./pages/workspace/MyBolgPage";
import WorkspacePage from "./pages/workspace/WorkspacePage";
import WritePage from "./pages/workspace/WritePage";
import GithubLogin from "./pages/GithubLogin";
// import PrivateRoute from "./PrivateRoute";

const routes = [
  {
    path: "/",
    element: <SitemapPage />,
    name: "00.이동 페이지",
  },
  {
    path: "/start",
    element: <StartPage />,
    name: "01. 시작 페이지",
  },
  {
    path: "/login",
    element: <LoginPage />,
    name: "02. 로그인 페이지",
  },
  {
    path: "/home",
    element: <HomePage />,
    name: "03. 홈 메인 페이지",
  },
  {
    path: "/breakthrough/:articleId",
    element: <ContentsPage />,
    name: "04. breakthrough 열람 페이지",
  },
  {
    path: "/breakthrough",
    element: <BreakthroughPage />,
    name: "05. breakthrough 전체 조회 페이지",
  },
  {
    path: "/workspace",
    element: <WorkspacePage />,
    name: "06.워크스페이스 메인 페이지",
  },
  {
    path: "/workspace/makeblog",
    element: <MakeBlogPage />,
    name: "07. 블로그 작성 페이지",
  },
  {
    path: "/workspace/myblog",
    element: <MyBolgPage />,
    name: "08. 내 블로그 열람 페이지",
  },
  {
    path: "/workspace/myblog/write",
    element: <WritePage />,
    name: "09. 브레잌스루 작성 페이지",
  },
  {
    path: "/blog/:blogId",
    element: <BlogPage />,
    name: "10. 블로그 열람 페이지",
  },
  {
    path: "/github",
    element: <GithubLogin />,
    name: "11. GitHub 인증 페이지",
  },
];

export default routes;
