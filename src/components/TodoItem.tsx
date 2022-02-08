import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { User } from "./User";
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
    user: User,
    handleActive: (user: User) => void
    handleDelete: (id: string) => void
}

const TodoItem: React.FC<Props> = ({ user, handleActive, handleDelete }) => {
    return (
        <ListItem key={user.id}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        name="active"
                        defaultChecked={user.active}
                        title="is active"
                        onChange={(e) => handleActive(user)}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={`${user.name} ${user.email}`}>                     
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}

export default TodoItem