import { toast } from 'react-toastify';
import { hashCode } from './index';

const show = (text, type, options) => {
    const toastId = hashCode(text);

    if (toast.isActive(toastId)) {
        toast.update(toastId, { autoClose: 5000 });
    } else {
        toast(text, {
            toastId,
            type,
            ...options,
        });
    }
};

const info = (text) => {
    show(text, 'info');
};

const success = (text) => {
    show(text, 'success');
};

const dark = (text) => {
    show(text, 'dark');
};

const error = (text, options) => {
    show(text, 'error', options);
};

const warn = (text) => {
    show(text, 'warn');
};

export const notify = {
    info,
    success,
    dark,
    error,
    warn,
};
