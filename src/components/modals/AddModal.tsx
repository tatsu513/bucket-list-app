import React, { useState } from 'react';
// import {
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   DialogContentText,
//   Button,
// } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons/';

interface Props {
  title: string;
  open: boolean;
  close: any;
}

const AddModal: React.VFC<Props> = (props) => {
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">リストに追加</DialogTitle>
      <DialogContent>
        <DialogContentText>
          バケットリストに追加したい内容を入力してください。設定した内容はいつでも変更ができます。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.close}>
          Cancel
        </Button>
        <Button color="primary">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
