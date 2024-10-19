import './styles.css'
import React, { useState, useEffect } from 'react';

function Positive() {
    const [animalImage, setAnimalImage] = useState(null);

    const fetchAnimalImage = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const json = await response.json();
            setAnimalImage(json.message);
        } catch (error) {
            console.error('Error fetching animal image:', error);
        }
    };

    useEffect(() => {
        fetchAnimalImage();
    }, []);

    return (
        <div>
            <h1>Positive Sentiment Detected!</h1>
            {animalImage ? (
                <div>
                    <img src={animalImage} alt="Funny Animal" style={{ maxHeight: '200px' }} />
                </div>
            ) : (
                <p>Loading animal picture...</p>
            )}
            <button onClick={fetchAnimalImage}>Generate New Animal Picture</button>
        </div>
    );
}

export default Positive