import React, { useCallback, useState, useRef } from 'react';
import {useDropzone} from 'react-dropzone';
import { db, storage } from '../../firebase';
import { addDoc, collection, serverTimeStamp} from 'firebase/firestore';
import { async } from '@firebase/util';

const Dropzone = () => {
    const [selectedFiles, setSelectedFiles] = useState([])
    const descriptionRef = useRef(null)
    const uploadPost = async()=>{
        const docRef = await addDoc(collection(db,"posts"),{
            description:descriptionRef.current.value,
            timestamp:serverTimeStamp()
        })

    }

    console.log('db', db)
    console.log('storage', storage)

    const onDrop = useCallback(acceptedFiles => {
        setSelectedFiles(acceptedFiles.map(file=>
            Object.assign(file,{
                preview:URL.createObjectURL(file)
            })
            ))
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})
    const selected_files = selectedFiles?.map(file=>(
        <div>
            <img src={file.preview} style={{width:"200px"}} alt=''/>
        </div>
    ))
    return (
        <div>
        <div {...getRootProps()}>
        <input {...getInputProps()} />
        

            <p>Drop the files here ...</p> :
        
        </div>
        <input ref={descriptionRef} type="text" placeholder='Description' />
        <button onClick={uploadPost}>post</button>
        {selected_files}
        </div>
    )

}

export default Dropzone