
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, Firestore, onSnapshot, QuerySnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { Box, Grid, List } from "@mui/material"
import React, { useEffect, useState } from "react"
import { User } from "./User"
import TodoItem from './TodoItem';

type Props = {
    users: User[]
}

const TodoList: React.FC<Props> = ({ users }) => {


    const handleActive = async (user: User) => {
        await updateDoc(doc(db, 'users', user.id), {
            active: !user.active
        })
    }

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, 'users', id))
    }

    return (
        <List sx={{ width:'100%' }}>
                {
                    users.map(user =>
                        <TodoItem
                            key={user.id}
                            user={user}
                            handleActive={handleActive}
                            handleDelete={handleDelete} />
                    )
                }
        </List>
    )
}

export default TodoList