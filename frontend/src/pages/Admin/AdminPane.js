import React, { useState, useEffect } from 'react';
import { Tab, Table, Radio, Search, Select } from "semantic-ui-react";

const AdminPane = () => {
    const stubUsers = [
        { id: 0, firstname: "Marhsal", lastname: "Wah", email: "email@email.com", isAdmin: false, isBanned: false },
        { id: 1, firstname: "Clay", lastname: "Lah", email: "email@email.com", isAdmin: false, isBanned: false },
        { id: 2, firstname: "Nana", lastname: "Stue", email: "email@email.com", isAdmin: false, isBanned: false },
        { id: 3, firstname: "Poppy", lastname: "Eur", email: "email@email.com", isAdmin: false, isBanned: false },
        { id: 4, firstname: "Francine", lastname: "Doe", email: "email@email.com", isAdmin: false, isBanned: false },
        { id: 5, firstname: "Admin", lastname: "Example", email: "admin@email.com", isAdmin: true, position: "President", isBanned: false },
        { id: 6, firstname: "Admin2", lastname: "Example2", email: "admin2@email.com", isAdmin: true, position: "Vice President", isBanned: false }
    ];
    
    const [users, setUsers] = useState(stubUsers);

    const handleAdminToggle = (u) => {
        let i = users.findIndex((obj => obj.id === u.id));
        users[i].isAdmin = !u.isAdmin;
        setUsers(users);
    }

    const adminTypes = [
        { key: "none", value: "---", text: "---" },
        { key: "sec", value: "sec", text: "Secretary" },
        { key: "vpf", value: "vpf", text: "VP Finance" },
        { key: "vpc", value: "vpc", text: "VP Communication" },
        { key: "vp", value: "vp", text: "Vice President" },
        { key: "pres", value: "pres", text: "President" },
    ];

    return (
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
    );
}

export default AdminPane;