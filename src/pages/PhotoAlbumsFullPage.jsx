import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageLightBox from "../components/ImageLightBox.jsx";
import Metatags from "../components/Metatags.jsx";

function PhotoAlbumsFullPage() {
    const { alias } = useParams();
    const [albumsNode, setAlbumsNode] = useState(null);

    const {
        data: albumsNodeData
    } = useDrupalData(`photoalbums/${alias}?_format=json`);

    useEffect(() => {
        if (albumsNodeData) {
            setAlbumsNode(albumsNodeData);
        }
    }, [albumsNodeData]);

    return (
        <>
            <Metatags type={"content"} data={albumsNodeData} />
            <div className="albums container">
                {albumsNode?.title?.map((item, index) => (
                    <div className="album-title" key={index}>
                        <h1>{item.value}</h1>
                    </div>
                ))}
                <ImageLightBox data={albumsNodeData}/>
            </div>
        </>
    );
}

export default PhotoAlbumsFullPage;
