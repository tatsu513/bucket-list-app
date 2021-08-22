import React, { useCallback } from 'react';
import styles from 'src/assets/styles/modules/contact.module.scss';
import { PageTitle, PageWrapper } from 'src/components';
import { ContactSupport } from '@material-ui/icons';
import { TextErea, TextField } from 'src/components/forms';
import { useState } from 'react';
import { PrimayButton } from 'src/components/buttons';
const contact: React.VFC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const inputName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
    },
    [],
  );
  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value);
    },
    [],
  );
  const inputContent = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.currentTarget.value);
    },
    [],
  );
  return (
    <PageWrapper>
      <PageTitle title={'お問合せ'}>
        <ContactSupport fontSize={'inherit'} />
      </PageTitle>
      <div className={styles.item}>
        <TextField
          label={'お名前'}
          placeholder={'お名前を入力'}
          type={'text'}
          value={name}
          onChange={inputName}
        />
      </div>
      <div className={styles.item}>
        <TextField
          label={'メールアドレス'}
          placeholder={'メールアドレスを入力'}
          type={'text'}
          value={email}
          onChange={inputEmail}
        />
      </div>
      <div className={styles.item}>
        <TextErea
          label={'備考'}
          placeholder={'備考を入力'}
          rows={5}
          value={content}
          onChange={inputContent}
        />
      </div>
      <div className={styles.controller}>
        <PrimayButton text={'送信'} onClick={() => alert('送信')} />
      </div>
    </PageWrapper>
  );
};

export default contact;
