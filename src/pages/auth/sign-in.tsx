import useSignIn from "@/services/hooks/useSignIn";
import { Button, Card, Form, Image, Input } from "@heroui/react";
export default function SignInScreen() {
  const { isLoading, onLogin } = useSignIn();

  const handleSubmit = (data: any) => {
    onLogin(data);
  };

  return (
    <>
      <Image
        src="https://cdn.pixabay.com/photo/2022/04/16/20/45/saigon-river-7137007_1280.jpg"
        alt="Background Image"
        className="fixed object-cover w-full h-full opacity-5 z-2"
      />
      <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 z-4  backdrop-blur-sm">
        <Card className="w-full max-w-xl p-6 bg-white shadow-xl rounded-lg">
          <h1 className="font-bold text-large pb-4">Welcome Hodos Admin</h1>
          <Form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              let data = Object.fromEntries(new FormData(e.currentTarget));
              handleSubmit(data);
            }}
          >
            <Input
              isRequired
              errorMessage="Please enter a valid username"
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
              type="text"
            />

            <Input
              isRequired
              errorMessage="Please enter a valid password"
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <div className="flex gap-2 items-center justify-center w-[100%]">
              <Button isLoading={isLoading} color="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
