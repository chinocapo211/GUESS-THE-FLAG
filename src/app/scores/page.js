"use client";

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
const ScoresPage = () => {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('highScores')) || [];
        
        const sortedScores = savedScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 15);

        setHighScores(sortedScores);
    }, []);

    return (
        <div className={styles["container2"]}>
            <h1>High Scores</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '2px solid #000', padding: '10px', textAlign: 'left' }}>Name</th>
                        <th style={{ borderBottom: '2px solid #000', padding: '10px', textAlign: 'left' }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {highScores.map((score, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{score.name}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScoresPage;
