import React from 'react';
import styles from './card.module.css';
export default function Card({question, answer}) {
    return(
        <div className={styles.container}>
            <div className={styles.question}><h1>{question}</h1></div>
            <div className={styles.answer}><p>{answer}</p></div>
        </div>
    )
}