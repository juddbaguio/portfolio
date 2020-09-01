import React, {useState, useEffect, useCallback} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
export default function Home() {

  const [mobile_menu, setMobile] = useState(false);
  const [windowWidth, setWidth] = useState(() => {
      if(process.browser) {
          return window.innerWidth;
      }
  });

  const handleWindowResize = useCallback(event => {
      if(process.browser) {
          if(window.innerWidth > 840) {
              setWidth(window.innerWidth)
              setMobile(false);
          }
      }
  });

  useEffect(() => {
      window.addEventListener('resize', handleWindowResize);

      return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
  }, [windowWidth])

  const MobileMenuButton = () => {
    return (mobile_menu ?  <img onClick={() => setMobile(prevMobileMenu => !prevMobileMenu)} src="/close.svg" alt="hamburger" className={styles.logo} /> : <img onClick={() => setMobile(prevMobileMenu => !prevMobileMenu)} src="/hamburger.svg" alt="hamburger" className={styles.logo} />)
}

  const landing_variants = {
    visible:
      {
        opacity: 1,
        transition: {
          duration: 1
        }
      }
    ,
    hidden: {
      opacity: 0
    }
  }

  const DesktopMenu = () => {
    return (
      <>
          <motion.img src="/home_logo.svg" alt="home logo" />
          <motion.h1 style={{color: '#006F68', fontWeight: 500, textAlign: 'center'}}>I am the tinker you need.</motion.h1>
          <motion.div className={styles.desktopMenu}>
                      <Link href="/about"><a>About Me</a></Link>
                      <Link href="/"><a>Projects</a></Link>
                      <Link href="/"><a>Contacts</a></Link>
          </motion.div>
      </>
    )
  }

  const menu_variants = {
    visible: i => (
      {
        opacity: 1,
        transition: {
          delay: i*0.2
        }
      }
    ),
    hidden: {
      opacity: 0
    },
    hideContainer: {
      opacity: 0
    },
    container: {
      opacity: 1
    },
    exitMenu: i => (
      {
        opacity: 0,
        transition: {
          delay: 0.3 - i
        }
      }
    )
  }

  const MobileMenu = () => {
    return(
      <AnimatePresence>
        { mobile_menu && (<motion.div key="container" initial="hidden" animate="container" exit="hideContainer" variants={menu_variants} className={styles.MobileMenu}>
                      <Link href="/about"><motion.a custom={0} initial="hidden" animate="visible" variants={menu_variants}>About Me</motion.a></Link>
                      <Link href="/about"><motion.a custom={0} initial="hidden" animate="visible" variants={menu_variants}>Projects</motion.a></Link>
                      <Link href="/about"><motion.a custom={0} initial="hidden" animate="visible" variants={menu_variants}>Contacts</motion.a></Link>
        </motion.div>)}
      </AnimatePresence>
    )
  }

  return (
    <>
      <Head>
        <title>JMB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileMenuButton />
      <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.8}}} className={styles.container}>
          {!mobile_menu && <DesktopMenu />}
          <MobileMenu />
      </motion.div>
   </>
  )
}
