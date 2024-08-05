"use client";

import { useState, useEffect, useCallback } from 'react';
import useCountries from '../hooks/UseCountries';
import gatoImage from '../cat.jpg';
import styles from "../page.module.css"
const Play = () => {
    const { countries, loading } = useCountries();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [score, setScore] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [timer, setTimer] = useState(15);
    const [username, setUsername] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const MAX_ATTEMPTS = 10;

    useEffect(() => {
        if (!loading && countries.length > 0) {
            selectRandomCountry();
        }
    }, [loading]);

    useEffect(() => {
        if (gameStarted && timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            handleGuess(false); 
        }
    }, [timer, gameStarted]);

    const selectRandomCountry = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * countries.length);
        setSelectedCountry(countries[randomIndex]);
        setTimer(15); 
    }, [countries]);

    const handleGuess = useCallback((isCorrect) => {
        setAttempts(prevAttempts => prevAttempts + 1);
        
        if (attempts >= MAX_ATTEMPTS) {
            setGameStarted(false);
            saveScoreToLocalStorage();
        } else {
            selectRandomCountry();
        }
        setUserGuess('');
    }, [attempts, selectRandomCountry]);

    const handleSubmitGuess = () => {
        const isCorrect = userGuess.toLowerCase() === selectedCountry.name.toLowerCase();
        setScore(prevScore => isCorrect ? prevScore + 10 : prevScore - 1);
        handleGuess(isCorrect);
    };

    const handleStartGame = () => {
        if (username.trim() === "") {
            alert("El campo no puede estar vacío.");
        } else {
        setGameStarted(true);
        setAttempts(0);
        setScore(0);
        selectRandomCountry();
        }
    };

    const saveScoreToLocalStorage = useCallback(() => {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ name: username, score });
        const sortedScores = highScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 15);
        localStorage.setItem('highScores', JSON.stringify(sortedScores));
    }, [username, score]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            {!gameStarted ? (
                <div>
                    <h1>Guess the Country</h1>
                    {attempts >= MAX_ATTEMPTS && <p>Terminaste! Tu puntaje fue: {score+1}</p>}
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button onClick={handleStartGame}>Start Game</button>
                </div>
            ) : (
                <div>
                    <h1>Guess the Country</h1>
                    {selectedCountry && (
                        <>
                            <img
                                src={attempts  === MAX_ATTEMPTS ? gatoImage.src : selectedCountry.flag}
                                alt={attempts  === MAX_ATTEMPTS ? "Special Image" : `Flag of ${selectedCountry.name}`}
                                style={{ width: '400px', height: '300px' }}
                            />
                            <input
                                type="text"
                                value={userGuess}
                                onChange={(e) => setUserGuess(e.target.value)}
                            />
                            <button
                                onClick={handleSubmitGuess}
                            >
                                Submit Guess
                            </button>
                            <p>Score: {score}</p>
                            <p>Timer: {timer}s</p>
                            <p>Attempts: {attempts}/{MAX_ATTEMPTS}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Play;
