import React, { useState, useEffect } from 'react';
import { Button, Modal, Tab, Table, Radio, Form, Search, Input, TextArea, Image } from "semantic-ui-react";

const NewsPane = () => {
    const [news, setNews] = useState([]);

    const [openNewsModal, setOpenNewsModal] = useState(false);
    const [newsModalData, setNewsModalData] = useState({});
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/posts/news", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setNews(data.data);
            });
    }, []);

    const handleDeleteNews = (n) => {
        if (window.confirm(`Are you sure you want to delete "${n.title}?"`)) {
            fetch("http://localhost:5000/posts", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_type: "News",
                    id: n._id,
                    post_id: n.post_id
                })
            }).then(data => {
                console.log(data);
                setNews(news.filter(x => x._id !== n._id));
            });
        }
    }

    const handleSaveNews = () => {
        if (validateData()) {
            //update
            if (newsModalData._id) {
                fetch("http://localhost:5000/posts/news", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_type: "News",
                        id: newsModalData._id,
                        title: newsModalData.title,
                        description: newsModalData.description,
                        is_featured: newsModalData.is_featured
                    })
                }).then(response => response.json())
                    .then(data => {
                        console.log(data);                        
                        let index = news.findIndex(n => n._id === newsModalData._id);
                        news[index] = data.data;
                        setNewsModalData({});
                        setOpenNewsModal(false);
                    }).catch(error => {
                        alert("Oops! Something went wrong :s");
                        console.log(error);
                    })
            //create new
            } else {
                fetch("http://localhost:5000/posts", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_type: "News",
                        title: newsModalData.title,
                        description: newsModalData.description,
                        is_featured: newsModalData.is_featured
                    })
                }).then(response => response.json())
                    .then(data => {
                        console.log(data);
                        news.unshift(data.data)
                        setNews(news);
                        setNewsModalData({});
                        setOpenNewsModal(false);
                    }).catch(error => {
                        alert("Oops! Something went wrong :s");
                        console.log(error);
                    });
            }
        }
    }

    const handleNewsDataChange = (event) => {
        newsModalData[event.target.name] = event.target.value;
        validateData();
    }

    const handleOpeningNewsModal = (n) => {
        setNewsModalData({
            title: n.title || "",
            description: n.description || "",
            is_featured: n.is_featured || false,
            _id: n._id
        });
        setOpenNewsModal(true);
        setErrorTitle(false);
        setErrorDescription(false);
    }

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
                        <Image className="admin-modal-image" fluid src="https://react.semantic-ui.com/images/wireframe/image.png" />
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