import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
  paper: {
    backgroundColor: '#09547a',
    padding: theme.spacing(5),
    marginBottom: theme.spacing(2),
    width: 500,
    textAlign: 'center',
    color: '#ffffff'
  },
  logo: {
    marginBottom: '15px',
    height: '130px'
  },
  titleText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 600
  },
  textBox: {
    color: '#FFFFFF'
  },
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
    color: '#76badd',
    textAlign: 'center'
  }
}));
