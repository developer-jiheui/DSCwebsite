import React, { useState } from "react";
import { Comment, Form, Icon, Button, CommentGroup } from "semantic-ui-react";

import "./index.css";

const defaultProfilePicURL =
  "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=";

// TODO user authentication
// Functional component for a reply with comments
const CommentWithReplies = ({
  data,
  key,
  postIdComment,
  postFunction,
  refetch,
  top,
}) => {
  // Appends the replies for the comment
  const replies = (data.subcomments || []).map((reply, id) => {
    return (
      <CommentGroup>
        <CommentWithReplies key={id} data={reply} top={false} />
      </CommentGroup>
    );
  });

  // Variable for whether or not the comment is empty
  const [emptyComment, setEmptyComment] = useState(false);
  // Variable for holding the comment text
  const [comment, setComment] = useState("");
  // Variable to show or hide the reply feature
  const [show, setShow] = useState(false);

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (comment === "") {
  //         setEmptyComment(true);
  //     } else {
  //         setComment("");
  //         setEmptyComment(false);
  //     }
  // };

  // Returns the comment with replies layout, with show and hide feature
  return (
    <Comment key={key}>
      <Comment.Avatar src={defaultProfilePicURL} />
      <Comment.Content>
        <Comment.Author as="span">
          {data.isAdmin && <Icon name="chess queen" />}
          {data.user}
        </Comment.Author>
        <Comment.Metadata>
          <span>{data.date}</span>
        </Comment.Metadata>
        <Comment.Text>{data.commentText}</Comment.Text>
        <Comment.Actions>
          {/* When clicked show the reply box for the comment */}
          {top && (
            <Comment.Action onClick={() => setShow(!show)}>
              Reply
            </Comment.Action>
          )}
          <Comment.Action>
            0 <Icon name="thumbs up outline" />
          </Comment.Action>
          <Comment.Action>
            Report <Icon name="flag outline" />
          </Comment.Action>
        </Comment.Actions>
        {show && (
          <Form
            reply
            onSubmit={(e) => {
              //handleSubmit(e);
            }}
          >
            <Form.TextArea
              placeholder="What do you think?"
              error={emptyComment}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setEmptyComment(comment.length <= 0);
              }}
            />
            <Button
              onClick={() => {
                postFunction(data._id, comment);
                refetch();
              }}
              content="Comment"
              labelPosition="left"
              icon="edit"
              color="purple"
            />
          </Form>
        )}
      </Comment.Content>
      {replies}
    </Comment>
  );
};

// Functional component for the main comment feed for tips and tricks
const CommentFeed = ({ comments, postId, refetch }) => {
  // Variable for holding whether or not a comment is empty
  const [emptyComment, setEmptyComment] = useState(false);
  // Variable for holding the text of a comment
  const [comment, setComment] = useState("");

  // Function for posting a new comment
  const postComment = () => {
    if (comment != "") {
      // Create the comment Object
      var commentPost = {
        // INSERT USER HERE
        user: "USER",
        date: new Date().toString(),
        commentText: comment,
      };

      // Set new comment list to null
      var newComments = null;
      // Add the new top level comment
      newComments = [...comments, commentPost];

      // Set the request options for the api
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentPost),
      };

      // Post the comment
      fetch(
        "http://localhost:5000/tipsandtricks/community/posting/tipsandtricks/comment/" +
          postId,
        requestOptions
      ).then((response) => {
        //console.log(response.json());
      });

      // Not sure about this part
      // Set comment to blank and renew the comment and user settings then refetch all comments
      setComment("");
      comments = newComments;
    }
  };

  // Function to add comment to the post (subcomment, comment)

  const postCommentSub = (id, comment) => {
    if (comment != "") {
      // Comment Object
      var commentPost = {
        // INSERT USER HERE
        user: "USER",
        date: new Date().toString(),
        commentText: comment,
      };

      // Set new comment list to null
      var newComments = null;

      // See if this is a subcomment or not
      // If subcomment then set replyingTo
      commentPost.replyingTo = id;

      // Loop through to find the comment we are replying to
      for (var i = 0; i < comments.length; i++) {
        if (comments[i]._id == commentPost.replyingTo) {
          // If there is no subcomment then make one and push on the new subcomment
          if (comments[i].subcomments == undefined) {
            comments[i].subcomments = [];
            comments[i].subcomments.push(commentPost);
          } else {
            comments[i].subcomments.push(commentPost);
          }
          break;
        }
      }
      // Set the new comment array
      newComments = comments;

      // Set the request options for the api
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentPost),
      };

      // Post the comment
      fetch(
        "http://localhost:5000/tipsandtricks/community/posting/tipsandtricks/comment/" +
          postId,
        requestOptions
      ).then((response) => {
        //console.log(response.json());
      });

      // Not sure about this part

      // Set comment to blank and renew the comment and user settings then refetch all comments
      setComment("");
      comments = newComments;
    }
  };

  return (
    <>
      <Comment.Group>
        {/* Map in all the comments */}
        {comments.map((c, id) => (
          <CommentWithReplies
            top={true}
            threaded
            data={c}
            key={id}
            postIdComment={postId}
            postFunction={postCommentSub}
            refetch={refetch}
          />
        ))}
      </Comment.Group>
      {/* // Create the form for top level comment */}
      <br />
      <Form
        reply
        onSubmit={(e) => {
          // handleSubmit(e);
        }}
      >
        <Form.TextArea
          placeholder="What do you think?"
          error={emptyComment}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setEmptyComment(comment.length <= 0);
          }}
        />
        <Button
          // Post the comment and refresh the page
          onClick={() => {
            postComment();
            refetch();
          }}
          content="Comment"
          labelPosition="left"
          icon="edit"
          color="purple"
        />
      </Form>
    </>
  );
};

export default CommentFeed;
