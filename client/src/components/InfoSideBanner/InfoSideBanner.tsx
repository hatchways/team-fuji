import { Box, Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import bubble from '../../Images/bubble.svg';
import backgroundImage from '../../Images/9382094101e259e6d9a7825ae24b1807266e08f8.png';

const InfoSideBanner = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.infoWrapper}>
      <Box className={classes.gradientOverlay} width="100%" height="100%" zIndex="1">
        <img src={backgroundImage} alt="Background Image" className={classes.bgImg} width="100%" height="100%" />
      </Box>
      <Box className={classes.infoOverlay} zIndex="9">
        <Grid container direction="column">
          <Box className={classes.bubbleInfo}>
            <img src={bubble} alt="" width="100px" height="100px" />
          </Box>
          <Typography className={classes.info} variant="h4">
            Converse with anyone <br /> with any language
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default InfoSideBanner;
