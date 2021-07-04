import { useState, useCallback } from 'react';
import { Filter, List } from '../src/components';
import styles from 'src/assets/styles/modules/Home.module.scss';
import AddModal from 'src/components/modals/addModal';

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
      <div onClick={openModal}>オープン</div>
      <AddModal open={isOpen} close={closeModal} title={'リストに追加'} />
    </>
  );
};

export default home;
