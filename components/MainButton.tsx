import Link from 'next/link';
import styles from './MainButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ComponentProps } from 'react';

export default function MainButton({ icon, href, content, color }:
  {
    icon: ComponentProps<typeof FontAwesomeIcon>['icon'], href: ComponentProps<typeof Link>['href'],
    content: string, color: string
  }) {
  return (
    <Link className={styles.btn}
      style={{
        '--dynamic-color': color
      } as React.CSSProperties}
      href={href}>
      <FontAwesomeIcon icon={icon} /> {content}
    </Link>
  );
}
