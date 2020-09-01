import React from 'react';
import styles from '../styles/About.module.css';
import Card from '../components/Card';
import cardStyles from '../components/card.module.css';
import {motion} from 'framer-motion';
import Header from '../components/Header';
import {useRouter} from 'next/router';
import Head from 'next/head';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


export default function About() {
    const details = [
        {
            question: 'Who am I?',
            answer: `I am Judd Misael R. Baguio,
            an Electrical Engineering graduate and
            highly-motivated full stack web developer
            from Philippines.`
        },
        {
            question: 'How do I work?',
            answer: `I always listen to the clients’ business problems and its proposed solutions first. If I come across a light bulb while doing my project, I suggest it to them on how I can improve their solutions.
            `
        }
    ]

    const router = useRouter();

    const variants = {
        visible: i => ({
          opacity: 1,
          transition: {
            delay: i * 0.5,
          },
        }),
        hidden: { opacity: 0 },
      }

    return(
        <>
        <Head>
            <title>About Me</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header path={router.pathname} />
        <div className={styles.container}>
            <div style={{width: '90%', margin: '0 auto'}}>
                <ResponsiveMasonry columnsCountBreakPoints={{834: 1, 835: 2}}>
                    <Masonry gutter="30">
                            <motion.div custom={0} initial="hidden" animate="visible" variants={variants} style={{display: 'flex', justifyContent: 'center', marginBottom: 30}}>
                                <img src="/me.png" alt="me" style={{width: 300, borderRadius: 600}}/>
                            </motion.div>
                            <motion.div custom={1} initial="hidden" animate="visible" variants={variants}><Card question={details[0].question} answer={details[0].answer} /></motion.div>
                            <motion.div custom={2} initial="hidden" animate="visible" variants={variants}><Card question={details[1].question} answer={details[1].answer} /></motion.div>
                            <motion.div custom={3} initial="hidden" animate="visible" variants={variants}>
                                <div className={cardStyles.container}>
                                    <div className={cardStyles.question}><h1>What techs am I using?</h1></div>
                                    <div className={cardStyles.answer}>
                                        <p>-HTML</p>
                                        <p>-CSS</p>
                                        <p>-JavaScript</p>
                                        <p>-React/Next.js</p>
                                        <p>-Node.js/Express</p>
                                        <p>-MongoDB</p>
                                        <p>-PostgreSQL</p>
                                    </div>
                                </div>
                            </motion.div>
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
        </>
    )
}