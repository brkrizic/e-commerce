import React from 'react';
import { ProgressBar, Alert } from 'react-bootstrap';

const DownloadStatusBar = ({ status, progress = 0 }) => {
  let content = null;

  switch (status) {
    case 'downloading':
      content = (
        <div className="mt-2">
          <ProgressBar now={progress}  animated striped variant="info" />
          <small className="text-info mt-1 d-block text-end">{progress}% - Downloading...</small>
        </div>
      );
      break;

    case 'completed':
      content = (
        <Alert variant="success" className="mt-2 py-1 mb-0">
          ✅ Download completed
        </Alert>
      );
      break;

    case 'error':
      content = (
        <Alert variant="danger" className="mt-2 py-1 mb-0">
          ❌ Download failed
        </Alert>
      );
      break;

    default:
      content = null;
  }

  return <div>{content}</div>;
};

export default DownloadStatusBar;
