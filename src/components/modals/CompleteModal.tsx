import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from 'src/assets/styles/modules/CompleteModal.module.scss';
import {
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core/';
import { ModalWrapper } from './';
import { PrimayButton, ThirdaryButton } from 'src/components/buttons';
import { FileUpload, TextField, TextErea } from 'src/components/forms';
import { getDateFrom8Digit, getToday } from 'src/util/convertDate';
import { getFeatureAge } from 'src/util/convertAge';
import { CompletedItem, FixedData, Image, Item, User } from 'src/types';
import { createRandomValue } from 'src/util/common';
import { FirebaseTimestamp, storage } from 'src/firebase';
import { completeItem } from 'src/api';

interface Props {
  item: Item;
  user: User;
  open: boolean;
  close: () => void;
}

const CompleteModal: React.VFC<Props> = (props) => {
  const router = useRouter();
  const [limitDate, setLimitDate] = useState('');
  const [dateLimitDate, setDateLimitDate] = useState<Date | null>(null);
  const [displayAge, setDisplayAge] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [numberOfUploadErea, setNumberOfUploadErea] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<Image[] | never[]>([]);

  const inputComment = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.currentTarget.value);
    },
    [setComment],
  );

  const selectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (!event.target.files) return;
      const selectedFile = event.target.files[0];
      const fileName = createRandomValue();
      setFile(selectedFile);

      const uploadRef = storage.ref('images').child(fileName);
      const uploadTask = uploadRef.put(selectedFile);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          setImages((prevState) => {
            prevState[index] = newImage;
            return [...prevState];
          });
          if (images.length < 3) {
            setNumberOfUploadErea(images.length + 1);
          }
        });
      });
    },
    [images, file],
  );

  const inputLimitDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setLimitDate(value);
      if (value.match(/\d.*/g) && value.length === 8) {
        const newDate = getDateFrom8Digit(value);
        setDateLimitDate(newDate);
        if (newDate) setDisplayAge(getFeatureAge(newDate, props.user.age));
      } else {
        setDateLimitDate(null);
        setDisplayAge(null);
      }
    },
    [props.user.age, limitDate],
  );

  const completeAction = useCallback(() => {
    if (!dateLimitDate || !displayAge || !dateLimitDate) return;
    const updateData: CompletedItem = {
      completedAt: dateLimitDate,
      images: images,
      limitAge: props.item.limitAge ? props.item.limitAge : displayAge,
      limitDate: props.item.limitDate ? props.item.limitDate : dateLimitDate,
      status: 'completed',
      comment: comment,
      updatedAt: FirebaseTimestamp.now(),
    };
    const fixData: FixedData = { ...props.item, ...updateData };
    completeItem(props.user.uid, props.item.itemId, fixData).then(() =>
      router.push('/'),
    );
  }, [comment, images, limitDate, displayAge]);

  useEffect(() => {
    setLimitDate(getToday());
    setDateLimitDate(getDateFrom8Digit(getToday()));
    setDisplayAge(getFeatureAge(new Date(), props.user.age));
  }, []);

  return (
    <ModalWrapper open={props.open} title={'アイテムを完了'}>
      <DialogContent>
        <div className={styles.leadText}>
          <DialogContentText>
            『{props.item.title}』を完了します。
          </DialogContentText>
        </div>
        <div className={`${styles.item} ${styles.itemFlex}`}>
          <div className={styles.item__half}>
            <TextField
              label={'達成日（例：2030年10月1日 → 20301001）'}
              placeholder={'達成日を入力'}
              type={'number'}
              value={limitDate}
              onChange={inputLimitDate}
            />
          </div>
          <span className={styles.item__old}>あなたの年齢：{displayAge}歳</span>
        </div>
        <div className={styles.item}>
          <div className={styles.itemTitle}>達成記念写真（最大3枚まで）</div>
          <div className={styles.uploadWrap}>
            {[...Array(numberOfUploadErea)].map((_, i) => (
              <div className={styles.uploadItem} key={i}>
                <FileUpload
                  id={`upload-0${i}`}
                  index={i}
                  onChange={selectFile}
                  path={images[i] ? images[i].path : '#'}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.item}>
          <TextErea
            label={'達成コメント'}
            placeholder={'達成コメントを入力'}
            rows={5}
            value={comment}
            onChange={inputComment}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <ThirdaryButton text={'キャンセル'} onClick={props.close} />
        <PrimayButton
          text={'アイテムを完了'}
          disabled={false}
          onClick={completeAction}
        />
      </DialogActions>
    </ModalWrapper>
  );
};

export default CompleteModal;
