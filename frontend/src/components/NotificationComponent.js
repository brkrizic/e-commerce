import React, { useEffect } from "react";
import Toast from 'bootstrap/js/dist/toast';

export const NotificationComponent = ({ message, title, onClose, type }) => {

    useEffect(() => {
        const toastEl = document.querySelector(".toast");
        if (toastEl) {
            const toast = new Toast(toastEl);
            toast.show();
        }

        // Optionally, auto close after some time
        const timeout = setTimeout(() => {
            if (onClose) onClose();
        }, 5000); // 5 seconds timeout to automatically close the toast

        return () => clearTimeout(timeout); // Clean up timeout when the component unmounts

    }, [message, title, onClose]); // Trigger whenever message or title changes

    // Using neutral background classes
    const toastClass = 'bg-light text-dark';  // Light background with dark text
    const iconClass = 'bi-info-circle'; // Neutral icon for general notifications

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050 }}
        >
            <div className={`toast ${toastClass} border shadow-sm`} style={{ position: 'relative', minWidth: '300px', borderRadius: '0.375rem' }}>
                <div className="toast-header">
                    <i className={`bi ${iconClass} me-2`} style={{ fontSize: '1.2rem' }}></i>
                    <strong className="me-auto">{title}</strong>
                    <small>now</small>
                    <button
                        type="button"
                        className="btn-close btn-close-dark ms-2 mb-1"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={onClose}
                    ></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
};
