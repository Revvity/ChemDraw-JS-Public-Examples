//
// PropertyCard.tsx
//
// Copyright © 2023 PerkinElmer, Inc. All rights reserved.
//

import axios from "axios";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useAsync } from "react-use";

import { cdwsURL } from "../config";

import "./PropertyCard.css";

interface PropertyCardProps {
  cdxml: string;
}

/**
 * A card that shows a preview and chemical information given a CDXML string
 */
export function PropertyCard({ cdxml }: PropertyCardProps) {
  const properties = useAsync(async () => {
    // In a real app we would probably get these properties client-side direct from
    // CDJS. For this demo however we will call CDWS to get them.
    const response = await axios.post(
      "properties?properties=name,smiles,mw,em,inchi",
      cdxml,
      {
        baseURL: cdwsURL,
        headers: {
          "Content-Type": "chemical/x-cdxml",
        },
      }
    );

    return response.data;
  }, [cdxml]);

  const svg = useAsync(async () => {
    // In a real app we would get the SVG as part of the properties call above and
    // extract the multi-part response. To make the demo app simpler we make a second
    // call to CDWS to render the CDXML as SVG.
    const response = await axios.post("render", cdxml, {
      baseURL: cdwsURL,
      headers: {
        "Content-Type": "chemical/x-cdxml",
      },
    });

    return response.data;
  }, [cdxml]);

  return (
    <Card>
      <Card.Header>{properties.value?.name}</Card.Header>
      <Card.Img
        variant="top"
        className="property-card-image"
        src={
          svg.value
            ? `data:image/svg+xml,${encodeURIComponent(svg.value ?? "")}`
            : undefined
        }
      />
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          SMILES: <strong>{properties.value?.smiles}</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          InChI: <strong>{properties.value?.inchi}</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          MW: <strong>{properties.value?.mw?.value} </strong>
          {properties.value?.mw?.units}
        </ListGroup.Item>
        <ListGroup.Item>
          EM: <strong>{properties.value?.em?.value} </strong>
          {properties.value?.em?.units}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
