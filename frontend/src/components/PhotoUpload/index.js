import React, { useState } from "react";
import { Image } from "semantic-ui-react";

import './index.css';

const defaultProfilePicURL = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=612x612&w=0&h=rvt5KGND3z8kfrHELplF9zmr8d6COZQ-1vYK9mvSxnc=";

const PhotoUploader = ({src}) => {
    const [fileImage, setFileImage] = useState(src);

    const handleFileChange = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div id="profile-photo-uploader">
            <Image  src={fileImage} centered />
            <label for="profile-photo-upload">
                <input
                    id="profile-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} 
                    hidden
                />
                Upload Profile Photo
            </label>
        </div>
    );
}

export default PhotoUploader;