import * as yup from 'yup';

import { Box, Button, Container, Drawer, Grid, Stack, TextField, Typography } from '@mui/material/';
import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FormControl from '@mui/material/FormControl';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NavigationSection from '../NavigationBar';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { withStyles } from 'tss-react/mui';
import { yupResolver } from '@hookform/resolvers/yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let validationSchema = yup.object().shape({
  userName: yup.string().required(),
  userEmail: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  userPhone: yup.string().matches(phoneRegExp, 'Phone number is not valid')
});

const NAV_WIDTH = 280;

const navConfig = [
  {
    title: 'dashboard',
    icon: <DashboardIcon />,
    path: '/admin'
  },
  {
    title: 'add users',
    icon: <GroupAddIcon />,
    path: '/add-user'
  }
];

const account = {
  displayName: 'Jaydon Frankie',
  role: 'Admin'
};

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  backgroundColor: '#f9fafb'
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '95vh',
  backgroundColor: '#f9fafb',
  paddingTop: 50,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2)
}));

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12)
}));

const CssSelect = withStyles(Select, () => ({
  root: {
    '& .MuiSelect-select': {
      color: '#544f4f'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#034d09',
      '&:hover': {
        borderColor: '#35abe6'
      }
    }
  }
}));

const CssTextField = withStyles(TextField, () => ({
  root: {
    '& .MuiInputLabel-root': {
      color: '#034d09'
    },
    '& .MuiTextField-root': {
      color: '#544f4f'
    },
    '& .MuiFormHelperText-root': {
      color: '#ff6161'
    },
    '& label.Mui-focused': {
      color: '#034d09'
    },
    '& .MuiInputBase-input': {
      color: '#544f4f'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#034d09'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#034d09'
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
    color: '#544f4f'
  }
}));

export const AddNewUser = () => {
  const { classes } = useStyles();
  let navigate = useNavigate();
  const [role, setRole] = React.useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitHandler = (data) => {
    console.log({ data });

    axios
      .post('https://localhost:3000/api/v1/user/signup', {
        userName: data.fullname,
        userEmail: data.email,
        userBirthday: '1990-09-27',
        userGender: 'Male',
        password: data.password,
        userPhone: data.mobile,
        userAddress: 'Sri Lanka',
        userType: role,
        createdDate: '2020-07-25'
      })
      .then((response) => {
        console.log('response: ' + response);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
      </Box>

      <Box sx={{ mb: 3, mx: 2 }}>
        <StyledAccount>
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: '600' }}>
              {account.displayName}
            </Typography>

            <Typography variant="caption" sx={{ color: '#cd6afd', fontWeight: '600' }}>
              {account.role}
            </Typography>
          </Box>
        </StyledAccount>
      </Box>

      <NavigationSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10, textAlign: 'center' }}>
        <Typography
          align="center"
          variant="caption"
          marginTop={5}
          className={classes.copyrightText}>
          © Jikoo.com. All rights reserved.
        </Typography>
      </Box> */}
    </>
  );

  const onLogout = () => {
    console.log('test');
    navigate('/');
  };

  return (
    <StyledRoot>
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH }
        }}>
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#544f4f',
              borderRightStyle: 'dashed',
              borderColor: '#CCCCCC'
            }
          }}>
          {renderContent}
        </Drawer>
      </Box>
      <Main>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={4}>
            <Typography
              variant="h4"
              sx={{ fontSize: '2rem', fontWeight: '700', color: 'rgb(33, 43, 54)' }}>
              Add New User
            </Typography>
            <Button variant="contained" sx={{ fontWeight: '600' }} onClick={onLogout}>
              Logout
            </Button>
          </Stack>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid
              container
              xs={12}
              spacing={2}
              sx={{
                bgcolor: '#FFFFFF',
                padding: '30px',
                mt: 3,
                borderRadius: '5px',
                boxShadow: '1px 1px 5px #a8a8a8'
              }}>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  {...register('fullname')}
                  id="fullname"
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  helperText={errors.fulname?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  {...register('email')}
                  id="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  {...register('password')}
                  id="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  helperText={errors.password?.message}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: '#034d09' }}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  {...register('repassword')}
                  id="user-con-pass"
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                  helperText={errors.repassword?.message}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: '#034d09' }}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  {...register('mobile')}
                  id="mobile"
                  label="Mobile Number"
                  variant="outlined"
                  margin="normal"
                  helperText={errors.mobile?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ marginTop: '15px' }}>
                  <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                  <CssSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Select Role"
                    onChange={handleChange}>
                    <MenuItem value={'manager'}>Manager</MenuItem>
                    <MenuItem value={'employee'}>Employee</MenuItem>
                  </CssSelect>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#034d09',
                    padding: '10px',
                    fontWeight: '600',
                    '&:hover': { backgroundColor: '#544f4f' }
                  }}>
                  Reset
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#09547a',
                    padding: '10px',
                    fontWeight: '600',
                    '&:hover': { backgroundColor: '#35abe6' }
                  }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Main>
    </StyledRoot>
  );
};
