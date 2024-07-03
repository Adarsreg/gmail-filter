'use client';

import { FC, useState, Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion } from 'framer-motion';
import { KeyIcon } from '@heroicons/react/24/solid'; // Updated icon
import Button from '@/components/ui/button'; // Assuming you have a custom Button component

const Page: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Error signing in with Google');
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey) {
      toast.success('API Key saved successfully');
      setIsTrayOpen(false);
      //  API key logic here
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 font-sans ">
      <motion.div
        className="max-w-md w-full p-8 mx-auto bg-white rounded-lg shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Gmail Filter</h1>
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-8">Login with Google</h2>
        <Button
          isLoading={isLoading}
          type="button"
          className="flex justify-center items-center w-full py-3 mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
          onClick={loginWithGoogle}
        >
          {isLoading ? (
            <motion.svg
              className="animate-spin h-5 w-5 mr-3"
              viewBox="0 0 24 24"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </motion.svg>
          ) : (
            <GoogleIcon className="h-5 w-5 mr-2" />
          )}
          Google
        </Button>
        <button
          onClick={() => setIsTrayOpen(true)}
          className="flex justify-center items-center w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
        >
          <KeyIcon className="h-5 w-5 mr-2" />
          Enter Gemini API Key
        </button>

        <Transition appear show={isTrayOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsTrayOpen(false)}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  enter="transform transition ease-in-out duration-300 sm:duration-700"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="transform transition ease-in-out duration-300 sm:duration-700"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Enter OpenAI API Key
                    </DialogTitle>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Your OpenAI API Key"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={() => setIsTrayOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={handleApiKeySubmit}
                      >
                        Save
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </motion.div>
    </div>
  );
};

const GoogleIcon: FC<{ className: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>
);

export default Page;
