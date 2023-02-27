import React from 'react';

const FormModal = ({
  onConfirm, onClose, content, title,
}) => (
    <>
      <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
            <svg aria-hidden="true" className="w-1 h-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
                <div className='p-6'>
                    <h3 className="mb-2 text-lg font-normal text-gray-600 dark:text-gray-400">{title}</h3>
                    <hr></hr>
                    {content}
                </div>
                <div className="pb-6 pt-3 text-center">
                    <button type="button" className="mr-2 text-black bg-green-200 hover:bg-gray-100 py-2 px-4 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => onConfirm()}
                    >Save</button>
                    <button data-modal-hide="popup-modal" type="button" className="text-black bg-red-200 hover:bg-gray-100 py-2 px-4 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => onClose()}
                    >Cancel</button>
                </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
);
export default FormModal;
