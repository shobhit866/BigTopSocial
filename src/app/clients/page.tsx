"use client"

import { useEffect } from 'react'
import styles from './clients.module.css'
import BrandLogo from '../../components/brandlogo'

// Use actual files placed in public/clientlogo/ — filenames include extensions
const logos = [
    '3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','sd logo final.jpg'
]

export default function Clients() {
    useEffect(() => {
        // remove the large header placeholder so the banner can sit flush to the top
        document.body.classList.add('page-header-placeholder')
        return () => document.body.classList.remove('page-header-placeholder')
    }, [])
    return (
        <>
            {/* Top half reserved for demo video (falls back to poster image) */}
            <div className={styles.banner} aria-hidden="true">
                <video
                    className={styles.bannerVideo}
                    src="/videos/Banner-Video.mp4"
                    poster="/clientlogo/poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                /> 
                      <div style={{position:'absolute',display: 'flex', justifyContent: 'center', top: '78%', width: '100%'}}>
                      <button type="submit" className="contact-submit">Chat with us</button>
                      </div>      
                 </div>

            {/* Example BrandLogo rendered for demonstration */}
            <BrandLogo src="/brandlogo.png" alt="Bigtop Social" text="Bigtop Social" href="/" />
               
            

            <section className={styles.clientsSection}>
                <div className="container">
                    <h1 className={styles.title}>Our Happy Clients!<span className={styles.heart} aria-hidden="true"></span></h1>

                    <div className={styles.grid} role="list">
                        {logos.map((name) => (
                            <div key={name} className={styles.logoWrap} role="listitem">
                                <img src={`/clientlogo/${name}`} alt={`${name} logo`} className={styles.logo} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}