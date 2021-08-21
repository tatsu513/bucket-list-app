import styles from 'src/assets/styles/modules/ProfileEditModal.module.scss';
import { ModalWrapper } from './';
import { DialogContent, DialogActions } from '@material-ui/core/';
import { PrimayButton, ThirdaryButton } from '../buttons';
import { Radio, TextField } from '../forms';
import { useEffect, useState, useCallback } from 'react';
import { getGenders } from 'src/api';
import { Gender } from 'src/types';

interface Props {
  open: boolean;
  close: () => void;
}

const ProfileEditModal: React.VFC<Props> = (props) => {
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [dateBirthDay, setDateBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [genders, setGenders] = useState<Gender[] | never[]>([]);
  const [selectedGender, setSelectedGender] = useState('');

  const inputUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [username],
  );
  const inputBirthday = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBirthday(event.target.value);
    },
    [username],
  );
  const selectGender = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedGender(event.currentTarget.value);
      setGender(event.currentTarget.value);
    },
    [],
  );
  const isValidateInputs = () => {
    const isInvalidBirthday = !dateBirthDay;
    return username === '' || isInvalidBirthday || gender === '';
  };
  useEffect(() => {
    getGenders().then((genders) => setGenders(genders));
  }, []);
  return (
    <ModalWrapper open={props.open} title={'プロフィールを編集'}>
      <DialogContent>
        <div className={styles.item}>
          <TextField
            label={'ユーザーネーム'}
            placeholder={'ユーザーネームを入力'}
            type={'text'}
            value={username}
            onChange={inputUsername}
          />
        </div>
        <div className={styles.item}>
          <TextField
            label={'誕生日（例：2000年10月1日 → 20001001）'}
            placeholder={'誕生日を入力'}
            type={'number'}
            value={birthday}
            onChange={inputBirthday}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>性別</label>
          {genders.map((gender) => {
            return (
              <span key={gender.genderId} className={styles.radioItem}>
                <Radio
                  id={gender.genderId}
                  selectedValue={selectedGender}
                  label={gender.genderType}
                  name={'gender'}
                  onChange={selectGender}
                />
              </span>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <ThirdaryButton text={'キャンセル'} onClick={props.close} />
        <PrimayButton text={'保存'} onClick={() => alert('保存')} />
      </DialogActions>
    </ModalWrapper>
  );
};

export default ProfileEditModal;
