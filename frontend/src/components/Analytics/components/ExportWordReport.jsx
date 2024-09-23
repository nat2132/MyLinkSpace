import React, { useState } from 'react';
import axios from 'axios';
import CardWraper from './cardWraper';
import SectionHeaderText from './SectionHeaderText';
import {upgradeButton} from '../data/const';

const ExportWordReport = (userId=123 ) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExport = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
   

    try {
      const response = await axios.post(`/users/${userId}/analytics/export-word`, {
        start_date: startDate,
        end_date: endDate,
      }, {
        responseType: 'blob', // Important for downloading files
      });

      // Create a URL for the file and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics_report_${userId}_${new Date().toISOString().slice(0, 10)}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('This feature is available for premium users only.');
      } else {
        setError('An error occurred while exporting the report.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="ExportWordReport">
    <div className="flex justify-between">
      {" "}
      <SectionHeaderText>Export Analytics</SectionHeaderText>
      <img src={upgradeButton} alt="" />
    </div>
    <CardWraper>
     
      <form  className="" onSubmit={handleExport}>
        <div className='flex justify-between mb-5 items-center'>
        <div>
          <label >
            <span className='text-md font-semibold text-gray-600'>From: </span>
            <input
            className='text-sm text-purple-600'
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='w-5 h-[1px] bg-gray-400'></div>
        <div>
          <label>
          <span className='text-md font-semibold text-gray-600'>To: </span>
            <input
            className='text-sm text-purple-600'
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
        </div>
       </div>
      <div className='grid place-items-center'><button className=' rounded-xl text-purple-800 border border-purple-700 px-8 py-2' type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Export Report'}
        </button>
        {error && <p  className='text-xs text-red-400 mt-3'>{error}</p>}</div>
      </form>
    </CardWraper>
    </div>
  
  );
};

export default ExportWordReport;
