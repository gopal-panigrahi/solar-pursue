import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Homepage() {
    const history = useHistory();
    const [loading, setLoading] = useState(null)

    async function handleUploadZip(event) {
        event.preventDefault();
        setLoading(true);
        const response = await window.api.uploadZipFile();
        if (response.status) {
            history.push("/result");
        }
        else {
            alert("Uploading Files Cancelled");
            setLoading(false);
        }
    }

    async function handleUploadFolder(event) {
        event.preventDefault();
        setLoading(true);
        const response = await window.api.uploadFolder();
        if (response.status) {
            history.push("/result");
        }
        else {
            alert("Uploading Folder Cancelled");
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading ?
                    <h1>Loading</h1>
                    :
                    <div>
                        < Button href="#result" onClick={handleUploadZip} > Upload ZIP</Button >
                        < Button href="#result" onClick={handleUploadFolder} > Upload Folder</Button >
                    </div >
            }
        </>
    )
}

export default Homepage
