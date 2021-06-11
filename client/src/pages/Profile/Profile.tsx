import { Grid, Typography } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';

export default function Profile(): JSX.Element {
  const { loggedInUser } = useAuth();
  return (
    <Grid>
      <Typography variant="h1">Profile</Typography>
      <Typography variant="h2">{loggedInUser?.username}</Typography>
      <Typography variant="h3">{loggedInUser?.email}</Typography>
    </Grid>
  );
}
