import { Button, ButtonToolbar, Form, Schema } from 'rsuite';
import useLogin from '../../../service/hooks/auth/useLogin';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.')
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}
export default function LoginScreen() {
  const {onLogin} = useLogin()
  // const {} = 
    const handleSubmit = (checkStatus) => {
    if (checkStatus) {
      console.log('Form submitted successfully');
      onLogin({
        username: 'caotinh',
        password: '123'
      })
    } else {
      console.log('Form has errors');
    }
  };
  return (
   <div className='h-screen w-screen flex justify-center items-center'>
     <Form model={model} onSubmit={handleSubmit}>
      <TextField name="name" label="Username" />
      <TextField name="email" label="Email" />
      <ButtonToolbar>
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </ButtonToolbar>
    </Form>
   </div>
  );
}