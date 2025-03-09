import { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function Gallery() {

    const [images, setImages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(null);
    useEffect(() => {
        fetch('https://picsum.photos/v2/list')
            .then(response => response.json())
            .then(data => setImages(data));
    }, []);

    useEffect(() => {
        if (photoIndex !== null) setIsOpen(true);
        console.log(photoIndex);
    }, [photoIndex])
    return (<>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images && images.map((image, index) => (
                <img key={index} src={image.download_url} loading='lazy' className='w-full h-60 object-cover rounded-lg shadow-md'
                    onClick={() => {
                        setPhotoIndex(index);
                    }} />

            ))}
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-900 my-6">Gallery</h1>
                <Gallery />
            </div>
            {
                isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex].download_url}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((prev) => (prev + images.length - 1) % images.length)
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((prev) => (prev + 1) % images.length)
                        }
                    />
                )
            }
        </div>
    </>);
}

export default Gallery;