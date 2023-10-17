import React, { useState, useEffect, useMemo } from 'react';

import axios from 'axios';


const Cards = ({ onMatch, onMismatch, matches, errors }) => {

    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Realiza una solicitud GET a la URL de las imágenes
        axios
            .get(
                'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
            )
            .then((response) => {
                // Si la solicitud es exitosa, actualiza el estado con las imágenes
                setImages(response.data.entries);
            })
            .catch((err) => {
                // Si hay un error, registra el error en el estado
                setError(err);
            });
    }, []);



    const [selected, setSelected] = useState([])
    const [opened, setOpened] = useState([])

    // Genera la lista de cartas solo una vez cuando se cargan las imágenes
    const imgs = useMemo(() => {
        return images.flatMap(item => [`1|${item.fields.image.url}`, `2|${item.fields.image.url}`]).sort(() => Math.random() - 0.5);
    }, [images]);

    const handleClick = (image) => {
        if (selected.length < 2) {
            setSelected(selected => selected.concat(image))
        }

    }

    useEffect(() => {
        if (selected.length === 2) {
            if (selected[0].split('|')[1] === selected[1].split('|')[1]) {
                // Las cartas coinciden, llama a la función de acierto
                onMatch();
                setOpened(opened => opened.concat(selected));
            } else {
                // Las cartas no coinciden, llama a la función de error
                onMismatch();
            }
            setTimeout(() => setSelected([]), 500);
        }
    }, [selected]);

    const handleMatch = () => {
        // Lógica para manejar un acierto (las dos cartas coinciden)
        // Puedes llamar a una función pasada por props para incrementar el contador de aciertos.
        onMatch();
    };

    const handleMismatch = () => {
        // Lógica para manejar un error (las dos cartas no coinciden)
        // Puedes llamar a una función pasada por props para incrementar el contador de errores.
        onMismatch();
        // También puedes agregar lógica para voltear las cartas nuevamente después de un tiempo.
    };

    let include = false;
    return (
        <div className="cards">
            {/* Marcador de aciertos y errores */}
            <div className="score">
                <h2>Aciertos: {matches}</h2>
                <h2>Errores: {errors}</h2>
            </div>
            <ul>
                {
                    imgs.map((image, index) => (
                        <li key={index} onClick={() => handleClick(image)}>

                            <div className='content'>
                                {include = selected.includes(image) || opened.includes(image)}
                                <div className={`front ${include ? 'flip-front' : ''}`}>
                                    <img src="/question.png" alt="icon" style={{ width: '105px', height: '105px' }} />
                                </div>
                                <div className={`back ${include ? 'flip-back' : ''}`}>
                                    <img src={image.split('|')[1]} alt="icon" style={{ width: '105px', height: '105px' }} />
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Cards;