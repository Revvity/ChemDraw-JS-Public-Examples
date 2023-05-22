//
// index.tsx
//
// Copyright © 2023 PerkinElmer, Inc. All rights reserved.
//

import React from "react";
import ReactDOM from "react-dom/client";

import { ChemDrawEditor } from "./ChemDrawEditor";

import "./index.css";

function Root() {
  return (
    <div className="Root">
      <h1>webpack-typescript-react-demo</h1>
      <ChemDrawEditor />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
