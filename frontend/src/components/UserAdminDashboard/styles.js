import { makeStyles } from 'tss-react/mui';

export default makeStyles()(() => ({
  btn: {
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#35abe6',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#09547a'
    }
  },
  copyrightText: {
    color: '#76badd'
  }
}));
