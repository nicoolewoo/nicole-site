import React, { useState, useEffect } from 'react';
import cat from '../assets/images/cat.jpg';

/* functional component, displayImage holds image URL*/
const DraggableImage = ({ cat }) => {
    /* mouse pos stores mouse coord*/
    const [mousePos, setMousePos] = useState({ x: 0, y: 0});
    const [imageCenter, setImageCenter] = useState('0px, 0px');
    const [onImage, setOnImage] = useState(false);
    const [distX, setDistX] = useState(0);
    const [distY, setDistY] = useState(0);

    useEffect (() => {
        // updates mouse pos
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div>
            style={{
                height: '100vh',
                width: '100vw',
                backgroundImage: 'url(${displayImage})',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: imageCenter,
                backgroundSize: 'cover',
                position: 'relative',
            }}
            onMouseDown={(e) => {
                setOnImage(true);
                const backgroundPosition = window.getComputedStyle(e.target).getPropertyValue("background-position");
                const [bgX, bgY] = backgroundPosition.split(' ');
                setDistX(mousePos.x - parseInt(bgX));
                setDistY(mousePos.y - parseInt(bgY));
            }}
            onMouseUp={() => setOnImage(false)}
            onMouseMove={(e) => {
                if (onImage) {
                    setImageCenter(`${mousePos.x - distX}px ${mousePos.y - distY}px`);
                }
            }}
        </div>
    );
};
export default DraggableImage;