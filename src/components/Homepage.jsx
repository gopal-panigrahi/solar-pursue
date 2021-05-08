import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Homepage() {
    const history = useHistory();
    const [loadingZip, setLoadingZip] = useState(null)
    async function handleUploadZip(event) {
        event.preventDefault();
        setLoadingZip(true);
        const response = await window.api.uploadZipFile();
        if (response.status) {
            history.push("/result");
        }
        else {
            alert("Uploading Files Cancelled");
            setLoadingZip(false);
        }
    }

    return (
        <>
            {
                loadingZip ?
                    <h1>Loading ZIP</h1>
                    :
                    <div>
                        < Button href="#result" onClick={handleUploadZip} > Upload ZIP</Button >
                    </div >
            }
        </>
    )
}

export default Homepage
