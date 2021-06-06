import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { array, object, string } from 'yup';
import { MultipleFileUploadField } from './MultipleFileUploadField';

interface Props {
  handleClose: () => void;
}
export default function FormSubmit({ handleClose }: Props) {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{ files: [] }}
          // validationSchema={object({
          //   files: array(
          //     object({
          //       url: string().required(),
          //     }),
          //   ),
          // })}
          onSubmit={(values) => {
            console.log('values', values);
            return new Promise((res) => setTimeout(res, 2000));
          }}
        >
          {({ values, errors, isValid, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <MultipleFileUploadField name="files" />
                <Grid item container>
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

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

//
