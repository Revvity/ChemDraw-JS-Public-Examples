//
// App.tsx
//
// Copyright © 2023 Revvity Signals Software, Inc. All rights reserved.
//

import React, { useCallback, useRef, useState } from "react";
import { Col, Container, Navbar, Row, Stack } from "react-bootstrap";

import { ChemDrawEditor } from "../ChemDrawEditor";
import { PropertyCard } from "../PropertyCard";

/**
 * Our main application component. This renders an editor and some cards that
 * give information about the structures that have been drawn.
 */
export function App(): JSX.Element {
  // Capture a ref to our CDJS instance so we can call it later
  const cdjsRef = useRef<perkinelmer.ChemDrawDirect | null>(null);

  // Track our component state
  const [fragments, setFragments] = useState<perkinelmer.FragmentInfo[]>([]);

  const handleDocumentChange = useCallback(() => {
    (async () => {
      // When the document changes, call the CDJS API to get a list of fragments
      // (structures) in the document. We will then show information about all of these.
      try {
        if (cdjsRef.current) {
          const fragmentsInfo =
            await cdjsRef.current.api2.drawing.getFragmentsInfo();
          setFragments(fragmentsInfo);
        }
      } catch (e) {
        console.error("Error getting document CDXML:", e);
      }
    })();
  }, [cdjsRef]);

  const handleReady = useCallback(
    (newCDJSInstance: perkinelmer.ChemDrawDirect) => {
      cdjsRef.current = newCDJSInstance;

      // Listen for changes to the document
      newCDJSInstance.api2.drawing.onContentChange = handleDocumentChange;
    },
    []
  );

  return (
    <Stack>
      <Navbar>
        <Container fluid>
          <Navbar.Brand>ChemDraw JS Demo</Navbar.Brand>
        </Container>
      </Navbar>

      <ChemDrawEditor onReady={handleReady} />

      <Container fluid className="mt-2">
        <PropertyCards fragments={fragments} />
      </Container>
    </Stack>
  );
}

/**
 * Render a list of property cards, one for each fragment
 */
function PropertyCards({
  fragments,
}: {
  fragments: perkinelmer.FragmentInfo[];
}) {
  return (
    <Row xs={2} md={6} className="g-4">
      {fragments.map((fragment, index) => {
        return (
          <Col key={index}>
            <PropertyCard cdxml={fragment.cdxml} />
          </Col>
        );
      })}
    </Row>
  );
}
