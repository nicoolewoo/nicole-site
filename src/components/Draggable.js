import React, { useState, useEffect } from 'react';
import cat from '../assets/images/cat.jpg';
import fish from '../assets/images/fish.jpg';

const DraggableImage = () => {
    // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false); //track if dragging
    const [draggingImage, setDraggingImage] = useState(null); // Track which image is being dragged
    const [offset, setOffset] = useState({ x: 0, y: 0 }); //so dragged on click position
    const [imgPos, setImgPos] = useState([
        { id: 'cat', x: 50, y: 100, src: cat },
        { id: 'fish', x: 200, y: 200, src: fish },
    ]); //initial positions and dragged positions

    useEffect(() => { //i want img to stay when switchin pages
        const savedPositions = JSON.parse(localStorage.getItem('imagePositions'));
        if (savedPositions) {
            setImgPos(savedPositions);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('imagePositions', JSON.stringify(imgPos));
    }, [imgPos]); // Whenever imgPos changes, save to localStorage

    useEffect(() => {
        const handleMouseMove = (event) => {
            if ((dragging === true) && draggingImage !== null) {
                setImgPos((prev) =>
                    prev.map((img) =>
                        img.id === draggingImage
                            ? { ...img, x: event.clientX - offset.x, y: event.clientY - offset.y }
                            : img
                    )
                );
            }
        };

        const handleMouseUp = () => {
            setDragging(false)
            setDraggingImage(null); // Stop dragging when mouse is released
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp); 

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, draggingImage, offset, imgPos],);

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            {imgPos.map((img) => (
                <img
                    key={img.id}
                    src={img.src}
                    alt={img.id}
                    style={{
                        position: 'absolute',
                        left: `${img.x}px`,
                        top: `${img.y}px`,
                        width: '100px',
                        height: 'auto',
                        // cursor: draggingImage === img.id ? 'grabbing' : 'grab',
                    }}
                    onMouseDown={(e) => { //better to put here so i dont have to calculate which img i click
                        e.preventDefault();
                        setDragging(true);
                        setDraggingImage(img.id);
                        setOffset({ x: e.clientX - img.x, y: e.clientY - img.y });
                    }}
                />
            ))}
        </div>
    );
};

export default DraggableImage;
