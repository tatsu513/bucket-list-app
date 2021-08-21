import styles from 'src/assets/styles/modules/ProfileEditModal.module.scss';
import { ModalWrapper } from './';
import { useRouter } from 'next/router';
import { DialogContent, DialogActions } from '@material-ui/core/';
import { PrimayButton, ThirdaryButton } from '../buttons';
import { Radio, TextField } from '../forms';
import { useEffect, useState, useCallback } from 'react';
import { getGenders, updateUser } from 'src/api';
import { Options, User } from 'src/types';
import { FirebaseTimestamp } from 'src/firebase';
import { convertTo8Digit, getDateFrom8Digit } from 'src/util/convertDate';

interface Props {
  open: boolean;
  close: () => void;
  user: User;
}

const ProfileEditModal: React.VFC<Props> = (props) => {
  const router = useRouter();

  const [username, setUsername] = useState(props.user.username);
  const [birthday, setBirthday] = useState(
    convertTo8Digit(new Date(props.user.birthday.toDate())),
  );
  const [dateBirthDay, setDateBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState(props.user.gender);
  const [genders, setGenders] = useState<Options[] | never[]>([]);
  const [selectedGender, setSelectedGender] = useState(props.user.gender);

  const inputUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [username],
  );
  const inputBirthday = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBirthday(event.target.value);
      if (event.target.value.length === 8) {
        setDateBirthday(getDateFrom8Digit(event.target.value));
      } else {
        setDateBirthday(null);
      }
    },
    [birthday, dateBirthDay],
  );
  const selectGender = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedGender(event.currentTarget.value);
      setGender(event.currentTarget.value);
    },
    [gender],
  );
  const isValidateInputs = () => {
    return username === '' || !dateBirthDay || gender === '';
  };
  const updateAction = useCallback(() => {
    if (!dateBirthDay) return;
    const data = {
      username: username,
      birthday: FirebaseTimestamp.fromDate(dateBirthDay),
      gender: gender,
    };
    updateUser(props.user.uid, { ...props.user, ...data }).then(() => {
      props.close();
    });
  }, [username, birthday, gender]);
  useEffect(() => {
    getGenders().then((genders) => setGenders(genders));
  }, []);
  useEffect(() => {
    const dateValue = convertTo8Digit(new Date(props.user.birthday.toDate()));
    setDateBirthday(getDateFrom8Digit(dateValue));
  }, [props.user]);
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
                  id={String(gender.genderId)}
                  selectedValue={selectedGender}
                  label={gender.name}
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
        <PrimayButton
          disabled={isValidateInputs()}
          text={'保存'}
          onClick={updateAction}
        />
      </DialogActions>
    </ModalWrapper>
  );
};

export default ProfileEditModal;
