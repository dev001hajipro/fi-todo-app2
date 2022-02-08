import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, onSnapshot, QuerySnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';
import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Copyright from './components/Copyright'
import SampleForm from './components/SampleForm';

import { User } from './components/User';
import TodoList from './components/TodoList';

// todo: <TodoList>を分離したら描画できなくなった。
// 1. 最初に作った永続化せず、かつFirebaseを使わないTodoAppでは、TodoListに引数で渡して
//    描画できた。
// 2. このTodoAppでApp.tsxファイル1ファイルのみで実装したリストは描画できていたが、
//    TodoList.tsx,TodoItem.tsxを使いかつFirestoreを使ったら描画できなくなった。
//
// 上記より、React+TypeScript+FireStoreでファイルをApp.tsx,TodoList.tsx,TodoItem.tsx
// に分割したサンプルを一度探してみるとよい。
// 

function App() {

  // todo: should change generics type. like a `User[]`
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapShot: QuerySnapshot) => {
      setUsers(querySnapShot.docs.map(v => ({ ...v.data(), id: v.id })))
    })
    return unsubscribe
  }, [])

  // todo: learn react-hook-form.
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const _target = e.target as typeof e.target & {
      name: { value: string }
      email: { value: string }
      active: { checked: boolean }
    }
    console.log(_target.active.checked)

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name: _target.name.value,
        email: _target.email.value,
        active: _target.active.checked
      })
    } catch (e) {
      console.log("Error adding document: ", e)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'users', id))
  }

  const handleActive = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    console.log(e.target.checked, id)
    const docRef = doc(db, 'users', id)
    await updateDoc(docRef, {
      active: e.target.checked
    })
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant='h1' component='h1' gutterBottom align="center">
          Todo app
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">名前</InputLabel>
            <Input id="name" name='name' aria-describedby='my-helper-name' />
            <FormHelperText id="my-helper-name">名前を入力してください。</FormHelperText>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">メール</InputLabel>
            <Input id="email" name='email' aria-describedby='my-helper-email' />
            <FormHelperText id="my-helper-email">メールを入力してください。</FormHelperText>
          </FormControl>
          <FormControlLabel control={<Checkbox name='active' />} label="活動中" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >送信
          </Button>
        </Box>

        <TodoList users={users} /> 


        <Copyright message="hello"></Copyright>
      </Box>
    </Container >
  );
}

export default App;
