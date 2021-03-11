import React, { useState } from "react";
import { Button, Container, Modal, Tab, Table, Radio, Form, Search, Icon, Input, TextArea, Image, Select } from "semantic-ui-react";
import ContentContainer from "../../components/ContentContainer";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import './index.css';

const stubUsers = [
    { id: 0, firstname: "Marhsal", lastname: "Wah", email: "email@email.com", isAdmin: false, isBanned: false },
    { id: 1, firstname: "Clay", lastname: "Lah", email: "email@email.com", isAdmin: false, isBanned: false },
    { id: 2, firstname: "Nana", lastname: "Stue", email: "email@email.com", isAdmin: false, isBanned: false },
    { id: 3, firstname: "Poppy", lastname: "Eur", email: "email@email.com", isAdmin: false, isBanned: false },
    { id: 4, firstname: "Francine", lastname: "Doe", email: "email@email.com", isAdmin: false, isBanned: false },
    { id: 5, firstname: "Admin", lastname: "Example", email: "admin@email.com", isAdmin: true, position: "President", isBanned: false },
    { id: 6, firstname: "Admin2", lastname: "Example2", email: "admin2@email.com", isAdmin: true, position: "Vice President", isBanned: false }
];
const stubEvents = [
    { id: 0, title: "Website Contest", date: "2021-04-01", isFeatured: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
    { id: 1, title: "Hackathon", date: "2021-04-01", isFeatured: false, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
    { id: 2, title: "Interview Prep", date: "2021-04-01", isFeatured: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
    { id: 3, title: "Webinar", date: "2021-04-01", isFeatured: false, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." }
];
const stubPosts = [
    { id: 0, title: "Post0", date: "2021-04-01", category: "Buy & Sell", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
    { id: 3, title: "Post3", date: "2021-04-01", category: "Buy & Sell", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." }
];
const stubNews = [
    { id: 0, title: "Covid 19 - Updates", date: "2021-04-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
    { id: 1, title: "Covid 16 - Updates", date: "2021-04-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
    { id: 2, title: "Covid 12 - Updates", date: "2021-04-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." }
];

const Admin = () => {
    const [openEventModal, setOpenEventModal] = useState(false);
    const [eventModalData, setEventModalData] = useState({});

    const [openNewsModal, setOpenNewsModal] = useState(false);
    const [newsModalData, setNewsModalData] = useState({});

    const [openPostModal, setOpenPostModal] = useState(false);
    const [postModalData, setPostModalData] = useState({});

    const [users, setUsers] = useState(stubUsers);
    const [events, setEvents] = useState(stubEvents);
    const [news, setNews] = useState(stubNews);
    const [posts, setPosts] = useState(stubPosts);

    // const userTypes = [
    //     { key: "basic", value: "basic", text: "Basic" },
    //     { key: "admin", value: "admin", text: "Admin" },
    //     { key: "super", value: "super", text: "Super Admin" }
    // ]
    const adminTypes = [
        { key: "none", value: "---", text: "---" },
        { key: "sec", value: "sec", text: "Secretary" },
        { key: "vpf", value: "vpf", text: "VP Finance" },
        { key: "vpc", value: "vpc", text: "VP Communication" },
        { key: "vp", value: "vp", text: "Vice President" },
        { key: "pres", value: "pres", text: "President" },
    ];

    const communityCategories = [
        { key: "Welcome", value: "Welcome", text: "Welcome" },
        { key: "Buy & Sell", value: "Buy & Sell", text: "Buy & Sell" },
        { key: "Career Tips", value: "Career Tips", text: "Career Tips" },
        { key: "FAQs", value: "FAQs", text: "FAQs" },
        { key: "Community Chat", value: "Community Chat", text: "Community Chat" },
    ]

    // USERS AND ADMINS
    const handleAdminToggle = (u) => {
        let i = users.findIndex((obj => obj.id === u.id));
        users[i].isAdmin = !u.isAdmin;
        setUsers(users);
    }

    const handleUserDelete = (u) => {
        if (window.confirm(`Are you sure you want to delete ${u.firstname} ${u.lastname}?`)) {
            setUsers(users.filter(x => x.id !== u.id));
        }
    }

    const handleBanUser = (u) => {
        if (window.confirm(`Are you sure you want to ban ${u.firstname} ${u.lastname}?`)) {
            let i = users.findIndex((obj => obj.id === u.id));
            users[i].isBanned = true;
            setUsers(users);
        }
    }

    // EVENTS
    const handleEditEvent = (emd) => {
        setEventModalData(emd);
        setOpenEventModal(true);
    }

    const handleDeleteEvent = (emd) => {
        if (window.confirm(`Are you sure you want to delete this event?`)) {
            setEvents(events.filter(x => x.id !== emd.id));
        }
    }

    const handleSaveEvent = (event) => {
        event.preventDefault();
        if (eventModalData.title === "" || eventModalData.description === "") {

        } else {
            setEventModalData(eventModalData);
            setOpenEventModal(false);
        }
    }

    const handleEventDataChange = (event) => {
        eventModalData[event.target.name] = event.target.value;
        setEventModalData(eventModalData);
    }

    const handleEditNews = (n) => {
        setNewsModalData(n);
        setOpenNewsModal(true);
    }

    // NEWS
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

    const panes = [
        {
            menuItem: 'Users',
            render: () =>
                <>
                    <Search className="admin-search" />
                    <Tab.Pane attached={false}>
                        <Table striped fixed singleLine selectable sortable celled unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width="1">id</Table.HeaderCell>
                                    <Table.HeaderCell>First Name</Table.HeaderCell>
                                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    {/* <Table.HeaderCell>isAdmin</Table.HeaderCell> */}
                                    <Table.HeaderCell>Ban</Table.HeaderCell>
                                    <Table.HeaderCell>Delete</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users.map((u, id) =>
                                    <Table.Row key={id} disabled={u.isBanned}>
                                        <Table.Cell>{u.id}</Table.Cell>
                                        <Table.Cell>{u.firstname}</Table.Cell>
                                        <Table.Cell>{u.lastname}</Table.Cell>
                                        <Table.Cell>{u.email}</Table.Cell>
                                        {!u.isBanned ?
                                            <Table.Cell className="no-ellipsis">
                                                <Button
                                                    size="tiny"
                                                    icon="ban"
                                                    content="Ban"
                                                    color="yellow"
                                                    onClick={() => handleBanUser(u)}
                                                />
                                            </Table.Cell>
                                            :
                                            <Table.Cell warning>
                                                <Icon name="attention" />
                                                    Banned
                                            </Table.Cell>
                                        }

                                        <Table.Cell className="no-ellipsis"> 
                                            <Button
                                                size="tiny"
                                                icon="trash alternate outline"
                                                content="Delete"
                                                color="red"
                                                onClick={() => handleUserDelete(u)}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </Tab.Pane>
                </>
        },
        {
            menuItem: 'Events',
            render: () =>
                <>
                    <Search className="admin-search" />
                    <Tab.Pane attached={false}>
                        <Table striped fixed singleLine selectable sortable celled unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width="1">id</Table.HeaderCell>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    {/* <Table.HeaderCell>Description</Table.HeaderCell> */}
                                    <Table.HeaderCell>Date (yyyy-mm-dd)</Table.HeaderCell>
                                    <Table.HeaderCell width="2">isFeatured</Table.HeaderCell>
                                    <Table.HeaderCell>Edit</Table.HeaderCell>
                                    <Table.HeaderCell>Delete</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {events.map((emd, id) =>
                                    <Table.Row key={id}>
                                        <Table.Cell>{emd.id}</Table.Cell>
                                        <Table.Cell>{emd.title}</Table.Cell>
                                        {/* <Table.Cell>{emd.description}</Table.Cell> */}
                                        <Table.Cell>{emd.date}</Table.Cell>
                                        <Table.Cell className="no-ellipsis">
                                            <Radio
                                                toggle
                                                defaultChecked={emd.isFeatured}
                                            />
                                        </Table.Cell>
                                        <Table.Cell className="no-ellipsis">
                                            <Button
                                                size="tiny"                                                
                                                icon="edit"
                                                content="Edit"
                                                color="blue"
                                                onClick={() => handleEditEvent(emd)}
                                            />
                                        </Table.Cell>
                                        <Table.Cell className="no-ellipsis">
                                            <Button
                                                size="tiny"                                                
                                                icon="trash alternate outline"
                                                content="Delete"
                                                color="red"
                                                onClick={() => handleDeleteEvent(emd)}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                        <Button
                            content="Create New Event"
                            icon="add"
                            onClick={() => handleEditEvent({})}
                            color="purple"
                        />
                    </Tab.Pane>
                </>
        },
        {
            menuItem: 'News',
            render: () =>
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
                </>
        },
        {
            menuItem: 'Community Posts',
            render: () =>
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
                </>
        },
        {
            menuItem: 'Admins',
            render: () =>
                <>
                    <Search className="admin-search" />
                    <Tab.Pane attached={false}>
                        <Table striped fixed singleLine selectable sortable celled structured unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width="1">id</Table.HeaderCell>
                                    <Table.HeaderCell>First Name</Table.HeaderCell>
                                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell width="2">isAdmin</Table.HeaderCell>
                                    <Table.HeaderCell width="5">Position</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users.map((u, id) =>
                                    <Table.Row key={id}>
                                        <Table.Cell>{u.id}</Table.Cell>
                                        <Table.Cell>{u.firstname}</Table.Cell>
                                        <Table.Cell>{u.lastname}</Table.Cell>
                                        <Table.Cell>{u.email}</Table.Cell>
                                        <Table.Cell className="no-ellipsis">
                                            <Radio
                                                toggle
                                                defaultChecked={u.isAdmin}
                                                onChange={() => handleAdminToggle(u)} />
                                        </Table.Cell>
                                        <Table.Cell className="select-td">
                                            <Select className="admin-select" placeholder={u.position} options={adminTypes} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </Tab.Pane>
                </>
        },

    ]

    return (
        <>
            <Navbar >
            <Container>
                <ContentContainer>
                    <h1>ADMINISTRATIVE SETTINGS</h1>
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} renderActiveOnly={true} />
                </ContentContainer>
            </Container>
            <Modal
                className="admin-edit-modal"
                onClose={() => setOpenEventModal(false)}
                onOpen={() => setOpenEventModal(true)}
                open={openEventModal}
                size="tiny"
            >
                <Modal.Content>
                    <Modal.Description>
                        {eventModalData.title
                            ? <h1>Edit Event</h1>
                            : <h1>Create Event</h1>
                        }
                        <Image className="admin-modal-image" fluid src="https://react.semantic-ui.com/images/wireframe/image.png" />
                        <Form onSubmit={handleSaveEvent}>
                            <Form.Field
                                control={Input}
                                placeholder="What's the event?"
                                name="title"
                                label="Title"
                                value={eventModalData.title || ""}
                                error={eventModalData.title < 0}
                                onChange={handleEventDataChange}
                            />
                            <Form.Field
                                control={TextArea}
                                placeholder="What is this about?"
                                name="description"
                                label="Description"
                                rows="10"
                                error={eventModalData.description < 0}
                                value={eventModalData.description || ""}
                                onChange={handleEventDataChange}
                            />
                            <Form.Field
                                control={Input}
                                placeholder={new Date().toDateString()}
                                name="date"
                                type="date"
                                label="Date"
                                value={new Date(eventModalData.date) || ""}
                                onChange={handleEventDataChange}
                            />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Cancel"
                        onClick={() => setOpenEventModal(false)}
                    />
                    <Button
                        content="Save"
                        onClick={(event) => handleSaveEvent(event)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
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
            <Footer />
            </Navbar>
        </>
    )
}

export default Admin;