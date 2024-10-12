import { createContext, useContext, useState } from 'react';
import LoaderCustom from '../../components/loader-custom';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    document.getElementById('loader-global').classList.remove('hidden');
    document.getElementById('loader-global').classList.add('flex');
  };
  const stopLoading = () => {
    document.getElementById('loader-global').classList.remove('flex');
    document.getElementById('loader-global').classList.add('hidden');
  };
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, startLoading, stopLoading }}>
      <div
        id='loader-global'
        className='fixed hidden top-0 z-[10000] bg-white/10 backdrop-blur-md left-0 right-0 bottom-0 justify-center items-center'
      >
        <LoaderCustom />
      </div>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
