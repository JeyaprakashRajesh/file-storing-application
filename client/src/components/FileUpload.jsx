import React from 'react';
import Dropzone from 'react-dropzone';
import axios from "axios"
function FileUpload({ setFile, file }) {
    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            console.log(acceptedFiles)
        }
    };
    const uploadFile = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:7000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                },
            });
            alert(response.data.message); 
            setFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed: ' + error.message); 
        }
    };
    if (file == null) {
        return (
            <div className="file-upload">
                <Dropzone onDrop={handleDrop} maxFiles={1} multiple={false}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <div className='dropzone-container'>
                                <div className='dropzone-element'>
                                    <div className='dropzone-element-image1'></div>
                                    <div className='dropzone-element-text'>
                                        Drag and Drop
                                    </div>
                                </div>
                                <div className='dropzone-element'>
                                    <div className='dropzone-element-text'>
                                        Click to select files
                                    </div>
                                    <div className='dropzone-element-image2'></div>
                                </div>
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>
        );
    }else {
        return(
            <div className='file-preview'>
                <div className="file-preview-container">
                    {file.name}
                </div>
                <div className="file-preview-upload-button">
                    <button className='file-preview-upload' onClick={() => uploadFile()}>
                        UPLOAD
                    </button>
                    <button className='file-preview-cancel' onClick={() =>setFile(null)}>
                        <div className='file-preview-cancel-img'></div>
                    </button>
                </div>
            </div>
        )
    }

}

export default FileUpload;
