import { ReactNode } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  children: ReactNode;
  open: boolean;
  title: string;
}

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: '640px',
  },
}));

const ModalWrapper: React.VFC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      className={classes.paper}
      open={props.open}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>{props.title}</DialogTitle>
      {props.children}
    </Dialog>
  );
};

export default ModalWrapper;
