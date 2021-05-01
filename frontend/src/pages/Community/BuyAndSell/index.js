import React, { useState, useEffect } from "react";
import _ from 'lodash'
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import DropdownFilter from "../../../components/DropdownFilter";
import DropdownSort from "../../../components/DropdownSort";
import TagItem from "../../../components/TagItem";

import PhotoUploader from "../../../components/PhotoUploader";

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

import * as yup from "yup";

import "./index.css";
import { Router } from "react-router-dom";

// TODO user authentication

import ReportContentAction from "../../../components/ReportContentAction";

const stubPosts = [
  {}, {}, {}, {}, {}, {}
];


const BuyAndSell = () => {
  const [openCreateSalePostModal, setOpenCreateSalePostModal] = useState(false);
  const [showDropDownFilter, setShowDropDownFilter] = useState(false);
  const [showDropDownSort, setShowDropDownSort] = useState(false)
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState(null)  
  
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

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
    const posts = await fetch("http://localhost:5000/buysell/community/buyandsell/",
    {
      method: "GET",
      headers: {
          "Content-Type": "text/plain"
      }
  });
    const data = await posts.json();
    var postsList = data;
    setPosts(postsList)
  }, []);

  // Posting Modal
  const handleOpenCreateModal = () => {
    setOpenCreateSalePostModal(true);
  }

  // Fetches posts
  //TODO needs interaction with filtering, run specific queries based on our criteria
  const loadPosts = async(word="") =>
  {
    console.log(word);
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({searchWords: word})
    };
      const posts1 = await fetch("http://localhost:5000/buysell/community/buysell/tag/", requestOptions);
      const data1 = await posts1.json();
      setPosts(data1)
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
      date: new Date(),
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
    fetch("http://localhost:5000/buysell/community/createpost/", requestOptions)
    .then(response => {
      console.log(response.json());
    });

    // Open post modal
    setOpenCreateSalePostModal(false);
    window.location.reload();
  }

  // Create and add tags
  const handleTags = (e) => {
    // Set the new tag
    setTags(e.target.value)

    if (e.target.value.length > 1)
    {
      // When comma entered, add the new tag to the list
      var last = e.target.value[e.target.value.length-1];
      // TODO check if tag already contained
      // TODO check if tag is empty
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

  const [listOfTags, setListOfTags] = useState([]);

  const initialState = {
    loading: false,
    results: [],
    value: '',
  }
 
  const handleSearchChange = async(e) => {

    //console.log(e.target.value);
    setResults([]);

    setSearchValue(e.target.value);

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({searchWords: e.target.value})
    };

    // Post new posting
    const dataset = await fetch("http://localhost:5000/buysell/community/posting/buysell/q/", requestOptions)
    const info = await dataset.json();

    setResults(info);
  }

  const sortPosts = (value, asc) => {
    if (posts != undefined)
    {
      var sorted = [];
      if (value == "Price")
      {
        if (asc)
          sorted = [...posts].sort((first, second) => {return (parseFloat(first.price) > parseFloat(second.price)) ? 1 : -1});
        else
          sorted = [...posts].sort((first, second) => {return (parseFloat(first.price) < parseFloat(second.price)) ? 1 : -1});
      }
      else
      {
        if (asc)
          sorted = [...posts].sort((first, second) => {return (first.title > second.title) ? 1 : -1});
        else
          sorted = [...posts].sort((first, second) => {return (first.title < second.title) ? 1: -1});
      }
      
      setPosts(sorted);
    }
  }

 
  const flipToFilter = () => {
    setShowDropDownFilter(!showDropDownFilter); 
    setShowDropDownSort(false)
  }

  const flipToSort = () => {
    setShowDropDownSort(!showDropDownSort); 
    setShowDropDownFilter(false)
  }

  return (
    <>
      {/* <Navbar> */}
        <Container>
          <ContentContainer>
            <h1>Buy & Sell</h1>
            <p className="centered-text">Got stuff to sell? Looking to strike a deal?</p>
            <Grid columns="3" stackable={false} relaxed>
              <Grid.Column width="4">
                <Button color="purple" onClick={handleOpenCreateModal}>Create Post</Button>
              </Grid.Column>
              <Grid.Column width="8" textAlign="center">
                <Search onSearchChange={handleSearchChange} 
                loading={loading} 
                onResultSelect={
                  (e, data) => {window.location.href = "http://localhost:3000/community/postingbuysell/"+ data.result._id;}
                }
                results={results}
                value={searchValue} 
                className="full-width-search" 
                placeholder="Search posts"/>
              </Grid.Column>
              <Grid.Column textAlign="right" width="4">
                <Button icon="filter" color="purple" onClick={flipToFilter}></Button>
                <Button icon="list" color="purple" onClick={flipToSort}></Button>
                { showDropDownFilter ? 
                <DropdownFilter label={["All", "Selling", "Free", "Books", "Computers"]} clickFunctions={[() => loadPosts("All"), () => loadPosts("Selling"), () => loadPosts("Free"), () => loadPosts("Books"), () => loadPosts("Computers")]}>
                </DropdownFilter> : null }
                
                { showDropDownSort ? 
                <DropdownSort label={["Price Ascending", "Price Descending", "Alphabetical", "Reverse Alphabetical"]} clickFunctions={[() => sortPosts("Price", true), () => sortPosts("Price", false), () => sortPosts("Alpha", true), () => sortPosts("Alpha", false),]}>
                </DropdownSort> : null }
              </Grid.Column>

            </Grid>
            <Divider></Divider>
            <Card.Group centered stackable>
              {posts.length === 0 && <p>No posts to show...</p>} 
              { posts[0] && posts.map((post, id) =>
                <Card raised onClick={() => {window.location.href = "http://localhost:3000/community/postingbuysell/" + post._id}}>
                  <Image size="medium" src="https://react.semantic-ui.com/images/wireframe/image.png" />
                  <Card.Content>
                    <Card.Header>{post._id} { post.title } - {post.price}</Card.Header>
                    <Card.Meta>{post.date}</Card.Meta>
                    <Card.Description>
                      {post.description != undefined && post.description}
                    </Card.Description>
                    <Card.Meta id="post-tag-list">
                    {post.tags != undefined && post.tags.split(",").map((tag, id) =>
                      {
                        // Show 5 tags
                          if (id > 5)
                            return "";
                          return <a>#{tag.trim()}</a>
                      })}
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
      {/* </Navbar> */}
    </>
  );
}

export default BuyAndSell;