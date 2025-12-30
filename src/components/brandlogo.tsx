import Link from 'next/link';
import React from 'react';
import styles from './brandlogo.module.css';

export type BrandLogoProps = {
  src?: string;
  alt?: string;
  text?: string;
  href?: string;
  className?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

export default function BrandLogo({
  src = '/brandlogo.png',
  alt = 'Brand logo',
  text,
  href,
  className = '',
  imgProps,
}: BrandLogoProps) {
  const inner = (
    <>
      <img src={src} alt={alt} className={styles['brand-logo']} {...imgProps} />
      {text ? <span className={styles['brand-text']}>{text}</span> : null}
    </>
  );

  const targetHref = href ?? '/';

  return (
    <Link href={targetHref} className={`${styles.brand} ${className}`.trim()}>
      {inner}
    </Link>
  );
}