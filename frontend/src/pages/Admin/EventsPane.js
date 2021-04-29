import React, { useState, useEffect } from 'react';
import { Button, Container, Modal, Tab, Table, Radio, Form, Search, Icon, Input, TextArea, Image, Select } from "semantic-ui-react";

const EventsPane = () => {

    const stubEvents = [
        { id: 0, title: "Website Contest", date: "2021-04-01", isFeatured: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
        { id: 1, title: "Hackathon", date: "2021-04-01", isFeatured: false, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
        { id: 2, title: "Interview Prep", date: "2021-04-01", isFeatured: true, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." },
        { id: 3, title: "Webinar", date: "2021-04-01", isFeatured: false, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada sollicitudin consectetur. Ut egestas lobortis venenatis. Pellentesque magna augue, tempor in rhoncus dignissim, congue nec turpis. Nullam vehicula sed orci maximus aliquam. Quisque interdum nec dui eget maximus. Curabitur non massa at risus suscipit ornare. Nam consequat nisl dolor. Nullam scelerisque venenatis nunc vel lobortis." }
    ];

    const [events, setEvents] = useState(stubEvents);
    const [openEventModal, setOpenEventModal] = useState(false);
    const [eventModalData, setEventModalData] = useState({});

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


    return (
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
        </>
    );
}

export default EventsPane;