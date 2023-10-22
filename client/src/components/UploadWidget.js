import React, { useRef, useEffect, useState } from 'react'

export default function UploadWidget(props) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [imgURL, setImgURL] = useState("");
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dioza4kqd",
            uploadPreset: "uxd070o4"
        }, function (error, result) {
            if (result.event === "success") {
                setImgURL(result.info.url)
                props.imgUrl(result.info.url)
                widgetRef.current.close();
            }
        })
    }, []);
    if (imgURL === "") {
        return (
            <div>
                <button onClick={() => widgetRef.current.open()}>
                    Upload
                </button>
            </div>)
    }else{
        return (
            <>
                <h1>{imgURL}</h1>
                <h1>Image uploaded successfully</h1>
            </>
        )
    }
}
