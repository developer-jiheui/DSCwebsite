import React, { useEffect, useState } from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ContentContainer from "../../../components/ContentContainer";
import CommentFeed from "../../../components/CommentFeedBuySell";
import ContentToggler from "../../../components/ContentToggler";
import TagItem from "../../../components/TagItem";
import DropdownFilter from "../../../components/DropdownFilter";
import DropdownSort from "../../../components/DropdownSort";
import ReportContentAction from "../../../components/ReportContentAction";

import {
    Button,
    Card,
    Container,
    Divider,
    Form,
    Grid,
    Input,
    Modal,
    Search,
    TextArea
} from "semantic-ui-react";

import "./index.css";
import * as yup from "yup"

const stubPosts = [{}, {}, {}];

const CareerPage = () => {
    const [openCreateCareerPostModal, setOpenCreateCareerPostModal] = useState(false);
    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [listOfTags, setListOfTags] = useState([]);
    const [tag, setTag] = useState("");
    const [showDropDownFilter, setShowDropDownFilter] = useState(false);
    const [showDropDownSort, setShowDropDownSort] = useState(false);


    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const [link, setLink] = useState("");

    // YUP validation
    let schemaForInput = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
        tags: yup.string().required()
    });


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
      const posts1 = await fetch("http://localhost:5000/career/community/career/tag/", requestOptions);
      const data1 = await posts1.json();
      setPosts(data1)
  }
    
    const createJobPost = (e) =>{
        console.log("createJobPost")
    //TODO: validate
    //TODO: create job post and add to jobs list
    e.preventDefault();

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
      link: link,
      tags: tagsList,
    }

    // Set the request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(posting)
    };

    // Post new posting
    fetch("http://localhost:5000/career/community/createcareerpost/", requestOptions)
    .then(response => {
      console.log(response.json());
    });

    // Open post modal
    setOpenCreateCareerPostModal(false);
    window.location.reload();
    }

    // Runs on load and gets all posts
    useEffect(async () => {
        const posts = await fetch("http://localhost:5000/career/community/career/",
        {
        method: "GET",
        headers: {
            "Content-Type": "text/plain"
        }
    });
        const data = await posts.json();
        var postsList = data;
    //        console.log(data);
        setPosts(postsList)
    }, []);

    // Posting Modal
    const handleOpenCreateModal = () => {
        setOpenCreateCareerPostModal(true);
    }

    // Create and add tags
    const handleTags = (e) => {
        // Set the new tag
        setTag(e.target.value)

        if (e.target.value.trim().length > 1)
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
    const dataset = await fetch("http://localhost:5000/career/community/posting/career/q/", requestOptions)
    const info = await dataset.json();

    setResults(info);
    }

    const flipToFilter = () => {
    setShowDropDownFilter(!showDropDownFilter); 
    setShowDropDownSort(false)
    }

    const flipToSort = () => {
    setShowDropDownSort(!showDropDownSort); 
    setShowDropDownFilter(false)
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
    

    return (
        <>
            {/* <Navbar> */}
                <Container>
                    <ContentContainer>
                        <h1>Launch Your Career</h1>
                        <p className="centered-text">Found a cool job post? Need career advice? This is where that all happens!</p>
                        <Grid columns="4">
                            <Grid.Column width="4">
                                <Button color="purple" onClick={() => setOpenCreateCareerPostModal(true)}>Create Post</Button>
                            </Grid.Column>
                            <Grid.Column width="8">
                            <Search onSearchChange={handleSearchChange} 
                                loading={loading} 
                                onResultSelect={
                                (e, data) => {window.location.href = "http://localhost:3000/community/postingcareer/"+ data.result._id;}
                                }
                                results={results}
                                value={searchValue} 
                                className="full-width-search" 
                                placeholder="Search posts"/>                            </Grid.Column>
                            <Grid.Column textAlign="right" width="4">
                                <Button icon="filter" color="purple" onClick={flipToFilter}></Button>
                                <Button icon="list" color="purple" onClick={flipToSort}></Button>
                                { showDropDownFilter ? 
                                <DropdownFilter label={["All", "Selling", "Free", "Books", "Computers"]} clickFunctions={[() => loadPosts("All"), () => loadPosts("Selling"), () => loadPosts("Free"), () => loadPosts("Books"), () => loadPosts("Computers")]}>
                                </DropdownFilter> : null }
                                
                                { showDropDownSort ? 
                                <DropdownSort label={["Alphabetical", "Reverse Alphabetical"]} clickFunctions={[() => sortPosts("Alpha", true), () => sortPosts("Alpha", false),]}>
                                </DropdownSort> : null }
                            </Grid.Column>
                        </Grid>
                        <Divider></Divider>
                        <Card.Group centered itemsPerRow="1">
                            {posts != undefined && posts.length === 0 && <p>No posts to show...</p>}
                            {posts != undefined && posts.map((post, id) =>
                                <Card raised onClick={() => {window.location.href = "http://localhost:3000/community/postingcareer/" + post._id}}>
                                    <Card.Content>
                                        <Card.Header>{post.title}</Card.Header>
                                        <Card.Meta>{post.date}</Card.Meta>
                                        <Card.Description>
                                            <p>{post.description.slice(0,197) + " ..."}</p>
                                            <a>{post.link != undefined && post.link}</a>
                                            <a>{post.link == undefined && "job.com"}</a>
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
                    id="create-career-post-modal"
                    onClose={() => setOpenCreateCareerPostModal(false)}
                    onOpen={() => setOpenCreateCareerPostModal(true)}
                    size="tiny"
                    open={openCreateCareerPostModal}
                >
                    <Modal.Content>
                        <Modal.Description>
                            <h1>Create Post</h1>
                            <Form>
                                <Form.Field
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    control={Input}
                                    placeholder="What is the job title?"
                                    name="title"
                                    label="Title"
                                />
                                 <Form.Field
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                    control={Input}
                                    placeholder="Is there a link to the job?"
                                    name="link"
                                    label="Link"
                                />
                                <Form.Field
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    control={TextArea}
                                    placeholder="What is the job description"
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
                                    placeholder="#junior#c++"
                                    name="tags"
                                    label="Tags"
                                />                   
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="Cancel"
                            onClick={() => setOpenCreateCareerPostModal(false)}
                        />
                        <Button
                            content="Post"
                            onClick={createJobPost}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
                <Footer />
            {/* </Navbar> */}
        </>
    );                     
}


export default CareerPage;
