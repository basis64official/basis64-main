import React from 'react';
import { Button } from '../components/ui';
// Tidak perlu mengimpor setiap ikon satu per satu karena mereka diakses melalui class
const Contact = () => {
  return (
    <div className='p-4'>
      <div className="rounded-md border border-gray-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900 shadow-sm p-6 sm:p-10">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hubungi Kami
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Kami senang mendengar dari Anda! Silakan hubungi kami melalui beberapa platform di bawah ini.
          </p>
        </div>
        <div className="text-black dark:text-white">
          <hr className='border-gray-300 dark:border-neutral-700 my-4' />
          <div className='mb-4'>
            <h1 className='text-lg mb-2'>Email: basis64computer@gmail.com</h1>
            <h1 className='text-lg mb-2'>Whatsapp: +62 822-1150-9216</h1>
            <h1 className='text-lg mb-2'>Instagram: @basis64computer</h1>
            <h1 className='text-lg mb-2'>Discord: <a href='https://discord.gg/gywRbyK8VN/' target='_blank' className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'>https://discord.gg/gywRbyK8VN/</a></h1>
            <h1 className='text-lg mb-2'>Telegram: <a href='https://t.me/basis64computer' target='_blank' className='font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'>https://t.me/basis64computer/</a></h1>
          </div>
          <div className='grid grid-cols-2'>
            <Button as='a' href="https://wa.me/+6282211509216" variant="whatsapp" className="mr-4 mb-4">
              <i className="bi bi-whatsapp mr-2"></i> Hubungi kami melalui WhatsApp
            </Button>
            <Button as='a' href="https://www.instagram.com/basis64computer" variant="instagram" className="mr-4 mb-4">
              <i className="bi bi-instagram mr-2"></i> Lihat Instagram kami
            </Button>
            <Button as='a' href="https://www.instagram.com/basis64computer/" variant="blue" className="mr-4 mb-4">
              <i className="bi bi-telegram mr-2"></i> Chat melalui Telegram
            </Button>
            <Button as='a' href="https://discord.gg/gywRbyK8VN/" variant="discord" className="mr-4 mb-4">
              <i className="bi bi-discord mr-2"></i> Bergabung ke Discord
            </Button>
            <Button as='a' href="mailto:basis64computer@gmail.com" variant="gray" className="mr-4 mb-4">
              <i className="bi bi-envelope mr-2"></i> Hubungi melalui email
            </Button>
            <Button as='link' to="/feedback" variant="blue" className="mr-4 mb-4">
              <i className="bi bi-chat-right-quote mr-2"></i> Berikan feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;