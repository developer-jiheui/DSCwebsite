import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Button
  } from "semantic-ui-react";
import "./index.css";

const Comment = ({commentContent, replyToThis, theId}) => {

  return (
    <>
        <div key={theId}>
            <p>
              <strong>{commentContent.user} {commentContent.date + "      "}</strong>
              <button onClick={replyToThis}><i className='reply icon'></i></button>
              <br/> 
              { " " + commentContent.commentText} 
            </p>
            <div className="padded">
                {commentContent.subcomments != undefined && commentContent.subcomments.map((subcomment, id) => 
                    <div>
                        <p><strong>{subcomment.user + " " + subcomment.date}</strong><br/>{subcomment.commentText}</p>
                        <br/>
                    </div>
                )}
            </div>
        </div>
    </>
  );
};

export default Comment;