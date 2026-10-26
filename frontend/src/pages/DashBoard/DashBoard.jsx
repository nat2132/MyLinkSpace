import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Header from '../../components/Header/header'
import { getLinks, createLink, getStoredUserId } from '../../lib/api'
import frame from '/src/images/Frame.png'
import { CiCircleRemove } from "react-icons/ci";
import header from '/src/images/header.png'
import { GoPencil } from "react-icons/go";
import { BsTiktok } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { GoShare } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";


function DashBoard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addForm, setAddForm] = useState({ title: '', url: '' });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');

  // Load the user's links from the API on mount.
  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      setError('');
      const userId = getStoredUserId();
      if (!userId) {
        setError('You are not logged in. Please log in to view your links.');
        setLoading(false);
        return;
      }
      const { data, error: fetchError } = await getLinks(userId);
      if (fetchError) {
        setError(fetchError);
      } else {
        setLinks(data);
      }
      setLoading(false);
    };

    fetchLinks();
  }, []);

  const handleAddLink = async (e) => {
    e.preventDefault();
    setAddError('');
    if (!addForm.url.trim()) {
      setAddError('Enter a URL first.');
      return;
    }
    const userId = getStoredUserId();
    if (!userId) {
      setAddError('You are not logged in.');
      return;
    }
    setAdding(true);
    const title = addForm.title.trim() || addForm.url.trim();
    const { error: createError } = await createLink(userId, { title, url: addForm.url.trim() });
    setAdding(false);
    if (createError) {
      setAddError(createError);
      return;
    }
    setAddForm({ title: '', url: '' });
    // Refresh the list after a successful create.
    const { data, error: fetchError } = await getLinks(userId);
    if (fetchError) {
      setError(fetchError);
    } else {
      setLinks(data);
    }
  };

  return (
    <div>
                <Header/>
                
    <div style={{marginTop:'80px'}}className='statistics-container'>
        <div className='bar-chart'>
          {loading ? (
            <div className="animate-pulse w-full h-64 bg-[#F2F2F2] rounded-lg grid place-items-center text-gray-400">
              Loading analytics…
            </div>
          ) : error ? (
            <div className="w-full h-64 rounded-lg grid place-items-center px-6 text-center">
              <p className="text-red-500 text-sm">Could not load analytics: {error}</p>
            </div>
          ) : (
            <div className="w-full h-64 rounded-lg grid place-items-center px-6 text-center text-gray-500">
              <p className="text-sm">
                {links.length
                  ? '— Click analytics will appear here as data is collected —'
                  : 'No links yet — add your first link below to start collecting analytics.'}
              </p>
            </div>
          )}
        </div>
        <div>
            <img src={frame} alt="" />

        </div>
      
    </div>

    {/* Error banner for link-list failures */}
    {!loading && error && (
      <div className="px-8 py-3 text-sm text-red-600" role="alert">{error}</div>
    )}

    <div className='add-link'>
        <div className='enter-url'>
        <h2>Enter URL</h2>
        <CiCircleRemove />
        </div>

        <form className='inputs' onSubmit={handleAddLink}>
        <input style={{width:'400px',padding:'5px',borderRadius:'3px',backgroundColor:'#F6F7F5'}}type="text" placeholder='Title' value={addForm.title} onChange={(e)=>setAddForm({...addForm,title:e.target.value})}/>
        <input style={{width:'400px',padding:'5px',borderRadius:'3px',backgroundColor:'#F6F7F5'}}type="text" placeholder='URL' value={addForm.url} onChange={(e)=>setAddForm({...addForm,url:e.target.value})}/>
        <button className='add-btn' type="submit" disabled={adding}>{adding ? 'Adding…' : 'Add'}</button></form>
        {addError && <p className="text-red-600 text-sm px-2">{addError}</p>}
        <hr />

        {/* Links from the API */}
        {loading ? (
          <div className="animate-pulse h-10 bg-[#F2F2F2] rounded m-2" />
        ) : links.length ? (
          <ul className='px-2 py-2'>
            {links.map((link) => (
              <li key={link.id ?? link.url}
                  className='flex items-center justify-between py-2 border-b border-[#E5E5E5]'>
                <div>
                  <p className='font-semibold text-sm'>{link.title}</p>
                  <a href={link.url} target="_blank" rel="noreferrer"
                     className='text-blue-600 text-xs underline break-all'>
                    {link.url}
                  </a>
                </div>
                <span className='text-xs text-gray-500'>
                  {link.is_active === false ? 'inactive' : 'active'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-400 text-sm px-2 py-2'>
            No links yet. Add your first link above.
          </p>
        )}

        

    </div>
    <div className='insert-link'>
        <div className=''>
            <button className='header-btn'><img src={header} alt="" />Header</button>
        </div>
        <div className='insert-container'>
            <div className='title'>
                <input type="text" placeholder='Title'/>
                <span className='icon-1'><GoPencil /></span>

            </div>
            <div className='url'>
                <input type="link" placeholder='url'/>
                <span className='icon-2'><GoPencil /></span>

            </div>
            <div className='icons'>
                <div style={{color:'GrayText'}}className='icons-1'><BsTiktok /><CiImageOn /><RiCalendarScheduleLine /><CiStar /><CiLock /></div>
                <div style={{color:'GrayText'}} className='icons-2'><GoShare/><MdOutlineDeleteOutline/></div>
            

            </div>

        </div>

    </div>



    </div>
  );
}

export default DashBoard
