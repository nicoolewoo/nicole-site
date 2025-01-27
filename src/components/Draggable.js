import React, { useState, useEffect } from 'react';
import cat from '../assets/images/cat.jpg';
import fish from '../assets/images/fish.jpg';

/* functional component, displayImage holds image URL*/
const DraggableImage = () => {
    /* mouse pos stores mouse coord*/
    const [mousePos, setMousePos] = useState({ x: 0, y: 0});
    const [imageCenter, setImageCenter] = useState('0px, 0px');
    const [onImage, setOnImage] = useState(false);
    const [distX, setDistX] = useState(0);
    const [distY, setDistY] = useState(0);
    //store inital image positions
    const [imgPos, setImgPos] = useState([
        { id: 'cat', x: 50, y: 100 },
        { id: 'fish', x: 200, y: 200 },
    ]);

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
        <div
            style={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${cat})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: imageCenter,
                backgroundSize: '20%',
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
        ></div>
    );
};
export default DraggableImage;
