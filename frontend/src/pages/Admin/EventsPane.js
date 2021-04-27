import React, { useState, useEffect } from 'react';
import { Button, Modal, Tab, Table, Radio, Form, Search, Input, TextArea, Image } from "semantic-ui-react";

const EventsPane = () => {
    const [events, setEvents] = useState([]);

    const [openEventModal, setOpenEventModal] = useState(false);
    const [eventModalData, setEventModalData] = useState({});
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/posts/events", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setEvents(data.data);
            });
    }, []);

    const handleSaveEvent = () => {
        if (validateData()) {
            // update event
            if (eventModalData._id) {
                fetch("http://localhost:5000/posts/event", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: eventModalData._id,
                        data: eventModalData
                    })                    
                }).then(response => response.json())
                    .then(res => {
                        console.log(res);
                        let index = events.findIndex(n => n._id === eventModalData._id);
                        events[index] = res.data;
                        setEventModalData({});
                        setOpenEventModal(false);
                    }).catch(error => {
                        alert("Oops! Something went wrong :s");
                        console.log(error);
                    });
            // create new event
            } else {
                fetch("http://localhost:5000/posts", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_type: "Event",
                        title: eventModalData.title,
                        description: eventModalData.description,
                        is_featured: eventModalData.is_featured,
                        is_countdown: eventModalData.is_countdown,
                        event_date: eventModalData.event_date
                    })
                }).then(response => response.json())
                    .then(data => {
                        console.log(data);
                        events.unshift(data.data)
                        setEventModalData({});
                        setOpenEventModal(false);
                    }).catch(error => {
                        alert("Oops! Something went wrong :s");
                        console.log(error);
                    });
            }
        }
    }

    const handleDeleteEvent = (emd) => {
        if (window.confirm(`Are you sure you want to delete ${emd.title}?`)) {
            fetch("http://localhost:5000/posts", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_type: "Event",
                    id: emd._id,
                    post_id: emd.post_id
                })
            }).then(data => {
                console.log(data);
                setEvents(events.filter(x => x._id !== emd._id));
            });
        }
    }

    const formatDate = (date) => {
        let d = new Date(date);

        let month = d.getMonth() + 1;
        let day = d.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;

        return d.getFullYear() + "-" + month + "-" + day;;
    }

    const handleOpenEditModal = (emd) => {
        setEventModalData({
            _id: emd._id,
            title: emd.title || "",
            description: emd.description || "",
            event_date: emd.event_date ? formatDate(emd.event_date) : formatDate(new Date()),
            is_featured: emd.is_featured || false,
            is_countdown: emd.is_countdown || false
        });
        setErrorDate(false);
        setErrorTitle(false);
        setErrorDescription(false);
        setOpenEventModal(true);
    }

    const handleEventDataChange = (event) => {
        eventModalData[event.target.name] = event.target.value;
        validateData();
    }

    const handleEventToggleChange = (property, newValue) => {
        eventModalData[property] = newValue;
    }

    const validateData = () => {
        let timeNow = new Date();
        let eventTime = new Date(eventModalData.event_date);

        setErrorDescription(eventModalData.description === "");
        setErrorTitle(eventModalData.title === "");
        setErrorDate(eventTime === "Invalid Date" || eventTime < timeNow);

        return eventModalData.description !== ""
            && eventModalData.title !== ""
            && eventTime !== "Invalid Date"
            && eventTime > timeNow;
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
                            <Table.HeaderCell>Event Date</Table.HeaderCell>
                            <Table.HeaderCell width="2">Featured</Table.HeaderCell>
                            <Table.HeaderCell width="2">Countdown</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {events.map((emd, index) =>
                            <Table.Row key={index}>
                                <Table.Cell>{index}</Table.Cell>
                                <Table.Cell>{emd.title}</Table.Cell>
                                <Table.Cell>{new Date(emd.event_date).toDateString()}</Table.Cell>
                                <Table.Cell>{emd.is_featured ? "yes" : "no"}</Table.Cell>
                                <Table.Cell>{emd.is_countdown ? "yes" : "no"}</Table.Cell>
                                <Table.Cell className="no-ellipsis">
                                    <Button
                                        size="tiny"
                                        icon="edit"
                                        content="Edit"
                                        color="blue"
                                        onClick={() => handleOpenEditModal(emd)}
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
                    onClick={() => handleOpenEditModal({})}
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
                        {eventModalData._id
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
                                defaultValue={eventModalData.title}
                                error={errorTitle}
                                onChange={handleEventDataChange}
                            />
                            <Form.Field
                                control={TextArea}
                                placeholder="What is this about?"
                                name="description"
                                label="Description"
                                rows="10"
                                error={errorDescription}
                                defaultValue={eventModalData.description}
                                onChange={handleEventDataChange}
                            />
                            <Form.Field
                                control={Input}
                                name="event_date"
                                type="date"
                                label="Event Date"
                                error={errorDate}
                                defaultValue={eventModalData.event_date}
                                onChange={handleEventDataChange}
                            />
                            <Form.Field>
                                <label>Is this a Countdown Event?</label>
                                <Radio
                                    toggle
                                    name="is_countdown"
                                    defaultChecked={eventModalData.is_countdown}
                                    onChange={() => handleEventToggleChange("is_countdown", !eventModalData.is_countdown)} />
                            </Form.Field>
                            <Form.Field>
                                <label>Is this a Featured Event?</label>
                                <Radio
                                    toggle
                                    name="is_featured"
                                    defaultChecked={eventModalData.is_featured}
                                    onChange={() => handleEventToggleChange("is_featured", !eventModalData.is_featured)}
                                />
                            </Form.Field>
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
                        onClick={() => handleSaveEvent()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default EventsPane;