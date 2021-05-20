import React, { useEffect, useRef, useState } from "react";
import { Label, Form, Radio } from "semantic-ui-react";

import "./index.css";

// Component for dropdown with context defined filter function
const DropdownFilter = ({ label, clickFunctions }) => {

  // List of all items to be added to the dropdown filter
  var renderedItemList = [];

  // Loops through setting the filter function for each button
  for (var i = 0; i < label.length; i++) {
        renderedItemList.push(<Label> 
        <input type="radio" value={label[i]} onClick={clickFunctions[i]} name="filter" />{'   '}
        { Object.values(label)[i] }</Label>)
  }

  return (
    <>
        <Form>
            <br/>
            <h5>Filter by:</h5>
            <div>
            {renderedItemList}
            </div>
        </Form>
    </>
  );
};

export default DropdownFilter;
