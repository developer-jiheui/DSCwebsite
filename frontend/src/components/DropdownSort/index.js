import React, { useEffect, useRef, useState } from "react";
import { Label, Form, Radio } from "semantic-ui-react";

import "./index.css";

// Functional component for dropdown for sorting with context defined sorting
const DropdownSort = ({ label, clickFunctions }) => {
  // Items to add to the sorting dropdown
  var renderedItemList = [];

  for (var i = 0; i < label.length; i++) {
    renderedItemList.push(
      <Label>
        <input
          type="radio"
          value={label[i]}
          onClick={clickFunctions[i]}
          name="filter"
        />
        {"   "}
        {Object.values(label)[i]}
      </Label>
    );
  }

  return (
    <>
      <Form>
        <br />
        <h5>Sort by:</h5>
        <div>{renderedItemList}</div>
      </Form>
    </>
  );
};

export default DropdownSort;
