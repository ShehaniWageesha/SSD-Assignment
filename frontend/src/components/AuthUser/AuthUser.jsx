import * as yup from 'yup';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { withStyles } from 'tss-react/mui';
import { yupResolver } from '@hookform/resolvers/yup';

let validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required()
});

const CssTextField = withStyles(TextField, () => ({
  root: {
    '& .MuiInputLabel-root': {
      color: '#cccccc'
    },
    '& .MuiTextField-root': {
      color: '#ffffff'
    },
    '& .MuiFormHelperText-root': {
      color: '#ff6161'
    },
    '& label.Mui-focused': {
      color: '#cccccc'
    },
    '& .MuiInputBase-input': {
      color: '#ffffff'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#034d09'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#cccccc'
      },
      '&:hover fieldset': {
        borderColor: '#35abe6'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#35abe6'
      }
    }
  },
  input: {
    color: '#1a1a1a'
  }
}));

export const AuthUser = () => {
  const { classes } = useStyles();
  let navigate = useNavigate();
  const isFirstRender = useRef(true);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [userProfile, setUserProfile] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }

    localStorage.setItem('user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }

    //Route to change the site to specific user
    if (success) {
      if (userProfile.userType == 'Admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [success]);

  const onSubmitHandler = (data) => {
    axios
      .post('https://jikoo-webapp-backend.herokuapp.com/api/v1/user/signin', {
        userEmail: data.email,
        password: data.password
      })
      .then((response) => {
        if (response.data.status === parseInt('401')) {
          console.log('response: Wrong user name or password.');
          setErrMsg('Incorrect email or password.');
        } else {
          setSuccess(true);
          setUserProfile(response.data);
        }
        // console.log('response: ' + response.data.user.token);
        // navigate('/dashboard');
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Wrong user name or password.');
        } else {
          setErrMsg('Login Failed');
        }
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Grid container spacing={0} direction="column" alignItems="center" marginTop={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.titleText}>
            LOGIN
          </Typography>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  {...register('email')}
                  id="email"
                  name="email"
                  label="Email"
                  // value={email}
                  // onInput={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  {...register('password')}
                  id="password"
                  name="password"
                  label="Password"
                  // value={password}
                  // onInput={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  helperText={errors.password?.message}
                  type={showPassword ? 'text' : 'password'}
                  // type="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: '#ffffff' }}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Typography
                variant="caption"
                sx={{ color: '#ff6161', marginTop: '10px', marginLeft: '20px' }}>
                {errMsg}
              </Typography>
            </Grid>
            <Button type="submit" fullWidth variant="contained" className={classes.btn}>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
      {/* <Typography align="center" variant="caption" marginTop={5} className={classes.copyrightText}>
        © Jikoo.com. All rights reserved.
      </Typography> */}
    </div>
  );
};
