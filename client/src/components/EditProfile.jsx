import React from 'react';
import {Text, StyleSheet, TextInput, Modal, View, Button} from 'react-native-web'; 
import {useEffect, useState, useRef} from 'react'; 
import './EditProfile.css'; 

export default function EditProfile() {
    const[name, setName] = useState(''); 
    const [bio, setBio] = useState(''); 
    const [show, setShow] = useState(false); 


    const handleName = (e) => {
        e.preventDefault(); 
        console.log('Username has been changed to: ', name); 
    }; 

    const handleBio = (e) => {
        e.preventDefault(); 
        console.log('Bio has been changed to: ', bio); 
    }

    const styles = StyleSheet.create({
        input:{
            borderRadius: 15,
            borderWidth: 2, 
            width: 400, 
            height: 90,
            padding: 10,
            paddingBottom: 14,
            paddingTop: 14,
            color: "#000000", 
        }
    })
    return(
        <div>
            <Modal transparent={true} visible={show}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View>
                        <div className="change-card">
                        <p className='change-par'>Change Your Photo</p>
                        <button className="change-photo-btn">Upload photo</button>
                        <button className="change-photo-btn" onClick={() => setShow(false)}>Cancel</button>
                        </div>

                    </View>
                </View>
            </Modal>
            <h2 className="edit-header">Edit profile</h2>
            <div className='squabble-div'>
                <div className='change-photo'>
                    <div className='pfp-plus-name'>
                        <img className="pfp-crazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s" onClick={() => setShow(true)}></img>
                        <p className='name-crazy'>Eric Ou</p>
                    </div>
                    <button className='change-btn' onClick={() => setShow(true)}>Change Photo</button>
                </div>
            </div>
            <h3 className='edit-name'>Edit name</h3>
            <div className='changing-name'>
            <form className="name-editor" onSubmit={handleName}>
                <TextInput style={styles.input} editable multiline maxLength={150} placeholder="Change your name" value={name} onChange={(e) => setName(e.target.value)}/>
            </form>
            </div>
            <h3 className='edit-bio'>Edit bio</h3>
            <form className='bio-editor' onSubmit={handleBio}>
                <TextInput style={styles.input} editable multiline maxLength={150} placeholder='Change your bio' value={bio} onChange={(e) => setBio(e.target.value)}/>
            </form>
            <button type="button" className='submit-btn' onClick={() => setShowSubmit(true)}>Submit changes</button>
        </div>



    )
}