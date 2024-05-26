'use strict'

import React from "react";
import { LoadingImage, Main } from "../styles/Loading";

export default function Loading(): React.ReactElement {
  return (
    <Main>
      <LoadingImage src="/logo-bankme.png" alt="Loading" />
      <h1>Loading...</h1>
    </Main>
  );
}