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
  // Capture a ref to our CDJS editor instance so we can call it later
  const cdjsRef = useRef<RevvitySignals.ChemDrawJS.Editor | null>(null);

  // Track our component state
  const [structureProperties, setStructureProperties] = useState<
    RevvitySignals.ChemDrawJS.StructureProperties[]
  >([]);

  const handleDocumentChange = useCallback(() => {
    (async () => {
      // When the document changes, call the CDJS API to get a list of fragments
      // (structures) in the document. We will then show information about all of these.
      try {
        const { current: editor } = cdjsRef;
        if (editor) {
          const structures = await editor.drawing.getStructureIDs();
          const properties = await editor.drawing.getStructureProperties(
            structures
          );
          setStructureProperties(properties);
        }
      } catch (e) {
        console.error("Error getting structure properties:", e);
      }
    })();
  }, [cdjsRef]);

  const handleReady = useCallback(
    (editor: RevvitySignals.ChemDrawJS.Editor) => {
      cdjsRef.current = editor;

      // Listen for changes to the document
      editor.drawing.onContentChange = handleDocumentChange;
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
        <PropertyCards structures={structureProperties} />
      </Container>
    </Stack>
  );
}

/**
 * Render a list of property cards, one for each fragment
 */
function PropertyCards({
  structures,
}: {
  structures: RevvitySignals.ChemDrawJS.StructureProperties[];
}) {
  return (
    <Row xs={2} md={6} className="g-4">
      {structures.map((structure, index) => {
        return (
          <Col key={index}>
            <PropertyCard cdxml={structure.cdxml!} />
          </Col>
        );
      })}
    </Row>
  );
}
