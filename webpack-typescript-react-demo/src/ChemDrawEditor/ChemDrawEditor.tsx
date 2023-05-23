//
// ChemDrawEditor.tsx
//
// Copyright © 2023 PerkinElmer, Inc. All rights reserved.
//

// Reference the CDJS types but don't import the module
/// <reference types="@pki-chemistry/chemdraw-js" />

import React, { useRef, useState } from "react";
import { useEffectOnce } from "react-use";

import license from "../../../dependencies/chemdraw-js-license.xml";
import { cdwsURL } from "../config";

import toolbarTools from "./ToolbarTools";
import "./ChemDrawEditor.css";

export interface ChemDrawEditorProps {
  /**
   * Called when the API object is ready
   */
  onReady?: (cdjs: perkinelmer.ChemDrawDirect) => void;
}

export function ChemDrawEditor({ onReady }: ChemDrawEditorProps): JSX.Element {
  const cdjsContainerRef = useRef<HTMLDivElement | null>(null);
  const [cdjs, setCDJS] = useState<perkinelmer.ChemDrawDirect | null>(null);

  // Integrating React and CDJS is a little bit complex because of the async nature of
  // CDJS initialisation. We use an effect hook to attach CDJS to our div, returning a
  // cleanup function that disposes our CDJS instance. We also have to handle the
  // cleanup function being called before CDJS has initialised, in this case we set a flag
  // and dispose CDJS in the attach callback.
  useEffectOnce(() => {
    let disposeOnAttach = false;

    perkinelmer.ChemdrawWebManager.attach({
      config,
      element: cdjsContainerRef.current!,
      license,
      callback: (attachedCDJS: perkinelmer.ChemDrawDirect) => {
        if (disposeOnAttach) {
          // Our cleanup function was called while CDJS was initialising, just dispose the attached
          // instance.
          (attachedCDJS as any).dispose();
        } else {
          // Save the attached instance
          setCDJS(attachedCDJS);

          // Invoke the ready callback
          onReady?.(attachedCDJS);
        }
      },
    });

    return () => {
      if (cdjs) {
        (cdjs as any).dispose();
        setCDJS(null);
      } else {
        // Our instance isn't ready yet, set the flag to dispose it when attach completes
        disposeOnAttach = true;
      }
    };
  });

  return (
    <div className="chemdraw-editor border-bottom" ref={cdjsContainerRef} />
  );
}

const config: perkinelmer.Configuration = {
  layout: {
    orientation: "horizontal",
    tools: [{ order: toolbarTools }],
  },
  features: {
    enabled: ["WebService"],
    disabled: [],
  },
  properties: {
    chemService: cdwsURL,
  },
};
