import React from 'react';
import styles from './page.module.css'; 
const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenidos a Guess the Flag!</h1>
      <h3 className={styles.description}>
        Un juego de intelecto en el cual uno tendrá que adivinar a qué país 
        pertenece la bandera, batallando violentamente por el mejor puntaje. 
        Tengan en cuenta que los nombres deben ser ingresados en inglés. ¡Suerte!
      </h3>
      <div className={styles.links}>
        <a href="./play" className={styles.link}>Inicio</a>
        <a href="./scores" className={styles.link}>View High Scores</a>
      </div>
    </div>
  );
};

export default Home;
