import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { object } from 'yup';
import * as yup from 'yup';
import { DropZone } from './DropZone';

interface Props {
  handleClose: (submitted: boolean) => void;
  fetch: { url: string; handler: string; maxFiles: number };
  imageSubmit?: (imageUrl: string[]) => void;
}
export default function SubmitForm({ handleClose, fetch, imageSubmit }: Props): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{ files: [] }}
          validationSchema={object({
            files: yup.array().min(1).max(fetch.maxFiles).required(),
          })}
          onSubmit={(values) => {
            console.log('values', values);
            return new Promise((res) => setTimeout(res, 2000));
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <DropZone name="files" isSubmitting={isSubmitting} fetch={fetch} imageSubmit={imageSubmit} />
                <Grid item container justify="space-between">
                  <Button onClick={() => handleClose(false)} color="secondary" variant="contained">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleClose(true)}
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={!isValid || isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
