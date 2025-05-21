//
// ChemDrawEditor.tsx
//
// Copyright © 2023 Revvity Signals Software, Inc. All rights reserved.
//

// Reference the CDJS types but don't import the module
/// <reference types="@revvity-signals/chemdraw-js" />

import React, { useRef, useState } from "react";
import { useEffectOnce } from "react-use";

import license from "../../../dependencies/chemdraw-js-license.xml";
import { cdwsURL } from "../config";

import "./ChemDrawEditor.css";

export interface ChemDrawEditorProps {
  /**
   * Called when the API object is ready
   */
  onReady?: (cdjs: RevvitySignals.ChemDrawJS.Editor) => void;
}

/**
 * A component that wraps CDJS, handling the lifetime correctly
 */
export function ChemDrawEditor({ onReady }: ChemDrawEditorProps): JSX.Element {
  const cdjsContainerRef = useRef<HTMLDivElement | null>(null);
  const [cdjs, setCDJS] = useState<RevvitySignals.ChemDrawJS.Editor | null>(
    null
  );

  // Integrating React and CDJS is a little bit complex because of the async nature of
  // CDJS initialization. We use an effect hook to attach CDJS to our div, returning a
  // cleanup function that disposes our CDJS instance. We also have to handle the
  // cleanup function being called before CDJS has initialized, in this case we set a flag
  // and dispose CDJS in the attach callback.
  useEffectOnce(() => {
    let shouldDetachOnAttach = false;

    RevvitySignals.ChemDrawJS.attach({
      license,
      chemistryServiceURL: cdwsURL,
      editor: {
        element: cdjsContainerRef.current!,
      },
    }).then(({ editor }) => {
      if (shouldDetachOnAttach) {
        // Our cleanup function was called while CDJS was initializing, just dispose the attached
        // instance.
        editor.detach();
      } else {
        onReady?.(editor);
        setCDJS(editor);
      }
    });

    return () => {
      if (cdjs) {
        cdjs.detach();
        setCDJS(null);
      } else {
        // Our instance isn't ready yet, set the flag to detach it when attach completes
        shouldDetachOnAttach = true;
      }
    };
  });

  return (
    <div className="chemdraw-editor border-bottom" ref={cdjsContainerRef} />
  );
}
