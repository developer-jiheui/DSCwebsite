import React, {useState} from 'react';
import { Button, Tab, Table, Search, Icon } from "semantic-ui-react";

const UsersPane = () => {
    
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
    // const userTypes = [
    //     { key: "basic", value: "basic", text: "Basic" },
    //     { key: "admin", value: "admin", text: "Admin" },
    //     { key: "super", value: "super", text: "Super Admin" }
    // ]



    return (
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
    )
}

export default UsersPane;