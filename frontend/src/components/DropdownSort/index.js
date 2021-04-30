import React, { useEffect, useRef, useState } from "react";
import { Label, Form, Radio } from "semantic-ui-react";

import "./index.css";

const DropdownSort = ({ label, components, clickFunction }) => {

  var renderedItemList = [];

  for (var i = 0; i < components; i++) {
        renderedItemList.push(<Label> 
        <input type="radio" value={label} onClick={clickFunction} name="filter" />{'   '}
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

export default DropdownSort;
