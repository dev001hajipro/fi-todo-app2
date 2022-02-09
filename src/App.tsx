import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import { addDoc, collection, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Copyright from './components/Copyright';
import TodoList from './components/TodoList';
import { db } from './Firebase';


function App() {

  // todo: should change generics type. like a `User[]`
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (querySnapShot: QuerySnapshot) => {
      setTodos(querySnapShot.docs.map(v => ({ ...v.data(), id: v.id })))
    })
    return unsubscribe
  }, [])

  // todo: learn react-hook-form.
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const _target = e.target as typeof e.target & {
      title: { value: string }
      active: { checked: boolean }
    }

    try {
      await addDoc(collection(db, 'todos'), {
        title: _target.title.value,
        active: _target.active.checked
      })
    } catch (e) {
      console.log("Error adding document: ", e)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant='h3' component='h1' gutterBottom align="center">
          Todo app
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Todo:</InputLabel>
            <Input id="title" name='title' aria-describedby='my-helper-title' />
            <FormHelperText id="my-helper-title">やることを入力してください。</FormHelperText>
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

        <TodoList items={todos} />

        <Copyright message="hello"></Copyright>
      </Box>
    </Container >
  );
}

export default App;
