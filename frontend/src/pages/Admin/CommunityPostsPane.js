import React, { useState } from 'react';
import { Button, Modal, Tab, Table, Form, Search, Input, TextArea, Image, Select } from "semantic-ui-react";

const CommunityPostsPane = () => {
    const stubPosts = [
        { id: 0, title: "Post0", date: "2021-04-01", category: "Buy & Sell", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
        { id: 3, title: "Post3", date: "2021-04-01", category: "Buy & Sell", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." }
    ];
    const [openPostModal, setOpenPostModal] = useState(false);
    const [postModalData, setPostModalData] = useState({});    
    const [posts, setPosts] = useState(stubPosts);

    const communityCategories = [
        { key: "Welcome", value: "Welcome", text: "Welcome" },
        { key: "Buy & Sell", value: "Buy & Sell", text: "Buy & Sell" },
        { key: "Career Tips", value: "Career Tips", text: "Career Tips" },
        { key: "FAQs", value: "FAQs", text: "FAQs" },
        { key: "Community Chat", value: "Community Chat", text: "Community Chat" },
    ]

    // POSTS
    const handleEditPost = (p) => {
        setPostModalData(p);
        setOpenPostModal(true);
    }

    const handleDeletePost = (p) => {
        if (window.confirm(`Are you sure you want to delete this post?`)) {
            setPosts(posts.filter(x => x.id !== p.id));
        }
    }

    return (
        <>
            <Search className="admin-search" />
            <Tab.Pane attached={false}>
                <Table striped singleLine selectable sortable celled unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width="1">id</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            {/* <Table.HeaderCell>Description</Table.HeaderCell> */}
                            <Table.HeaderCell>Date (yyyy-mm-dd)</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {posts.map((p, id) =>
                            <Table.Row key={id}>
                                <Table.Cell>{p.id}</Table.Cell>
                                <Table.Cell>{p.title}</Table.Cell>
                                {/* <Table.Cell>{p.description}</Table.Cell> */}
                                <Table.Cell>{p.date}</Table.Cell>
                                <Table.Cell>
                                    {p.category}
                                </Table.Cell>
                                <Table.Cell className="no-ellipsis">
                                    <Button
                                        size="tiny"
                                        icon="edit"
                                        content="Edit"
                                        color="blue"
                                        onClick={() => handleEditPost(p)}
                                    />
                                </Table.Cell>
                                <Table.Cell className="no-ellipsis">
                                    <Button
                                        size="tiny"
                                        icon="trash alternate outline"
                                        content="Delete"
                                        color="red"
                                        onClick={() => handleDeletePost(p)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <Button
                    content="Create New Post"
                    icon="add"
                    onClick={() => handleEditPost({})}
                    color="purple"
                />
            </Tab.Pane>
            <Modal
                className="admin-edit-modal"
                onClose={() => setOpenPostModal(false)}
                onOpen={() => setOpenPostModal(true)}
                open={openPostModal}
                size="tiny"
            >
                <Modal.Content>
                    <Modal.Description>
                        {postModalData.title
                            ? <h1>Edit Post</h1>
                            : <h1>Create Post</h1>
                        }
                        <Image className="admin-modal-image" fluid src="https://react.semantic-ui.com/images/wireframe/image.png" />
                        <Form>
                            <Form.Field
                                control={Input}
                                placeholder="What's happening?"
                                name="title"
                                label="Title"
                                value={postModalData.title || ""}
                            // error={postModalData.title < 0}
                            // onChange={handlePostDataChange}
                            />
                            <Form.Field
                                control={TextArea}
                                placeholder="What is this about?"
                                name="description"
                                label="Description"
                                rows="10"
                                // error={postModalData.description < 0}
                                value={postModalData.description || ""}
                            // onChange={handlePostDataChange}
                            />
                            <Form.Field
                                control={Input}
                                placeholder={new Date().toDateString()}
                                name="date"
                                type="date"
                                label="Date"
                                value={new Date(postModalData.date) || ""}
                            // onChange={handlePostDataChange}
                            />
                            <Form.Field>
                                <Select className="admin-select" placeholder={postModalData.category} options={communityCategories} />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Cancel"
                        onClick={() => setOpenPostModal(false)}
                    />
                    <Button
                        content="Save"
                        onClick={() => setOpenPostModal(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default CommunityPostsPane;