import { doc, DocumentData, DocumentReference, setDoc } from "firebase/firestore"
import React, { useState } from "react"
import { db } from "../Firebase"



const SampleForm: React.FC = () => {
    const [title, setTitle] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSampleCallSetDoc = async () => {
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

    return (
        <div>
            <div>
                <label>サンプルフォーム:
                    <input type="text" onChange={handleChange} name="title" placeholder='ダミー'></input>
                </label>
            </div>
            <div>
                <label>setDoc is use auto generated Id</label>
                <button type="button" onClick={handleSampleCallSetDoc}>use setDoc</button>
            </div>
        </div>
    )
}

export default SampleForm