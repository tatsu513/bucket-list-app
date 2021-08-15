import styles from 'src/assets/styles/modules/FileUpload.module.scss';
import { AddPhotoAlternate } from '@material-ui/icons';

interface Props {
  id: string;
  index: number;
  path?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const FileUpload: React.VFC<Props> = (props) => {
  const imagePath = {
    backgroundImage: `url('${props.path}')`,
    backgroundSize: '100%',
  };
  return (
    <div className={styles.fileUploadBox}>
      <label className={styles.label} htmlFor={props.id} style={imagePath}>
        <input
          id={props.id}
          className={styles.input}
          type="file"
          onChange={(event) => props.onChange(event, props.index)}
        />
        <span className={styles.icon}>
          <AddPhotoAlternate />
        </span>
      </label>
    </div>
  );
};

export default FileUpload;
