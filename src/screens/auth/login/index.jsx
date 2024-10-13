import React from 'react';
import { Button, ButtonToolbar, Form, Loader, Schema } from 'rsuite';
import LoginBg from '../../../assets/svg/login-bg';
import { useAuth } from '../../../contexts/auth.context';
import useLogin from '../../../service/hooks/auth/useLogin';

const { StringType } = Schema.Types;
const model = Schema.Model({
  username: StringType().isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.'),
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  const [value, setValue] = React.useState('');
  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} value={value} onChange={handleChange} {...rest} />
    </Form.Group>
  );
}
export default function LoginScreen() {
  const { login } = useAuth();
  const { onLogin, isLoading } = useLogin();
  // const {} =
  const handleSubmit = async (checkStatus) => {
    if (checkStatus) {
      await onLogin({
        ...model.data,
      }).then((res) => {
        login(res.data);
      });
    }
  };
  return (
    <div className='h-screen  overflow-hidden w-screen flex justify-center items-center'>
      <div className='fixed top-0 left-0 right-0 bottom-0'>
        <LoginBg />
      </div>
      <Form className='p-4  shadow-2xl bg-black/10 backdrop-blur-3xl rounded-xl' model={model} onSubmit={handleSubmit}>
        <h1 className='text-white text-3xl font-bold'>Login</h1>
        <h1 className='h-10 mb-4'>Welcome onboard with us!</h1>
        <TextField className='bg-black/20 min-w-[30rem] border-black/10  text-white' name='username' label='Username' />
        <TextField
          className='bg-black/20 min-w-[30rem] border-black/10 text-white'
          name='password'
          label='Password'
          type='password'
        />
        <ButtonToolbar>
          <Button className='w-full' appearance='primary' type='submit'>
            {isLoading && <Loader />}
            LOGIN
          </Button>
        </ButtonToolbar>
        <h1 className='text-blue-200'>New to Logo? Register Here</h1>
      </Form>
    </div>
  );
}
