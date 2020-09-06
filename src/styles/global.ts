import { css } from '@emotion/core';

const globals = css`
  html, body {
    font-size: 15px;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    /* 下に行ったときにバウンドしないようにする */
    overscroll-behavior: none; 
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  *:focus {
    outline: none;
  }
`;

export default globals;
