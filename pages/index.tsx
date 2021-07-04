import { useState, useCallback } from 'react';
import { Filter, List } from '../src/components';
import { FloatButton } from 'src/components/buttons/';
import styles from 'src/assets/styles/modules/Home.module.scss';
import { AddModal } from 'src/components/modals';

const home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <Filter />
      <div className={styles.container}>
        <List />
      </div>
      <AddModal open={isOpen} close={closeModal} title={'リストに追加'} />
      <FloatButton text={'リストに追加'} onClick={openModal} />
    </>
  );
};

export default home;
