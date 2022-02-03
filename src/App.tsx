import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, onSnapshot, QuerySnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';
import React, { useEffect, useState } from 'react';

type User = {
  id: string
  name: string
  email: string
  active: boolean
}

function App() {
  const [title, setTitle] = useState<string>('')
  // todo: should change generics type. like a `User[]`
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const re = collection(db, 'users')
    const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapShot: QuerySnapshot) => {
      setUsers(querySnapShot.docs.map(v => ({ ...v.data(), id: v.id })))
    })
    return unsubscribe
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

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

  const handleButton = async () => {
    try {
      // if you set custom Id
      const docRef: DocumentReference<DocumentData> = doc(db, 'users', 'XXXXXABC')
      const pm = await setDoc(docRef, {
        name: 'by setDoc',
        email: 'sss@ggg.com',
        active: true
      })
    } catch (e) {
      console.log("Error setDoc document: ", e)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'users', id))
  }

  const handleActive = async (e: React.ChangeEvent<HTMLInputElement>, id:string) => {
    console.log(e.target.checked, id)
    const docRef = doc(db, 'users', id)
    await updateDoc(docRef, {
      active: e.target.checked
    })
  }

  return (
    <div>
      <div>
        <label>サンプルフォーム:
          <input type="text" onChange={handleChange} name="xx" placeholder='ダミー'></input>
        </label>
      </div>

      <div>
        <label>setDoc is use auto generated Id</label>
        <button type="button" onClick={handleButton}>use setDoc</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:
            <input type="text" name="name" placeholder='名前' title="名前"></input>
          </label>
        </div>
        <div>
          <label>メール:
            <input type="email" name="email" placeholder='メール' title="メール"></input>
          </label>
        </div>
        <div>
          <label>活動中:
            <input type="checkbox" name="active"></input>
          </label>
        </div>
        <button type="submit">submit</button>
      </form>

      <div>
        {
          users.map(user => {
            return (
              <div key={user.id}>
                <span>{user.id} {user.name} {user.email}</span>

                <input type="checkbox" name="active" defaultChecked={user.active} title="is active" onChange={(e)=> handleActive(e, user.id)}></input>
                <button type="button" onClick={() => handleDelete(user.id)}>delete</button>
              </div>)
          })
        }
      </div>
    </div>
  );
}

export default App;
