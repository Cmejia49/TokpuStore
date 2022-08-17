import React from 'react'
import { Row, Button } from 'react-bootstrap';
import styles from './style.module.css'
import { useDispatch } from 'react-redux';
import { formAction } from '../../store/form-slice';
const UploadBtn=({imgSrc, id, remove})=>{
    const dispatch = useDispatch();
    const onChangePicture = e => {
      if (e.target.files[0]) {
        console.log("picture: ", e.target.files);
     
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            dispatch(formAction.addImg({imageId:id+1,imgData:reader.result,imageSrc:e.target.files[0]}));
        });
         reader.readAsDataURL(e.target.files[0]);
        }
    };
    return(
        <div className='mb-4'>
        {imgSrc === "" ? (
            <>
            <input type="file" id="upload" accept="image/*" onChange={onChangePicture} hidden/>
            <label className={styles.label + ' mx-2'} htmlFor="upload">
                   Upload
            </label>
            </>
            ):(
                <div className='border border-1 mx-2'>
                 <Row className='justify-content-center'>
                    <img className={styles.img} src={imgSrc} alt=""/>
                </Row>
                <Row className='mx-2'>
                    <Button onClick={()=>{remove()}} className={styles.btn} variant="outline-dark">delete</Button>
                </Row>
            </div>
            )}
        </div>
    )
}

export default UploadBtn;