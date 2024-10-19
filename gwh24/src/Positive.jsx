import './styles.css'
import React, { useState, useEffect } from 'react';

function Positive() {
    const [animalImage, setAnimalImage] = useState(null);

    const fetchAnimalImage = async () => {
        try {
            const animalTypes = [
                'https://dog.ceo/api/breeds/image/random',
                'https://api.thecatapi.com/v1/images/search',
                'https://some-random-api.ml/animal/kangaroo'
            ];

            const randomAnimalUrl = animalTypes[Math.floor(Math.random() * animalTypes.length)];
            const response = await fetch(randomAnimalUrl);
            const json = await response.json();

            if (randomAnimalUrl.includes('dog.ceo')) {
                setAnimalImage(json.message);
            } else if (randomAnimalUrl.includes('thecatapi')) {
                setAnimalImage(json[0].url);
            } else {
                setAnimalImage(json.image);
            }
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
            <p>Glad you are well! Enjoy this animal picture</p>
            {animalImage ? (
                <div>
                    <img src={animalImage} alt="Funny Animal" style={{maxHeight: '200px'}}/>
                </div>
            ) : (
                <p>Loading animal picture...</p>
            )}
            <button onClick={fetchAnimalImage}>Generate New Animal Picture</button>
        </div>
    );
}

export default Positive