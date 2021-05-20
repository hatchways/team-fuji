import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';

const props = { handleSubmit: jest.fn() };

describe('SignUpForm tests', () => {
  test('smoke test', () => {
    render(<SignUpForm {...props} />);
  });

  test('snapshot test', () => {
    const { asFragment } = render(<SignUpForm {...props} />);
    expect(asFragment).toMatchSnapshot();
  });

  test('can input values and submit form', async () => {
    const { getByLabelText, getByText } = render(<SignUpForm {...props} />);
    const primaryLanguage = getByLabelText('Primary Language');
    expect(primaryLanguage).toBeInTheDocument();
    const email = getByLabelText('E-mail address');
    expect(email).toBeInTheDocument();
    const password = getByLabelText('Password');
    expect(password).toBeInTheDocument();
    const createBtn = getByText('Create');
    expect(createBtn).toBeInTheDocument();

    fireEvent.change(primaryLanguage, { target: { value: 'Spanish' } });
    fireEvent.change(email, { target: { value: 'testUser@gmail.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });

    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(props.handleSubmit).toBeCalledWith(
        {
          email: 'testUser@gmail.com',
          password: 'password123',
          primaryLanguage: 'Spanish',
        },
        expect.anything(),
      );
    });
  });
});
