import React, { useState } from "react";
import { Image } from "semantic-ui-react";

import './index.css';

const defaultPicURL = "https://react.semantic-ui.com/images/wireframe/image.png";

const PhotoUploader = ({changeImageFunction, src, circular}) => {
    const [fileImage, setFileImage] = useState(src || defaultPicURL);

    const handleFileChange = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
        changeImageFunction(e)
    }

    return (
        <div id="photo-uploader">
            <Image  src={fileImage} centered  className={circular && "circular-photo-upload"}/>
            <label for="photo-upload">
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} 
                    hidden
                />
                Upload Photo
            </label>
        </div>
    );
}

export default PhotoUploader;