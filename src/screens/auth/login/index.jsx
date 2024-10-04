import { useState } from 'react';
import useLogin from '../../../service/hooks/auth/useLogin';
import './index.scss';

function LoginScreen() {
    const [state] = useState({
        username: 'huutai',
        password: '123'
    })
    const {onLogin, isLoading} = useLogin()


    const handleLogin = async() => {
        await onLogin(state)
    }
  return <div className="min-h-screen">
            <div>
              <button
              onClick={handleLogin}
                className="text-3xl font-bold underline bg-red-500 relative w-full flex justify-center py-2 px-4 border border-transparent "
              >
                Sign in {
                    isLoading && <div>Loading...</div>
                }
              </button>
            </div>
    </div>
}

export default LoginScreen;
