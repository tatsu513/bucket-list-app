import styles from 'src/assets/styles/modules/FileUpload.module.scss';
import { AddPhotoAlternate } from '@material-ui/icons';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.VFC<Props> = (props) => {
  return (
    <div className={styles.fileUploadBox}>
      <label className={styles.label} htmlFor="aaa">
        <input
          id="aaa"
          className={styles.input}
          type="file"
          onChange={(event) => props.onChange(event)}
        />
        <span className={styles.icon}>
          <AddPhotoAlternate />
        </span>
      </label>
    </div>
  );
};

export default FileUpload;
