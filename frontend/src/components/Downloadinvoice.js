import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DownloadStatusBar from './DownloadStatusBar'; // your status bar component

const DownloadInvoice = ({ orderNumber }) => {
  const [downloadStatus, setDownloadStatus] = useState('idle'); // 'idle' | 'downloading' | 'completed' | 'error'
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(100); // default speed in KB/s

  const handleDownload = async () => {
    setDownloadStatus('downloading');
    setProgress(0);

    try {
      const response = await axios.get(
        `/api/orders/${orderNumber}/download`,
        {
          responseType: 'blob',
          params: { speed }, // send speed as query param
          onDownloadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      // Create a blob link to trigger file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${orderNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus('completed');
    } catch (error) {
      setDownloadStatus('error');
      console.error('Download failed:', error);
    }
  };

  return (
    <div>
      <label>
        Download Speed (KB/s):
        <input
          type="number"
          value={speed}
          min={10}
          max={1000}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </label>

      <button onClick={handleDownload} disabled={downloadStatus === 'downloading'}>
        {downloadStatus === 'downloading' ? 'Downloading...' : 'Download Invoice'}
      </button>

      <DownloadStatusBar status={downloadStatus} progress={progress} />
    </div>
  );
};

export default DownloadInvoice;
