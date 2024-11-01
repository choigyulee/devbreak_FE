import { css } from "@emotion/react";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* 박스 모델 설정 */
  }

  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
    color: inherit;
  }

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  form,
  label,
  table {
    margin: 0;
    padding: 0;
    font-size: 1vw;
  }

  body {
    margin: 0;
    padding: 3vw 15vw;
    font-family: "Pretendard", "Urbanist", sans-serif; /* 기본 폰트 설정 */
    background-color: #181c22;
    overflow-y: auto;
    overflow-x: auto;
  }

  ol,
  ul {
    list-style: none;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  /* Firefox */
  html {
    scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  }

  /* Chrome, Safari, Edge, Opera */
  html::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

export default globalStyles;
