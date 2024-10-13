import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC4AF0EvsvapWk6Y09ZyC3Sm3ZsqzqpOHA',
  authDomain: 'hodos-f29d9.firebaseapp.com',
  projectId: 'hodos-f29d9',
  storageBucket: 'hodos-f29d9.appspot.com',
  messagingSenderId: '646639558632',
  appId: '1:646639558632:web:2e89d12a833252cb4c8e5d',
  measurementId: 'G-W9YN4Y4290',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (file) =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(false);
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error('Error uploading image:', error.message);
        reject(new Error('Promise rejected.'));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error.message);
            reject(new Error('Promise rejected.'));
          });
      },
    );
  });

export default uploadImage;
