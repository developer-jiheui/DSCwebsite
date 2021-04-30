import React, { useState, useEffect } from "react";
import { Component } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import DropdownSort from "../../../components/DropdownSort";
import TagItem from "../../../components/TagItem";


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
  validators,
  Label
} from "semantic-ui-react";

import { Formik } from "formik";
import * as yup from "yup";

import "./index.css";
import PhotoUploader from "../../../components/PhotoUploader";
import { Router } from "react-router-dom";

// TEST CODE

// 

const stubPosts = [
  {}, {}, {}, {}, {}, {}
];


const BuyAndSell = () => {
  const [openCreateSalePostModal, setOpenCreateSalePostModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false)
  const [posts, setPosts] = useState([{}, {}, {}, {}, {}, {}])
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState(null)

  const [listOfTags, setListOfTags] = useState([]);

  // YUP validation
  let schemaForInput = yup.object().shape({
    title: yup.string().required(),
    price: yup.number().required(),
    email: yup.string().email().required(),
    description: yup.string().required(),
    tags: yup.string().required()
  });

  // Runs on load and gets all posts
  useEffect(async () => {
    const posts = await fetch("http://localhost:5000/post/community/buyandsell/",
    {
      method: "GET",
      headers: {
          "Content-Type": "text/plain"
      }
  });
    const data = await posts.json();
    var postsList = data;
    console.log(data);
    setPosts(postsList)
  }, []);

  // Posting Modal
  const handleOpenCreateModal = () => {
    setOpenCreateSalePostModal(true);
  }

  // Fetches posts
  const loadPosts = async () =>
  {
      const posts1 = await fetch("http://localhost:5000/post/community/buyandsell/",
      {
        method: "GET",
        headers: {
            "Content-Type": "text/plain"
        }
     });
      const data1 = await posts1.json();
      var postsList1 = data1;
      setPosts(postsList1)
  }

  // Controls what hapens when user submits post info
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: data validation
    // TODO: create post and save to DB
    // TODO: update post list
    
    // Gathers a list of tags together into 1 string
    var tagsList = listOfTags.join(",");

    // Validates input for form
    schemaForInput.isValid({
      title: title,
      email: email,
      description: description,
      tags: tagsList,
      price: price
    })
    .then(function(valid){
      // alert(valid);
    });

    // NEED TO ADD USER AND DATE
    // Create the post object
    var posting = {
      title: title,
      email: email,
      description: description,
      tags: tagsList,
      price: price
    }

    // Set the request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(posting)
    };

    // Post new posting
    fetch("http://localhost:5000/post/community/createpost/", requestOptions)
    .then(response => {
      //console.log(response.json());
    });

    // Open post modal
    setOpenCreateSalePostModal(false);
  }

  // Create and add tags
  const handleTags = (e) => {
    // Set the new tag
    setTags(e.target.value)
    if (e.target.value.length > 0)
    {
      // When comma entered, add the new tag to the list
      var last = e.target.value[e.target.value.length-1];
      if (last == ",")
      {
          listOfTags.push(e.target.value.slice(0,-1))
          setListOfTags(listOfTags)
          setTags("")
      }
    }
  }

  // Remove the tag when clicked from list and interface
  const removeMe = (e, index) => {
    listOfTags.splice(index,1)
    const theTags = listOfTags.slice();
    setListOfTags(theTags)
  }

  // Toggle the sort dropdown
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  return (
    <>
      <Navbar>
        <Container>
          <ContentContainer>
            <h1>Buy & Sell</h1>
            <p className="centered-text">Got stuff to sell? Looking to strike a deal?</p>
            <Grid columns="3" stackable={false} relaxed>
              <Grid.Column width="4">
                <Button color="purple" onClick={handleOpenCreateModal}>Create Post</Button>
              </Grid.Column>
              <Grid.Column width="8" textAlign="center">
                <Search className="full-width-search " placeholder="Search posts"/>
              </Grid.Column>

              <Grid.Column textAlign="right" width="4">
                <Button icon="filter" color="purple" onClick={toggleDropDown}></Button>
                <Button icon="list" color="purple"></Button>
                { showDropDown ? 
                <DropdownSort label={["Looking For", "Selling", "Computer Equipment", "Books", "Free"]} components={5} clickFunction={loadPosts}>
                </DropdownSort> : null }
              </Grid.Column>

            </Grid>
            <Divider></Divider>

            {/* Needs styling */}
            <Card.Group centered stackable>
              {posts.length === 0 && <p>No posts to show...</p>} 
              { posts[0] && posts.map((post, id) =>
              <a href={"http://localhost:3000/community/posting/" + post._id}>
                <Card raised>
                  <Image size="medium" src="https://react.semantic-ui.com/images/wireframe/image.png" />
                  <Card.Content>
                    <Card.Header>{post._id} { post.title } - {post.price}</Card.Header>
                    <Card.Meta>Posted March 2nd, 2021</Card.Meta>
                    <Card.Description>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Card.Description>
                    <Card.Meta id="post-tag-list">
                      <a>#new</a>
                      <a>#loremtag</a>
                      <a>#ipsum</a>
                      <a>#dolor</a>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Grid columns="2">
                      <Grid.Column>
                        <Icon name="point" />
                      Vancouver, BC
                      </Grid.Column>
                      <Grid.Column textAlign="right">
                        <Button color="purple">Contact</Button>
                      </Grid.Column>
                    </Grid>
                  </Card.Content>
                </Card>
                </a>
              )}
            </Card.Group>
            {/* Needs styling */}
            
          </ContentContainer>
        </Container>
        <Modal
          id="create-sale-post-modal"
          onClose={() => setOpenCreateSalePostModal(false)}
          onOpen={() => setOpenCreateSalePostModal(true)}
          open={openCreateSalePostModal}
          size="tiny"
        >
          <Modal.Content>
            <Modal.Description>
              <h1>Create Post</h1>
              <Form>
                <Form.Field>
                  <PhotoUploader />
                </Form.Field>
                <Form.Field
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  control={Input}
                  placeholder="What are you selling?"
                  name="title"
                  label="Title"
                />
                <Form.Field
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  control={Input}
                  placeholder="Name your price!"
                  name="price"
                  label="Price"
                />
                <Form.Field
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  control={Input}
                  placeholder="What's your contact email?"
                  name="email"
                  label="Email"
                  type="email"
                />
                <Form.Field
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  control={TextArea}
                  placeholder="Tell us about it..."
                  name="description"
                  label="Description"                  
                />
                {listOfTags.map((tag, id) => 
                <TagItem clickFunction={removeMe} id={id} item={tag} style={{display: "block"}}></TagItem>
              // <TagItem text={tag}></TagItem>
            )}
                <Form.Field
                  value={tags}
                  onChange={handleTags}
                  control={Input}
                  placeholder="#tag"
                  name="tags"
                  label="Search Tags"
                />
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Cancel"
              onClick={() => setOpenCreateSalePostModal(false)}
            />
            <Button
              content="Post"
              onClick={handleSubmit}
              positive
            />
          </Modal.Actions>
        </Modal>
        <Footer />
      </Navbar>
    </>
  );
}

export default BuyAndSell;