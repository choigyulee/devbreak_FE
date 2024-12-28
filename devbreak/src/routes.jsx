import BlogPage from "./pages/BlogPage";
import BreakthroughPage from "./pages/breakthrough/BreakthroughPage";
import ContentsPage from "./pages/home/ContentsPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import StartPage from "./pages/StartPage";
import MakeBlogPage from "./pages/workspace/MakeBlogPage";
import WorkspacePage from "./pages/workspace/WorkspacePage";
import WritePage from "./pages/workspace/WritePage";
import GithubLogin from "./pages/GithubLogin";
import PrivateRoute from "./PrivateRoute";
import LikedBreakthroughs from "./pages/home/LikedBreakthroughs";
import FollowedBlogs from "./pages/home/FollowedBlogs";
import EditWritePage from "./pages/workspace/EditWritePage";
import EditBlogPage from "./pages/workspace/EditBlogPage";

const routes = [
  {
    path: "/",
    element: <StartPage />,
    name: "01. 시작 페이지",
    requiresAuth: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    name: "02. 로그인 페이지",
    requiresAuth: false,
  },
  {
    path: "/home",
    element: <HomePage />,
    name: "03. 홈 메인 페이지",
    requiresAuth: false,
  },
  {
    path: "/like/breakthrough",
    element: <LikedBreakthroughs />,
    name: "03-1. 내가 좋아요 누른 breakthrough 페이지",
    requiresAuth: false,
  },
  {
    path: "/follow/blog",
    element: <FollowedBlogs />,
    name: "03-2. 내가 팔로우한 blog 페이지",
    requiresAuth: false,
  },
  {
    path: "/breakthrough/:articleId",
    element: <ContentsPage />,
    name: "04. breakthrough 열람 페이지",
    requiresAuth: false,
  },
  {
    path: "/breakthrough",
    element: <BreakthroughPage />,
    name: "05. breakthrough 전체 조회 페이지",
    requiresAuth: false,
  },
  {
    path: "/workspace",
    element: <WorkspacePage />,
    name: "06. 워크스페이스 메인 페이지",
    requiresAuth: true,
  },
  {
    path: "/workspace/makeblog",
    element: <MakeBlogPage />,
    name: "07. 블로그 작성 페이지",
    requiresAuth: true,
  },
  {
    path: "/workspace/myblog/:blog_id",
    element: <BlogPage />,
    name: "08. 내 블로그 열람 페이지",
    requiresAuth: true,
  },
  {
    path: "/blog/:blogId/breakthrough/write",
    element: <WritePage />,
    name: "09. 브레잌스루 작성 페이지",
    requiresAuth: true,
  },
  {
    path: "/breakthrough/:articleId/edit",
    element: <EditWritePage />,
    name: "09-1. 브레잌스루 수정 페이지",
    requiresAuth: true,
  },
  {
    path: "/blog/:blogId",
    element: <BlogPage />,
    name: "10. 블로그 열람 페이지",
    requiresAuth: false,
  },
  {
    path: "/blog/:blogId/edit",
    element: <EditBlogPage />,
    name: "10-1. 블로그 수정 페이지",
    requiresAuth: true,
  },
  {
    path: "/github",
    element: <GithubLogin />,
    name: "11. GitHub 인증 페이지",
    requiresAuth: false,
  },
];

export default routes;
