import { css } from "@emotion/react";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
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
    border: 0;
    font-size: 1vw;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Pretendard", "Urbanist", sans-serif;
    background-color: #181c22;
    overflow-y: hidden; /* 수직 스크롤 가능 */
    overflow-x: hidden; /* 수평 스크롤은 숨김 */
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
