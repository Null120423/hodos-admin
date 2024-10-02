import React, { useState } from 'react';
import useLogin from '../../../service/hooks/auth/useLogin';
import './index.scss';

function LoginScreen() {
    const [state] = useState({
        username: 'huutai',
        password: '123'
    })
    const [showPassword, setShowPassword] = useState(false)
    const {onLogin, isLoading} = useLogin()


    const handleLogin = async() => {
        await onLogin(state)
    }
  return <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
     
            <div>
              <button
              onClick={handleLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in {
                    isLoading && <div>Loading...</div>
                }
              </button>
            </div>

    </div>
}

export default LoginScreen;
