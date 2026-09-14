import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

// מודל legacy שממונה באופן אימפרטיבי לתוך div נפרד מחוץ לעץ ה-React
// הראשי. תבנית הרכבה/פירוק ידנית עם ReactDOM.render/unmountComponentAtNode
// קדמה ל-Portals ואמורה להיעלם במיגרציה.
let modalHost = null;

export function openLegacyModal({ title, message, onClose }) {
  modalHost = document.createElement('div');
  document.body.appendChild(modalHost);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(modalHost);
    modalHost.remove();
    onClose?.();
  };

  ReactDOM.render(
    <LegacyModal title={title} message={message} onClose={handleClose} />,
    modalHost
  );
}

function LegacyModal({ title, message, onClose }) {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {message}
        <Button onClick={onClose}>סגור</Button>
      </DialogContent>
    </Dialog>
  );
}

export default LegacyModal;
