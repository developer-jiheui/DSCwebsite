import React, { useState, useEffect } from 'react';
import { Button, Container, Modal, Tab, Table, Radio, Form, Search, Icon, Input, TextArea, Image, Select } from "semantic-ui-react";

const NewsPane = () => {
    const stubNews = [
        { id: 0, title: "Covid 19 - Updates", date: "2021-04-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
        { id: 1, title: "Covid 16 - Updates", date: "2021-04-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
        { id: 2, title: "Covid 12 - Updates", date: "2021-04-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." }
    ];


    const [openNewsModal, setOpenNewsModal] = useState(false);
    const [newsModalData, setNewsModalData] = useState({});

    const [news, setNews] = useState(stubNews);

    const handleDeleteNews = (n) => {
        if (window.confirm(`Are you sure you want to delete this news article?`)) {
            setNews(news.filter(x => x.id !== n.id));
        }
    }

    const handleSaveNews = (event) => {

    }

    const handleNewsDataChange = (event, n) => {
        newsModalData[event.target.name] = event.target.value;
        setNewsModalData(newsModalData);
    }


    const handleEditNews = (n) => {
        setNewsModalData(n);
        setOpenNewsModal(true);
    }

    return (
        <>
            <Search className="admin-search" />
            <Tab.Pane attached={false}>
                <Table striped fixed singleLine selectable sortable celled unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width="1">id</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Date (yyyy-mm-dd)</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {news.map((n, id) =>
                            <Table.Row key={id}>
                                <Table.Cell>{n.id}</Table.Cell>
                                <Table.Cell>{n.title}</Table.Cell>
                                <Table.Cell>{n.description}</Table.Cell>
                                <Table.Cell>{n.date}</Table.Cell>
                                <Table.Cell className="no-ellipsis">
                                    <Button
                                        size="tiny"
                                        icon="edit"
                                        content="Edit"
                                        color="blue"
                                        onClick={() => handleEditNews(n)}
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
                    onClick={() => handleEditNews({})}
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
                        {newsModalData.title
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
                                value={newsModalData.title || ""}
                                error={newsModalData.title < 0}
                                onChange={handleNewsDataChange}
                            />
                            <Form.Field
                                control={TextArea}
                                placeholder="What is this about?"
                                name="description"
                                label="Description"
                                rows="10"
                                error={newsModalData.description < 0}
                                value={newsModalData.description || ""}
                                onChange={handleNewsDataChange}
                            />
                            <Form.Field
                                control={Input}
                                placeholder={new Date().toDateString()}
                                name="date"
                                type="date"
                                label="Date"
                                value={new Date(newsModalData.date) || ""}
                                onChange={handleNewsDataChange}
                            />
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