import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import Flag from 'react-flagkit';
import Avatar from '@material-ui/core/Avatar';
import { SignUpProps } from '../SignUp';
import LANGUAGES from './languages';

interface Props {
  handleSubmit: (
    { primaryLanguage, email, password }: SignUpProps,
    { setStatus, setSubmitting }: FormikHelpers<SignUpProps>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  const signUpValidationSchema = Yup.object().shape({
    primaryLanguage: Yup.string().required('Language is required'),
    email: Yup.string().required('Email is required').email('Email is not valid'),
    password: Yup.string()
      .required('Password is required')
      .max(100, 'Password is too long')
      .min(6, 'Password too short'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        primaryLanguage: 'English',
      }}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="email"
            label={<Typography className={classes.label}>E-mail address</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="email"
            autoComplete="email"
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label={<Typography className={classes.label}>Password</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
              style: { fontSize: 30 },
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
          />

          <InputLabel className={classes.selectorLabel}>Select primary language</InputLabel>
          <Select
            id="primaryLanguage"
            name="primaryLanguage"
            fullWidth
            value={values.primaryLanguage}
            error={touched.primaryLanguage && Boolean(errors.primaryLanguage)}
            onChange={handleChange}
            label={<Typography className={classes.label}>Primary Language</Typography>}
          >
            {LANGUAGES.map((language) => (
              <MenuItem key={language.countryCode} value={language.name}>
                <Grid container alignItems="center">
                  <Avatar className={classes.flagSmall}>
                    <Flag country={language.countryCode.toUpperCase()} size={30} />
                  </Avatar>
                  <Box fontWeight="fontWeightBold">{language.name}</Box>
                </Grid>
              </MenuItem>
            ))}
          </Select>

          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Create'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
