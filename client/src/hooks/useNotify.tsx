import { toast } from 'react-toastify';

const useNotify = () => {
  const success = (msg: string) => toast.success(msg);
  const error = (msg: string) => toast.error(msg);
  const info = (msg: string) => toast.info(msg);
  const warn = (msg: string) => toast.warn(msg);
  const loading = (msg: string) => toast.loading(msg); // returns a toast ID
  const dismiss = (id: string) => toast.dismiss(id);
  const confirm = (msg: string, onConfirm: () => void, onCancel: () => void) => {
    const toastId = toast.info(
      <div>
        <p>{msg}</p>
        <div className="mt-2 flex items-center justify-end">
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(toastId); // Close the toast after confirmation
            }}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              onCancel();
              toast.dismiss(toastId); // Close the toast after cancellation
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Don't auto-close the toast
        closeButton: false, // No close button
        draggable: false, // No dragging allowed
        position: 'top-center', // Position the toast at the top center
      }
    );
    return toastId; // Return the toast ID for custom control if needed
  };
  
  return { success, error, info, warn, loading, dismiss, confirm };
};

export default useNotify;
