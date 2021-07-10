import Link from 'next/link';
import styles from 'src/assets/styles/modules/TextLink.module.scss';

interface Props {
  href: string;
  text: string;
}

const TextLink: React.VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className={styles.textLink}>{props.text}</a>
    </Link>
  );
};

export default TextLink;
