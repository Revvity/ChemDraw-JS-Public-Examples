//
// index.tsx
//
// Copyright © 2023 PerkinElmer, Inc. All rights reserved.
//

import React, { FC } from "react";
import ReactDOM from "react-dom";

import { ChemDrawEditor } from "./ChemDrawEditor";

import "./index.css";

const Root: FC = () => {
  return (
    <div className="Root">
      <h1>webpack-typescript-react-demo</h1>
      <ChemDrawEditor />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("root") as HTMLElement);
