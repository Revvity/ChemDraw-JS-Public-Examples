//
// ChemDrawEditor.tsx
//
// Copyright © 2023 PerkinElmer, Inc. All rights reserved.
//

// Reference the CDJS types but don't import the module
/// <reference types="@pki-chemistry/chemdraw-js" />

import React, { useEffect, useRef } from "react";

import license from "../../dependencies/chemdraw-js-license.xml";

import toolbarTools from "./ToolbarTools";

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
    // We expect CDWS to be running locally on port 8080. Change this if that is not the case.
    chemService: "http://localhost:8080/1.0",
  },
};

export const ChemDrawEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useCDJS(containerRef);

  return <div className="ChemDrawEditor" ref={containerRef} />;
};

/**
 * Hook to attach CDJS
 *
 * @param containerRef ref to the container div
 */
function useCDJS(containerRef: React.RefObject<HTMLDivElement>) {
  const element = containerRef.current;
  const chemDrawAPI = useRef<perkinelmer.ChemDrawDirect | null>(null);

  useEffect(() => {
    (async () => {
      chemDrawAPI.current = await attachCDJS(containerRef.current!);
    })();
  }, [element]);

  return chemDrawAPI.current;
}

/**
 * Promisify the CDJS attach() function
 *
 * @param element DOM element to attach to
 * @returns The api instance for the attached editor
 */
function attachCDJS(element: HTMLElement): Promise<perkinelmer.ChemDrawDirect> {
  return new Promise((resolve, reject) => {
    if (window.perkinelmer === undefined) {
      reject(new Error("chemdraw-js is not loaded"));
    }

    perkinelmer.ChemdrawWebManager.attach({
      element,
      config,
      license,
      callback: resolve,
      errorCallback: reject,
    });
  });
}
