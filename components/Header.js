import React, {useState, useEffect,useCallback} from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import {motion} from 'framer-motion';

const Header = ({path}) => {

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
        return (mobile_menu ?  <img onClick={() => setMobile(prevMobileMenu => !prevMobileMenu)} src="/close.svg" alt="hamburger" className={styles.hamburger} /> : <img onClick={() => setMobile(prevMobileMenu => !prevMobileMenu)} src="/hamburger.svg" alt="hamburger" className={styles.hamburger} />)
    }

    const MobileMenu = () => {
        return(
            <div className={styles.MobileMenu}>
                <Link href="/about"><a style={path === '/about' ? pathStyle:null}>About Me</a></Link>
                <Link href="/"><a style={path === '/projects' ? pathStyle:null}>Projects</a></Link>
                <Link href="/"><a style={path === '/contacts' ? pathStyle:null}>Contacts</a></Link>
            </div>
        )
    }

    const variants = {
        visible: {
            opacity: 1,
            transition: {
                delay: 2,
                duration: 0.5
            }
        },
        hidden: {
            opacity: 0
        }
    }

    const pathStyle = {
        color: '#FFFFFF',
        backgroundColor: '#006F68'
    };

    return(
        <motion.div initial="hidden" animate="visible" variants={variants} className={styles.parent}>
            <div className={styles.container}>
                <Link href="/"><img src='/jmb_logo.svg' alt="me" className={styles.logo} style={{cursor: 'pointer'}}/></Link>
                <MobileMenuButton />
                <div className={styles.desktopMenu}>
                    <Link href="/about"><a style={path === '/about' ? pathStyle:null}>About Me</a></Link>
                    <Link href="/"><a style={path === '/projects' ? pathStyle:null}>Projects</a></Link>
                    <Link href="/"><a style={path === '/contacts' ? pathStyle:null}>Contacts</a></Link>
                </div>
            </div>
            {mobile_menu && <MobileMenu/>}
        </motion.div>
    )
}

export default Header;