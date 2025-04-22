import { toast } from 'react-toastify';

export const toastSuccess = (msg) => {
  toast.success(msg, { position: "top-right" });
};

export const toastError = (msg) => {
  toast.error(msg, { position: "top-right" });
};
