import { useEffect } from 'react';
import { Button } from '../../components/ui';
import useNavigationBar from '../../state/useNavigationBar';
import useInput from '../../hooks/useInput';
import useModal from '../../state/useModal';
import { apiFetch } from '../../api/apiFetch';
import { CookieManager } from '../../utils/CookieManager';
import { AES } from '../../crypto/aes';
import useSecure from '../../state/useSecure';
import { RSA } from '../../crypto/RSA';
import { useNavigate } from 'react-router-dom';

// import { Link } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const navigationBar = useNavigationBar();
  const secure = useSecure();
  useEffect(() => {
    navigationBar.hide();
  }, []);

  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const modal = useModal();

  const submitHandler = async () => {
    if (username.length < 1 || password.length < 1) {
      modal.show('info', 'Login', 'Username dan password harus diisi.');
      return;
    }

    modal.show('loading', 'Login', 'Login sebagai administrator...');


    try {
      const secureKey = AES.generateKey();
      const secureIv = AES.generateIv();
      secure.setKey(secureKey, secureIv);
      const data = { username, password, secureKey, secureIv };
      console.log(CookieManager.getCookie('public_key_pem'));
      const ciphertext = await RSA.encrypt(
        CookieManager.getCookie('public_key_pem') || '',
        JSON.stringify(data)
      );

      const response = await apiFetch('/admin/login', {
        method: 'POST',
        headers: {
          'X-Session-ID': CookieManager.getCookie('session_id') || ''
        },
        body: JSON.stringify({ ciphertext })
      })
      modal.hide();
      if (response.ok) {
        navigationBar.show();
        navigate('/admin/dashboard');
        // modal.show('success', 'Informasi', 'Berhasil login sebagai administrator.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('An unknown error occurred');
      }
      modal.show('failed', 'Informasi', 'Tidak dapat login sebagai administrator.');
    }
  }

  return (
    <main className='grid w-full place-items-center bg-neutral-50 px-6 py-24 sm:py-32 lg:px-8 dark:bg-neutral-950'>
      <div className='text-center'>
        <div className='mt-32 p-4 text-xl space-y-4 tracking-tight text-balance text-gray-900 border border-neutral-300 rounded-xs bg-white dark:text-white dark:border-neutral-700 dark:bg-neutral-800'>
          <div className='px-4  mb-4'>Login sebagai admin</div>
          <div className='relative w-full'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <i className='bi bi-person-badge'></i>
            </div>
            <input type='text' value={username} onChange={onUsernameChange} className='bg-white border border-neutral-300 text-gray-900 text-sm rounded-sm focus:border-blue-500 focus:ring-0 focus:ring-offset-0 block w-full ps-10 p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white' placeholder='Username' required />
          </div>
          <div className='relative w-full'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <i className='bi bi-key'></i>
            </div>
            <input type='password' value={password} onChange={onPasswordChange} className='bg-white border border-neutral-300 text-gray-900 text-sm rounded-sm focus:border-blue-500 focus:ring-0 focus:ring-offset-0 block w-full ps-10 p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white' placeholder='Password' required />
          </div>
          <Button variant='blue' className='w-full' onClick={() => submitHandler()}>Login</Button>
        </div>
      </div>
    </main>

  );
}
