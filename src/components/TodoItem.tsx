import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Todo } from "./Todo";

type Props = {
    todo: Todo,
    handleActive: (todo: Todo) => void
    handleDelete: (id: string) => void
}

const TodoItem: React.FC<Props> = ({ todo, handleActive, handleDelete }) => {
    return (
        <ListItem key={todo.id}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        name="active"
                        defaultChecked={todo.active}
                        title="is active"
                        onChange={(e) => handleActive(todo)}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={`${todo.title}`}>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}

export default TodoItem
