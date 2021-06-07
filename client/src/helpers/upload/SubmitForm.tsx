import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { array, object, string } from 'yup';
import * as yup from 'yup';
import { DropZone } from './DropZone';

interface Props {
  handleClose: () => void;
}
export default function SubmitForm({ handleClose }: Props) {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{ files: [] }}
          validationSchema={object({
            files: yup.array().min(1).max(1).required(),
          })}
          onSubmit={(values) => {
            console.log('values', values);
            return new Promise((res) => setTimeout(res, 2000));
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <DropZone name="files" isSubmitting={isSubmitting} />
                <Grid item container justify="space-between">
                  <Button onClick={handleClose} color="secondary" variant="contained">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={!isValid || isSubmitting}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>

              {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
