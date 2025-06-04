import React from 'react';
import {Text, StyleSheet, TextInput, Modal, View, Button} from 'react-native-web'; 
import {useEffect, useState, useRef} from 'react'; 
import './EditProfile.css'; 

export default function EditProfile() {
    const[name, setName] = useState(''); 
    const [bio, setBio] = useState(''); 
    const [show, setShow] = useState(false); 
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    if (!user) {
        return <div className="loading-placeholder">Loading profile...</div>;
    }

    const handleName = async (e) => {
        e.preventDefault(); 
        setError(''); // Clear any previous errors
        
        if (name.trim()) {
            try {
                console.log('Making request to:', `/api/users/${user._id}`);
                const response = await fetch(`/api/users/${user._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name.trim(),
                        email: user.email,
                        provider: user.provider
                    })
                });

                const result = await response.json();
                
                if (response.ok && result.success) {
                    const updatedUser = result.data;
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    console.log('Username successfully updated to:', updatedUser.username);
                    setName(''); // Clear the input after successful update
                } else {
                    setError(result.message || 'Failed to update username');
                    console.error('Failed to update username:', result.message);
                }
            } catch (error) {
                setError('Error connecting to server');
                console.error('Error updating username:', error);
            }
        } else {
            setError('Please enter a valid username');
        }
    }; 

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
                <View className="modal-overlay">
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
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            <div className='squabble-div'>
                <div className='change-photo'>
                    <div className='pfp-plus-name'>
                        <img className="pfp-crazy" src={user.avatar} alt={`${user.username}'s avatar`} onClick={() => setShow(true)}></img>
                        <p className='name-crazy'>{user.username}</p>
                    </div>
                    <button className='change-btn' onClick={() => setShow(true)}>Change Photo</button>
                </div>
            </div>
            <h3 className='edit-name'>Edit name</h3>
            <div className='changing-name'>
                <form className="name-editor" onSubmit={handleName}>
                    <TextInput 
                        style={styles.input} 
                        editable 
                        multiline 
                        maxLength={150} 
                        placeholder={user.username} 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className='submit-btn'>Update Name</button>
                </form>
            </div>
        </div>
    )
}