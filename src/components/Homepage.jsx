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
        setLoading(false);
        if (!response.status) {
            alert("Uploading Files Cancelled");
        }
    }

    async function handleUploadFolder(event) {
        event.preventDefault();
        setLoading(true);
        const response = await window.api.uploadFolder();
        setLoading(false);
        if (!response.status) {
            alert("Uploading Folder Cancelled");
        }

    }

    function handleSubmit(event) {
        event.preventDefault();
        const regionData = {
            state: "Maharashtra",
            district: "Thane",
            village: "Kalyan",
            pincode: "421306"
        };
        window.api.setRegionInfo(regionData);
        history.push("/result");
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
                        < Button href="#result" onClick={handleSubmit} > Submit Info </Button >
                    </div >
            }
        </>
    )
}

export default Homepage
