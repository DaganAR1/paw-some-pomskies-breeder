
import React, { useState, useRef, useEffect } from 'react';
import { Puppy, BlogPost, Parent, ScheduleEvent } from '../types';
import { SITE_ASSETS as DEFAULT_ASSETS } from '../constants';

interface AdminDashboardProps {
  puppies: Puppy[];
  setPuppies: React.Dispatch<React.SetStateAction<Puppy[]>>;
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  schedule: ScheduleEvent[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleEvent[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  siteAssets: typeof DEFAULT_ASSETS;
  setSiteAssets: (assets: typeof DEFAULT_ASSETS) => void;
  onBackToHome: () => void;
  onLogout: () => void;
}

const ImageUploader: React.FC<{
  currentImage: string | undefined;
  onImageChange: (base64: string) => void;
  label: string;
  isGallery?: boolean;
}> = ({ currentImage, onImageChange, label, isGallery }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-black uppercase text-slate-400 tracking-widest">{label}</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`relative ${isGallery ? 'h-32' : 'h-48'} rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2 group ${
          isDragging ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-slate-50 hover:border-teal-400 hover:bg-white'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        {currentImage ? (
          <>
            <img src={currentImage} alt="Preview" className="w-full h-full object-contain p-2" />
            <div className="absolute inset-0 bg-teal-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-black uppercase tracking-widest text-[8px] bg-teal-600 px-3 py-1.5 rounded-full shadow-xl">
                Swap
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            {!isGallery && <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">Tap to upload</p>}
          </>
        )}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  puppies, setPuppies, 
  parents, setParents,
  schedule, setSchedule,
  blogPosts, setBlogPosts,
  siteAssets, setSiteAssets,
  onBackToHome, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'puppies' | 'parents' | 'schedule' | 'articles' | 'settings'>('puppies');
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [puppyFormData, setPuppyFormData] = useState<Partial<Puppy>>({});
  const [parentFormData, setParentFormData] = useState<Partial<Parent>>({});
  const [scheduleFormData, setScheduleFormData] = useState<Partial<ScheduleEvent>>({});
  const [articleFormData, setArticleFormData] = useState<Partial<BlogPost>>({});
  
  // Local Temp State for Site Settings
  const [tempAssets, setTempAssets] = useState(siteAssets);
  const [emailConfig, setEmailConfig] = useState({
    serviceId: '',
    templateId: '',
    publicKey: ''
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('pawsome_email_config');
    if (savedEmail) setEmailConfig(JSON.parse(savedEmail));
  }, []);

  const saveSettings = () => {
    localStorage.setItem('pawsome_email_config', JSON.stringify(emailConfig));
    setSiteAssets(tempAssets);
    alert('Site settings updated! Your changes are now live.');
  };

  const resetAssets = () => {
    if (window.confirm('Reset all site images to their original theme defaults?')) {
      setTempAssets(DEFAULT_ASSETS);
    }
  };

  // --- Puppies Logic ---
  const startPuppyEdit = (puppy: Puppy) => {
    setEditingId(puppy.id);
    setPuppyFormData({ ...puppy, additionalImages: puppy.additionalImages || [] });
  };
  const startNewPuppy = () => {
    setEditingId('new_puppy');
    setPuppyFormData({ name: '', gender: 'Female', age: '8 Weeks', status: 'Available', image: DEFAULT_ASSETS.puppies.defaultNew, additionalImages: [], description: '', coatColor: '', eyeColor: '', weight: '' });
  };
  const savePuppy = () => {
    if (editingId === 'new_puppy') {
      const newPuppy = { ...puppyFormData, id: Date.now().toString() } as Puppy;
      setPuppies(prev => [...prev, newPuppy]);
    } else {
      setPuppies(prev => prev.map(p => p.id === editingId ? { ...p, ...puppyFormData } as Puppy : p));
    }
    cancelEdit();
  };
  const deletePuppy = (id: string) => { if (window.confirm('Are you sure?')) setPuppies(prev => prev.filter(p => p.id !== id)); };

  // --- Parents Logic ---
  const startParentEdit = (parent: Parent) => {
    setEditingId(parent.id);
    setParentFormData(parent);
  };
  const startNewParent = () => {
    setEditingId('new_parent');
    setParentFormData({ name: '', role: 'Sire', breed: 'F1 Pomsky', weight: '15 lbs', description: '', image: DEFAULT_ASSETS.parents.arctic });
  };
  const saveParent = () => {
    if (editingId === 'new_parent') {
      const newParent = { ...parentFormData, id: 'p' + Date.now() } as Parent;
      setParents(prev => [...prev, newParent]);
    } else {
      setParents(prev => prev.map(p => p.id === editingId ? { ...p, ...parentFormData } as Parent : p));
    }
    cancelEdit();
  };
  const deleteParent = (id: string) => { if (window.confirm('Are you sure?')) setParents(prev => prev.filter(p => p.id !== id)); };

  // --- Schedule Logic ---
  const startScheduleEdit = (item: ScheduleEvent, idx: number) => {
    setEditingId(idx);
    setScheduleFormData(item);
  };
  const startNewSchedule = () => {
    setEditingId('new_schedule');
    setScheduleFormData({ period: 'Seasonal', event: '', date: 'TBD', details: '' });
  };
  const saveSchedule = () => {
    if (editingId === 'new_schedule') {
      setSchedule(prev => [...prev, scheduleFormData as ScheduleEvent]);
    } else {
      setSchedule(prev => prev.map((s, idx) => idx === editingId ? { ...s, ...scheduleFormData } as ScheduleEvent : s));
    }
    cancelEdit();
  };
  const deleteSchedule = (idx: number) => { if (window.confirm('Are you sure?')) setSchedule(prev => prev.filter((_, i) => i !== idx)); };

  // --- Articles Logic ---
  const startArticleEdit = (post: BlogPost) => { setEditingId(post.id); setArticleFormData(post); };
  const startNewArticle = () => { setEditingId('new_article'); setArticleFormData({ title: '', excerpt: '', author: '', category: 'News', date: new Date().toLocaleDateString(), image: DEFAULT_ASSETS.blogs.defaultNew, content: [''] }); };
  const saveArticle = () => {
    if (editingId === 'new_article') {
      const newArticle = { ...articleFormData, id: `b${Date.now()}` } as BlogPost;
      setBlogPosts(prev => [newArticle, ...prev]);
    } else {
      setBlogPosts(prev => prev.map(p => p.id === editingId ? { ...p, ...articleFormData } as BlogPost : p));
    }
    cancelEdit();
  };
  const deleteArticle = (id: string) => { if (window.confirm('Are you sure?')) setBlogPosts(prev => prev.filter(p => p.id !== id)); };

  const cancelEdit = () => { setEditingId(null); setPuppyFormData({}); setParentFormData({}); setScheduleFormData({}); setArticleFormData({}); };

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-teal-900 uppercase tracking-tight">Breeder Portal</h1>
            <p className="text-slate-500 font-medium">Command center for your Paw-some Pomskies digital presence.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={onBackToHome} className="px-6 py-3 bg-white text-slate-600 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-colors">Exit Portal</button>
            <button onClick={onLogout} className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold shadow-sm hover:bg-red-100 transition-colors flex items-center gap-2">Lock Portal</button>
          </div>
        </div>

        <div className="flex flex-wrap bg-slate-200 p-1 rounded-2xl mb-8 w-fit shadow-inner">
          <button onClick={() => setActiveTab('puppies')} className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'puppies' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500 hover:text-teal-600'}`}>Dogs</button>
          <button onClick={() => setActiveTab('parents')} className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'parents' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500 hover:text-teal-600'}`}>Parents</button>
          <button onClick={() => setActiveTab('schedule')} className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'schedule' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500 hover:text-teal-600'}`}>Litters</button>
          <button onClick={() => setActiveTab('articles')} className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'articles' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500 hover:text-teal-600'}`}>Articles</button>
          <button onClick={() => setActiveTab('settings')} className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'settings' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-500 hover:text-teal-600'}`}>Site Settings</button>
        </div>

        {activeTab === 'settings' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center text-xl">🎨</div>
                  <div><h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Appearance</h2><p className="text-slate-500 text-sm">Site imagery.</p></div>
                </div>
                <div className="space-y-8">
                  <ImageUploader label="Primary Logo" currentImage={tempAssets.branding.logo} onImageChange={(base64) => setTempAssets({...tempAssets, branding: { ...tempAssets.branding, logo: base64 }})} />
                  <ImageUploader label="Good Dog Logo (Footer)" currentImage={tempAssets.branding.goodDogBadge} onImageChange={(base64) => setTempAssets({...tempAssets, branding: { ...tempAssets.branding, goodDogBadge: base64 }})} />
                  <ImageUploader label="Hero Background" currentImage={tempAssets.sections.heroBackground} onImageChange={(base64) => setTempAssets({...tempAssets, sections: { ...tempAssets.sections, heroBackground: base64 }})} />
                  <ImageUploader label="About Section" currentImage={tempAssets.sections.aboutMain} onImageChange={(base64) => setTempAssets({...tempAssets, sections: { ...tempAssets.sections, aboutMain: base64 }})} />
                  <button onClick={resetAssets} className="text-red-500 font-bold uppercase tracking-widest text-[10px] hover:underline">Reset Images</button>
                </div>
              </div>
              <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-200 h-fit">
                <div className="flex items-center gap-4 mb-8"><div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center text-xl">📧</div><div><h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Email Integration</h2><p className="text-slate-500 text-sm">Connect to EmailJS.</p></div></div>
                <div className="space-y-4">
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm" value={emailConfig.serviceId} onChange={e => setEmailConfig({...emailConfig, serviceId: e.target.value})} placeholder="Service ID" />
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm" value={emailConfig.templateId} onChange={e => setEmailConfig({...emailConfig, templateId: e.target.value})} placeholder="Template ID" />
                  <input className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm" value={emailConfig.publicKey} onChange={e => setEmailConfig({...emailConfig, publicKey: e.target.value})} placeholder="Public Key" />
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-8"><button onClick={saveSettings} className="px-16 py-5 bg-teal-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-teal-500 transition-all shadow-2xl shadow-teal-600/30">Save All Site Settings</button></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Active {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <button 
                onClick={() => { if(activeTab === 'puppies') startNewPuppy(); else if(activeTab === 'parents') startNewParent(); else if(activeTab === 'schedule') startNewSchedule(); else startNewArticle(); }}
                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg hover:bg-teal-500 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add New
              </button>
            </div>

            {/* PUPPY MODAL */}
            {editingId !== null && activeTab === 'puppies' && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={cancelEdit}></div>
                <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                  <div className="p-8 border-b border-slate-100 bg-teal-50"><h2 className="text-2xl font-black text-teal-900">Manage Puppy</h2></div>
                  <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <ImageUploader label="Portrait" currentImage={puppyFormData.image} onImageChange={(base64) => setPuppyFormData({...puppyFormData, image: base64})} />
                        <div className="grid grid-cols-2 gap-4">
                          <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={puppyFormData.name || ''} onChange={e => setPuppyFormData({...puppyFormData, name: e.target.value})} placeholder="Name" />
                          <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={puppyFormData.status || 'Available'} onChange={e => setPuppyFormData({...puppyFormData, status: e.target.value as any})}><option value="Available">Available</option><option value="Reserved">Reserved</option><option value="Adopted">Adopted</option></select>
                        </div>
                      </div>
                      <textarea rows={6} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={puppyFormData.description || ''} onChange={e => setPuppyFormData({...puppyFormData, description: e.target.value})} placeholder="Description" />
                    </div>
                  </div>
                  <div className="p-8 bg-slate-50 flex justify-end gap-3"><button onClick={cancelEdit} className="px-6 py-2">Cancel</button><button onClick={savePuppy} className="px-10 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Save Puppy</button></div>
                </div>
              </div>
            )}

            {/* PARENT MODAL */}
            {editingId !== null && activeTab === 'parents' && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={cancelEdit}></div>
                <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                  <div className="p-8 border-b border-slate-100 bg-teal-50"><h2 className="text-2xl font-black text-teal-900">Manage Parent</h2></div>
                  <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <ImageUploader label="Portrait" currentImage={parentFormData.image} onImageChange={(base64) => setParentFormData({...parentFormData, image: base64})} />
                        <div className="grid grid-cols-2 gap-4">
                          <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={parentFormData.name || ''} onChange={e => setParentFormData({...parentFormData, name: e.target.value})} placeholder="Name" />
                          <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={parentFormData.role || 'Sire'} onChange={e => setParentFormData({...parentFormData, role: e.target.value as any})}><option value="Sire">Sire</option><option value="Dam">Dam</option></select>
                        </div>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={parentFormData.breed || ''} onChange={e => setParentFormData({...parentFormData, breed: e.target.value})} placeholder="Breed/Generation (e.g. F1 Pomsky)" />
                      </div>
                      <textarea rows={6} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={parentFormData.description || ''} onChange={e => setParentFormData({...parentFormData, description: e.target.value})} placeholder="Description/Personality" />
                    </div>
                  </div>
                  <div className="p-8 bg-slate-50 flex justify-end gap-3"><button onClick={cancelEdit} className="px-6 py-2">Cancel</button><button onClick={saveParent} className="px-10 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Save Parent</button></div>
                </div>
              </div>
            )}

            {/* SCHEDULE MODAL */}
            {editingId !== null && activeTab === 'schedule' && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={cancelEdit}></div>
                <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                  <div className="p-8 border-b border-slate-100 bg-teal-50"><h2 className="text-2xl font-black text-teal-900">Manage Litter Info</h2></div>
                  <div className="p-8 space-y-6">
                    <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" value={scheduleFormData.period || ''} onChange={e => setScheduleFormData({...scheduleFormData, period: e.target.value})} placeholder="Season (e.g. Winter 2024)" />
                    <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold" value={scheduleFormData.event || ''} onChange={e => setScheduleFormData({...scheduleFormData, event: e.target.value})} placeholder="Event Title (e.g. Nova x Arctic Litter)" />
                    <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" value={scheduleFormData.date || ''} onChange={e => setScheduleFormData({...scheduleFormData, date: e.target.value})} placeholder="Date Expected" />
                    <textarea rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" value={scheduleFormData.details || ''} onChange={e => setScheduleFormData({...scheduleFormData, details: e.target.value})} placeholder="Expectation/Details" />
                  </div>
                  <div className="p-8 bg-slate-50 flex justify-end gap-3"><button onClick={cancelEdit} className="px-6 py-2">Cancel</button><button onClick={saveSchedule} className="px-10 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Save Litter</button></div>
                </div>
              </div>
            )}

            {/* ARTICLE MODAL */}
            {editingId !== null && activeTab === 'articles' && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={cancelEdit}></div>
                <div className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                  <div className="p-8 border-b border-slate-100 bg-teal-50"><h2 className="text-2xl font-black text-teal-900">Manage Article</h2></div>
                  <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                    <ImageUploader label="Article Image" currentImage={articleFormData.image} onImageChange={(base64) => setArticleFormData({...articleFormData, image: base64})} />
                    <input className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={articleFormData.title || ''} onChange={e => setArticleFormData({...articleFormData, title: e.target.value})} placeholder="Title" />
                    <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl" value={(articleFormData.content || []).join('\n\n')} onChange={e => setArticleFormData({...articleFormData, content: e.target.value.split('\n\n')})} placeholder="Body Content" />
                  </div>
                  <div className="p-8 bg-slate-50 flex justify-end gap-3"><button onClick={cancelEdit} className="px-6 py-2">Discard</button><button onClick={saveArticle} className="px-10 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Publish</button></div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Entry</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Info</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeTab === 'puppies' && puppies.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-8 py-6 flex items-center gap-4"><img src={p.image} className="w-16 h-16 rounded-xl object-cover" /> <p className="font-bold">{p.name}</p></td>
                      <td className="px-8 py-6 text-sm text-slate-500">{p.status} • {p.age}</td>
                      <td className="px-8 py-6 text-right"><button onClick={() => startPuppyEdit(p)} className="p-2 text-teal-600 font-bold uppercase text-[10px]">Edit</button><button onClick={() => deletePuppy(p.id)} className="p-2 text-red-600 ml-4 font-bold uppercase text-[10px]">Delete</button></td>
                    </tr>
                  ))}
                  {activeTab === 'parents' && parents.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-8 py-6 flex items-center gap-4"><img src={p.image} className="w-16 h-16 rounded-xl object-cover" /> <p className="font-bold">{p.name}</p></td>
                      <td className="px-8 py-6 text-sm text-slate-500">{p.role} • {p.breed}</td>
                      <td className="px-8 py-6 text-right"><button onClick={() => startParentEdit(p)} className="p-2 text-teal-600 font-bold uppercase text-[10px]">Edit</button><button onClick={() => deleteParent(p.id)} className="p-2 text-red-600 ml-4 font-bold uppercase text-[10px]">Delete</button></td>
                    </tr>
                  ))}
                  {activeTab === 'schedule' && schedule.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-8 py-6 font-bold">{s.event}</td>
                      <td className="px-8 py-6 text-sm text-slate-500">{s.period} • {s.date}</td>
                      <td className="px-8 py-6 text-right"><button onClick={() => startScheduleEdit(s, idx)} className="p-2 text-teal-600 font-bold uppercase text-[10px]">Edit</button><button onClick={() => deleteSchedule(idx)} className="p-2 text-red-600 ml-4 font-bold uppercase text-[10px]">Delete</button></td>
                    </tr>
                  ))}
                  {activeTab === 'articles' && blogPosts.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50/50">
                      <td className="px-8 py-6 font-bold">{a.title}</td>
                      <td className="px-8 py-6 text-sm text-slate-500">{a.category} • {a.date}</td>
                      <td className="px-8 py-6 text-right"><button onClick={() => startArticleEdit(a)} className="p-2 text-teal-600 font-bold uppercase text-[10px]">Edit</button><button onClick={() => deleteArticle(a.id)} className="p-2 text-red-600 ml-4 font-bold uppercase text-[10px]">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
