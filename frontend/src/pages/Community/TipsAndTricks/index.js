import React, { useState, useEffect } from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import {
  Container,
  Grid,
  Button,
  Card,
  Modal,
  Form,
  Input,
  TextArea,
  Search,
  Divider
} from "semantic-ui-react";

import "./index.css";
import * as yup from "yup";
import TagItem from "../../../components/TagItem";
import DropdownFilter from "../../../components/DropdownFilter";

const stubPosts = [
  {}, {}, {}, {}, {}, {}
];

const TipsAndTricks = () => {
  const [openCreateTipPostModal, setOpenCreateTipPostModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false)
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tag, setTag] = useState("");
  const [listOfTags, setListOfTags] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // YUP validation
  let schemaForInput = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    tags: yup.string().required()
  });

  // Runs on load and gets all posts
  useEffect(async () => {
    const posts = await fetch("http://localhost:5000/tipsandtricks/community/tipsandtricks/",
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

  // Fetches posts
  //TODO needs interaction with filtering, run specific queries based on our criteria
  const loadPosts = async () =>
  {
      const posts1 = await fetch("http://localhost:5000/tipsandtricks/community/tipsandtricks/",
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
      description: description,
      tags: tagsList,
    })
    .then(function(valid){
      // alert(valid);
    });

    // NEED TO ADD USER AND DATE
    // Create the post object
    var posting = {
      title: title,
      description: description,
      date: new Date(),
      tags: tagsList,
    }

    // Set the request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(posting)
    };

    // Post new posting
    fetch("http://localhost:5000/tipsandtricks/community/createpost/", requestOptions)
    .then(response => {
      //console.log(response.json());
    });

    // Open post modal
    setOpenCreateTipPostModal(false);
    window.location.reload();
  }

  // Create and add tags
  const handleTags = (e) => {
    // Set the new tag
    setTag(e.target.value)

    if (e.target.value.length > 0)
    {
      // When comma entered, add the new tag to the list
      var last = e.target.value[e.target.value.length-1];
      // TODO check if tag already contained
      // TODO check if tag is empty
      if (last == ",")
      {
          listOfTags.push(e.target.value.slice(0,-1))
          setListOfTags(listOfTags)
          setTag("")
      }
    }
  }

  // Remove the tag when clicked from list and interface
  const removeMe = (e, index) => {
    listOfTags.splice(index,1)
    const theTags = listOfTags.slice();
    setListOfTags(theTags)
  }

  const handleOpenCreateModal = () => {
    setOpenCreateTipPostModal(true);
  }

  const toggleDropDown = () => {setShowDropDown(!showDropDown);}


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
        const dataset = await fetch("http://localhost:5000/tipsandtricks/community/posting/tipsandtricks/q/", requestOptions)
        const info = await dataset.json();
    
        setResults(info);
      }

  return (
    <>
      <Navbar>
        <Container>
          <ContentContainer>
            <h1>Tips & Tricks For Success</h1>
            <p className="centered-text">Need some advice? Ask a question to your fellow members, or browse some of the common Q&As</p>
            <Grid columns="3" stackable={false} relaxed>
              <Grid.Column width="4">
                <Button color="purple" onClick={handleOpenCreateModal}>Create Post</Button>
              </Grid.Column>
              <Grid.Column width="8" textAlign="center">
              <Search onSearchChange={handleSearchChange} 
                                loading={loading} 
                                onResultSelect={
                                (e, data) => {window.location.href = "http://localhost:3000/community/postingtipsandtricks/"+ data.result._id;}
                                }
                                results={results}
                                value={searchValue} 
                                className="full-width-search" 
                                placeholder="Search posts"/>                </Grid.Column>
              <Grid.Column textAlign="right" width="4">
                <Button icon="filter" color="purple" onClick={toggleDropDown}></Button>
                <Button icon="list" color="purple"></Button>
                { showDropDown ? 
                <DropdownFilter label={["Looking For", "Selling", "Computer Equipment", "Books", "Free"]} components={5} clickFunction={loadPosts}>
                </DropdownFilter> : null }
              </Grid.Column>
            </Grid>
            <Divider />
            <Card.Group centered itemsPerRow="1">
              {posts != undefined && posts.length === 0 && <p>No posts to show...</p>}
              {posts != undefined && posts.map((post, id) =>
                <Card raised onClick={() => {window.location.href="http://localhost:3000/community/tipsandtricks/" + post._id}}>
                  <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Meta>{post.date}</Card.Meta>
                    <Card.Description>
                      {post.description.slice(0,197) + " ..." + console.log(post)}
                    </Card.Description>
                    <Card.Meta id="post-tag-list">
                      {post.tags != undefined && post.tags.split(",").map((tag) =>
                      {
                        return <a>#{tag.trim()}</a>
                      })}
                  </Card.Meta>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          </ContentContainer>
        </Container>
        <Modal
          id="create-sale-post-modal"
          onClose={() => setOpenCreateTipPostModal(false)}
          onOpen={() => setOpenCreateTipPostModal(true)}
          open={openCreateTipPostModal}
          size="tiny"
        >
          <Modal.Content>
            <Modal.Description>
              <h1>Create Post</h1>
              <Form>
                <Form.Field
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  control={Input}
                  placeholder="What on your mind?"
                  name="title"
                  label="Title"
                />
                <Form.Field
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  control={TextArea}
                  placeholder="Tell us about it!"
                  name="description"
                  label="Description"
                />
                {listOfTags.map((tag, id) => 
                <TagItem clickFunction={removeMe} id={id} item={tag} style={{display: "block"}}></TagItem>
            )}
                <Form.Field
                  value={tag}
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
              onClick={() => setOpenCreateTipPostModal(false)}
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

export default TipsAndTricks;