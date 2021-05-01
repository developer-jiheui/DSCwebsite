import React, { useState, useEffect } from 'react';
import { Button, Modal, Tab, Table, Radio, Form, Search, Input, TextArea, Image } from "semantic-ui-react";
import PhotoUploader from '../../components/PhotoUploader';

const NewsPane = () => {
    const [news, setNews] = useState([]);

    const [openNewsModal, setOpenNewsModal] = useState(false);
    const [newsModalData, setNewsModalData] = useState({});
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    // Fetch all the news to populate our page
    useEffect(() => {
        fetch("http://localhost:5000/posts/news", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
                setNews(data.data);
            });
    }, []);

    // This handles deleting a news item
    // confirms with the user first, if yes, delete, else do nothing
    const handleDeleteNews = (n) => {
        if (window.confirm(`Are you sure you want to delete "${n.title}?"`)) {
            fetch("http://localhost:5000/posts", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    post_type: "News",
                    id: n._id,
                    post_id: n.post_id
                })
            }).then(data => {
                // console.log(data);
                setNews(news.filter(x => x._id !== n._id));
            }).catch(error => {
                // in case there's a terrible error
                // could use some refining
                alert("Oops! Something went wrong :s");
                console.log(error);
            });
        }
    }

    // This will handle saves done from the News Modal
    // Could be either Create or Update
    const handleSaveNews = () => {
        if (validateData()) {
            //update news // an id will be specified
            if (newsModalData._id) {
                fetch("http://localhost:5000/posts/news", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': `${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        id: newsModalData._id,
                        data: newsModalData
                    })
                }).then(response => response.json())
                    .then(data => {
                        // console.log(data);                        
                        let index = news.findIndex(n => n._id === newsModalData._id);
                        news[index] = data.data;
                        setNewsModalData({});
                        setOpenNewsModal(false);
                    }).catch(error => {
                        alert("Oops! Something went wrong :s");
                        console.log(error);
                    })
            //create new // no id specified
            } else {
                fetch("http://localhost:5000/posts", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': `${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        post_type: "News",
                        title: newsModalData.title,
                        description: newsModalData.description,
                        is_featured: newsModalData.is_featured
                    })
                }).then(response => response.json())
                    .then(data => {
                        // server success response
                        // console.log(data);
                        // add the new news item to our list
                        news.unshift(data.data)
                        // reset our data model
                        setNewsModalData({});
                        // close the modal
                        setOpenNewsModal(false);
                    }).catch(error => {
                        alert("Oops! Something went wrong :s");
                        console.log(error);
                    });
            }
        }
    }

    // For any input changes done on the News Modal form
    // will update data model properties based on changed input
    const handleNewsDataChange = (event) => {
        newsModalData[event.target.name] = event.target.value;
        validateData();
    }

    // Handles opening our News Modal, to create or edit
    const handleOpeningNewsModal = (n) => {
        // initialize the data model
        setNewsModalData({
            _id: n._id,
            title: n.title || "",
            description: n.description || "",
            is_featured: n.is_featured || true
        });
        // initialize our form errors
        setErrorTitle(false);
        setErrorDescription(false);
        // open the modal
        setOpenNewsModal(true);
    }

    // data validation for the form
    // just make sure nothing is empty
    const validateData = () => {
        setErrorDescription(newsModalData.description === "");
        setErrorTitle(newsModalData.title === "");
        return newsModalData.description !== "" && newsModalData.title !== "";
    }

    return (
        <>
            <Search className="admin-search" />
            <Tab.Pane attached={false}>
                <Table striped fixed singleLine selectable sortable celled unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width="1"></Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Posted Date</Table.HeaderCell>
                            <Table.HeaderCell width="2">Featured</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {news.map((n, index) =>
                            <Table.Row key={index}>
                                <Table.Cell>{index}</Table.Cell>
                                <Table.Cell>{n.title}</Table.Cell>
                                <Table.Cell>{n.description}</Table.Cell>
                                <Table.Cell>{new Date(n.post_date).toDateString()}</Table.Cell>
                                <Table.Cell>{n.is_featured ? "yes" : "no"}</Table.Cell>
                                <Table.Cell className="no-ellipsis">
                                    <Button
                                        size="tiny"
                                        icon="edit"
                                        content="Edit"
                                        color="blue"
                                        onClick={() => handleOpeningNewsModal(n)}
                                    />
                                </Table.Cell>
                                <Table.Cell className="no-ellipsis">
                                    <Button
                                        size="tiny"
                                        icon="trash alternate outline"
                                        content="Delete"
                                        color="red"
                                        onClick={() => handleDeleteNews(n)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <Button
                    content="Create News Article"
                    icon="add"
                    onClick={() => handleOpeningNewsModal({})}
                    color="purple"
                />
            </Tab.Pane>
            <Modal
                className="admin-edit-modal"
                onClose={() => setOpenNewsModal(false)}
                onOpen={() => setOpenNewsModal(true)}
                open={openNewsModal}
                size="tiny"
            >
                <Modal.Content>
                    <Modal.Description>
                        {newsModalData._id
                            ? <h1>Edit News</h1>
                            : <h1>Create News</h1>
                        }
                        <PhotoUploader />
                        <Form onSubmit={handleSaveNews}>
                            <Form.Field
                                control={Input}
                                placeholder="What's happening?"
                                name="title"
                                label="Title"
                                error={errorTitle}
                                defaultValue={newsModalData.title || ""}
                                onChange={handleNewsDataChange}
                            />
                            <Form.Field
                                control={TextArea}
                                placeholder="What is this about?"
                                name="description"
                                label="Description"
                                error={errorDescription}
                                rows="10"
                                defaultValue={newsModalData.description || ""}
                                onChange={handleNewsDataChange}
                            />
                            <Form.Field>
                                <label>Is this Featured News?</label>
                                <Radio
                                    toggle
                                    name="is_featured"
                                    defaultChecked={newsModalData.is_featured}
                                    onChange={() => newsModalData["is_featured"] = !newsModalData.is_featured}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Cancel"
                        onClick={() => setOpenNewsModal(false)}
                    />
                    <Button
                        content="Save"
                        onClick={() => handleSaveNews()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default NewsPane;