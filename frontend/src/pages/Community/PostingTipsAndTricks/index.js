import React, { useState, useEffect } from "react";
import { Component } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CommentFeed from "../../../components/CommentFeedTipsAndTricks";
import ContentContainer from "../../../components/ContentContainer";
import DropdownSort from "../../../components/DropdownFilter";

import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Search,
  Image,
  Icon,
  Modal,
  Form,
  Input,
  TextArea,
  Radio,
  Label,
  List,
  Segment,
} from "semantic-ui-react";

import "./index.css";
import PhotoUploader from "../../../components/PhotoUploader";
import { Router, useParams } from "react-router-dom";
import TagItem from "../../../components/TagItem";

// TODO user authentication

const post = null;

const BuyAndSell = () => {
  const [openCreateSalePostModal, setOpenCreateSalePostModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [post, setPost] = useState(null);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [userReplyingTo, setUserReplyingTo] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  // Get the passed in id
  const { id } = useParams();

  // Function to add comment to the post (subcomment, comment)
  const postComment = (id) => {
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
    if (replyingTo != "") {
      // If subcomment then set replyingTo
      commentPost.replyingTo = replyingTo;

      // Loop through to find the comment we are replying to
      for (var i = 0; i < commentList.length; i++) {
        if (commentList[i]._id == commentPost.replyingTo) {
          // If there is no subcomment then make one and push on the new subcomment
          if (commentList[i].subcomments == undefined) {
            commentList[i].subcomments = [];
            commentList[i].subcomments.push(commentPost);
          } else {
            commentList[i].subcomments.push(commentPost);
          }
          break;
        }
      }
      // Set the new comment array
      newComments = commentList;
    } else {
      // Add the new top level comment
      newComments = [...commentList, commentPost];
    }

    // Set the request options for the api
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentPost),
    };

    // Post the comment
    fetch(
      "http://localhost:5000/tipsandtricks/community/posting/comment/" + id,
      requestOptions
    ).then((response) => {
      //console.log(response.json());
    });

    // Not sure about this part

    // Set comment to blank and renew the comment and user settings then refetch all comments
    setComment("");
    setCommentList(newComments);
    setReplyingTo("");
    setUserReplyingTo("");
    refetch();
  };

  // Get all the comments again
  const refetch = async () => {
    window.location.reload();
  };

  // Runs initially to get all the comments, works similar to refetch
  useEffect(async () => {
    // Get the post with all info and comments
    const post = await fetch(
      "http://localhost:5000/tipsandtricks/community/posting/tipsandtricks/" +
        id,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );

    // Wait for data
    const data = await post.json();
    var thePost = data[0];

    // Set the new information
    setPost(thePost);
    setTitle(thePost.title);
    setDescription(thePost.description);
    setPrice(thePost.price);
    setCommentList(thePost.comments);
  }, []);

  const handleOpenCreateModal = () => {
    setOpenCreateSalePostModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: data validation
    // TODO: create post and save to DB
    // TODO: update post list
    setOpenCreateSalePostModal(false);
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const showThis = (theId, user) => {
    setReplyingTo(theId);
    setUserReplyingTo(user);
  };

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <Divider></Divider>
          {post != undefined && (
            <>
              <Image
                size="large"
                centered
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />
              <h1>{title}</h1>
              <p>{post.date}</p>
              <Card.Description>{description}</Card.Description>
              <Card.Meta id="post-tag-list">
                {post.tags != undefined &&
                  post.tags.split(",").map((tag) => {
                    return <a>#{tag.trim()}</a>;
                  })}
              </Card.Meta>
              <Card.Content extra>
                <Grid columns="2">
                  <Grid.Column>
                    <Icon name="" />
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <Button onClick={alert} color="purple">
                      Contact
                    </Button>
                  </Grid.Column>
                </Grid>
              </Card.Content>
              <Divider></Divider>
              <h2>Comments</h2>
              {commentList != undefined && commentList.length > 0 && (
                // Pass in the comment list, postID, and the refetch function
                <CommentFeed
                  comments={commentList}
                  postId={id}
                  refetch={refetch}
                ></CommentFeed>
              )}
              {commentList == undefined && (
                <CommentFeed
                  comments={[]}
                  postId={id}
                  refetch={refetch}
                ></CommentFeed>
              )}
            </>
          )}
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};
export default BuyAndSell;
