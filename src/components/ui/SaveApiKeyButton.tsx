// components/ui/SaveApiKeyButton.tsx

'use client';

import { useState, Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { KeyIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/button'
const SaveApiKeyButton = () => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleApiKeySubmit = async () => {
    if (apiKey) {
      try {
        const response = await fetch('/api/save-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apiKey }),
        });

        if (response.ok) {
          toast.success('API Key saved successfully');
          setIsTrayOpen(false);
        } else {
          toast.error('Failed to save API Key');
        }
      } catch (error) {
        toast.error('An error occurred while saving the API Key');
      }
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <>
      <Button
          onClick={() => setIsTrayOpen(true)}
          variant="custom"
          size= "default"
        >
          <KeyIcon className="h-5 w-5 mr-2" />
           Gemini API Key
        </Button>

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
                      Enter Gemini API Key
                    </DialogTitle>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Your Gemini API Key"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
    </>
  );
};

export default SaveApiKeyButton;
