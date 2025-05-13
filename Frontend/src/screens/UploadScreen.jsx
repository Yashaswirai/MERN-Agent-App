import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  uploadContacts,
  getContactsByBatch,
  clearError,
  clearSuccess,
} from '../redux/contactSlice';
import { getAgents } from '../redux/agentSlice';
import { toast } from 'react-toastify';

const UploadScreen = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choose File');
  const [fileError, setFileError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, batchId } = useSelector((state) => state.contacts);
  const { agents } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success && batchId) {
      toast.success('File uploaded and contacts distributed successfully');
      dispatch(getContactsByBatch(batchId));
      navigate(`/distribution/${batchId}`);
    }
  }, [error, success, batchId, dispatch, navigate]);

  const validateFile = (file) => {
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setFileError('Invalid file format. Only CSV, XLSX, and XLS files are allowed');
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setFileError('File size exceeds 10MB limit');
      return false;
    }
    
    setFileError('');
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      } else {
        setFile(null);
        setFileName('Choose File');
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!file) {
      setFileError('Please select a file');
      return;
    }
    
    if (agents.length === 0) {
      toast.error('No agents found. Please add agents before uploading contacts');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    dispatch(uploadContacts(formData));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload CSV</h1>
      
      {agents.length === 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>No agents found. Please add agents before uploading contacts.</p>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label
              htmlFor="file"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Upload CSV, XLSX, or XLS File
            </label>
            <div className="flex items-center">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">{fileName}</span>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </label>
            </div>
            {fileError && (
              <p className="text-red-500 text-xs italic mt-2">{fileError}</p>
            )}
            <p className="text-gray-600 text-xs mt-2">
              The file should contain columns: FirstName, Phone, and Notes (optional)
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              disabled={loading || !file || agents.length === 0}
            >
              {loading ? 'Uploading...' : 'Upload & Distribute'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadScreen;
