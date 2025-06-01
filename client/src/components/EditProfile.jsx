import React from 'react';
import {Text, StyleSheet} from 'react-native-web'; 
import {useEffect, useState} from 'react'; 
import './EditProfile.css'; 

export default function EditProfile() {
    return(
        <div className='squabble-div'>
            <h2 className="edit-header">Edit profile</h2>
            <div className='change-photo'>
                <img className="pfp-crazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s" ></img>

            </div>
        </div>
    )
}