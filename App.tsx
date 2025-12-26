
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Puppies from './components/Puppies';
import Schedule from './components/Schedule';
import BlogSection from './components/BlogSection';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';
import AdoptionModal from './components/AdoptionModal';
import PuppyGallery from './components/PuppyGallery';
import PuppyProfile from './components/PuppyProfile';
import MeetTheParents from './components/MeetTheParents';
import AdminDashboard from './components/AdminDashboard';
import AboutPage from './components/AboutPage';
import SchedulePage from './components/SchedulePage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import ContactPage from './components/ContactPage';
import WaitlistPage from './components/WaitlistPage';
import AdminLoginModal from './components/AdminLoginModal';
import { 
  INITIAL_PUPPIES, 
  SITE_ASSETS as DEFAULT_ASSETS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_PARENTS,
  INITIAL_SCHEDULE,
  SOCIAL_LINKS, 
  BREEDER_CONTACT_EMAIL,
  BREEDER_PHONE
} from './constants';
import { Puppy, BlogPost, Parent, ScheduleEvent } from './types';

type View = 'home' | 'puppies' | 'puppy-profile' | 'parents' | 'about' | 'schedule' | 'blog' | 'article' | 'contact' | 'admin' | 'waitlist';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedPuppyId, setSelectedPuppyId] = useState<string | null>(null);
  const [puppies, setPuppies] = useState<Puppy[]>(INITIAL_PUPPIES);
  const [parents, setParents] = useState<Parent[]>(INITIAL_PARENTS);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(INITIAL_SCHEDULE);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adoptionInquiryName, setAdoptionInquiryName] = useState<string | undefined>(undefined);

  // Dynamic Site Assets State
  const [siteAssets, setSiteAssets] = useState(DEFAULT_ASSETS);

  useEffect(() => {
    // Admin check
    const adminSession = sessionStorage.getItem('pawsome_admin_active');
    if (adminSession === 'true') {
      setIsAdmin(true);
    }

    // Load Puppies
    const savedPuppies = localStorage.getItem('pawsome_puppies');
    if (savedPuppies) {
      try { setPuppies(JSON.parse(savedPuppies)); } catch (e) {}
    }

    // Load Parents
    const savedParents = localStorage.getItem('pawsome_parents');
    if (savedParents) {
      try { setParents(JSON.parse(savedParents)); } catch (e) {}
    }

    // Load Schedule
    const savedSchedule = localStorage.getItem('pawsome_schedule');
    if (savedSchedule) {
      try { setSchedule(JSON.parse(savedSchedule)); } catch (e) {}
    }

    // Load Blogs
    const savedBlogs = localStorage.getItem('pawsome_blogs');
    if (savedBlogs) {
      try { setBlogPosts(JSON.parse(savedBlogs)); } catch (e) {}
    }

    // Load Site Assets (Images)
    const savedAssets = localStorage.getItem('pawsome_site_assets');
    if (savedAssets) {
      try { 
        const parsed = JSON.parse(savedAssets);
        setSiteAssets({
          ...DEFAULT_ASSETS,
          ...parsed,
          branding: { ...DEFAULT_ASSETS.branding, ...parsed.branding },
          sections: { ...DEFAULT_ASSETS.sections, ...parsed.sections }
        });
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pawsome_puppies', JSON.stringify(puppies));
  }, [puppies]);

  useEffect(() => {
    localStorage.setItem('pawsome_parents', JSON.stringify(parents));
  }, [parents]);

  useEffect(() => {
    localStorage.setItem('pawsome_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('pawsome_blogs', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('pawsome_site_assets', JSON.stringify(siteAssets));
  }, [siteAssets]);

  const openAdoptionModal = (puppyName?: string) => {
    setAdoptionInquiryName(puppyName);
    setIsAdoptionModalOpen(true);
  };

  const closeAdoptionModal = () => {
    setIsAdoptionModalOpen(false);
    setAdoptionInquiryName(undefined);
  };

  const handleAdminAuth = () => {
    setIsAdmin(true);
    sessionStorage.setItem('pawsome_admin_active', 'true');
    setIsLoginModalOpen(false);
    setCurrentView('admin');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('pawsome_admin_active');
    setCurrentView('home');
  };

  const navigateTo = (view: View, id?: string) => {
    if (view === 'admin' && !isAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    if (view === 'article' && id) {
      setSelectedArticleId(id);
    }
    if (view === 'puppy-profile' && id) {
      setSelectedPuppyId(id);
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const selectedArticle = selectedArticleId ? blogPosts.find(p => p.id === selectedArticleId) : null;
  const selectedPuppy = selectedPuppyId ? puppies.find(p => p.id === selectedPuppyId) : null;

  return (
    <div className="min-h-screen relative flex flex-col">
      <Navbar 
        logo={siteAssets.branding.logo}
        onOpenAdoption={() => openAdoptionModal()} 
        onNavigateHome={() => navigateTo('home')}
        onNavigatePuppies={() => navigateTo('puppies')}
        onNavigateParents={() => navigateTo('parents')}
        onNavigateSchedule={() => navigateTo('schedule')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateBlog={() => navigateTo('blog')}
        onNavigateContact={() => navigateTo('contact')}
      />
      
      <div className="flex-grow">
        {currentView === 'home' && (
          <main>
            <Hero 
              logo={siteAssets.branding.logo}
              backgroundImage={siteAssets.sections.heroBackground}
              onOpenAdoption={() => openAdoptionModal()} 
            />
            <About image={siteAssets.sections.aboutMain} />
            <Puppies 
              puppies={puppies} 
              onOpenAdoption={openAdoptionModal} 
              onViewPuppy={(id) => navigateTo('puppy-profile', id)}
              onViewAll={() => navigateTo('puppies')} 
            />
            <Schedule schedule={schedule} onJoinWaitlist={() => navigateTo('waitlist')} />
            <BlogSection 
              blogPosts={blogPosts}
              onViewAll={() => navigateTo('blog')} 
              onReadArticle={(id) => navigateTo('article', id)}
            />
            <Reviews />
            <Contact />
          </main>
        )}

        {currentView === 'puppies' && (
          <PuppyGallery 
            puppies={puppies} 
            onOpenAdoption={openAdoptionModal} 
            onViewPuppy={(id) => navigateTo('puppy-profile', id)}
            onBackToHome={() => navigateTo('home')} 
            onNavigateParents={() => navigateTo('parents')}
            onNavigateSchedule={() => navigateTo('schedule')}
          />
        )}

        {currentView === 'puppy-profile' && selectedPuppy && (
          <PuppyProfile 
            puppy={selectedPuppy}
            onOpenAdoption={openAdoptionModal}
            onBack={() => navigateTo('puppies')}
          />
        )}

        {currentView === 'parents' && (
          <MeetTheParents 
            parents={parents}
            onBackToHome={() => navigateTo('home')} 
            onNavigatePuppies={() => navigateTo('puppies')}
            onNavigateSchedule={() => navigateTo('schedule')}
          />
        )}

        {currentView === 'about' && (
          <AboutPage 
            image={siteAssets.sections.aboutMain}
            onBackToHome={() => navigateTo('home')} 
          />
        )}

        {currentView === 'schedule' && (
          <SchedulePage 
            schedule={schedule}
            onBackToHome={() => navigateTo('home')} 
            onNavigateWaitlist={() => navigateTo('waitlist')} 
          />
        )}

        {currentView === 'waitlist' && (
          <WaitlistPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentView === 'blog' && (
          <BlogPage 
            blogPosts={blogPosts}
            onBackToHome={() => navigateTo('home')} 
            onReadArticle={(id) => navigateTo('article', id)}
          />
        )}

        {currentView === 'article' && selectedArticle && (
          <BlogPostPage 
            post={selectedArticle} 
            onBackToBlog={() => navigateTo('blog')} 
          />
        )}

        {currentView === 'contact' && (
          <ContactPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            puppies={puppies} 
            setPuppies={setPuppies} 
            parents={parents}
            setParents={setParents}
            schedule={schedule}
            setSchedule={setSchedule}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            siteAssets={siteAssets}
            setSiteAssets={setSiteAssets}
            onBackToHome={() => navigateTo('home')} 
            onLogout={handleLogout}
          />
        )}
      </div>

      <footer className="bg-teal-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={siteAssets.branding.logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-teal-400">Paw-some Pomskies</h3>
              </div>
              <p className="opacity-70 leading-relaxed text-sm mb-6">
                Elevating the Pomsky breed through ethical practices, DNA testing, and unshakeable love.
              </p>
              <div className="flex justify-center md:justify-start">
                <a 
                  href={SOCIAL_LINKS.goodDog} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-32 transition-transform hover:scale-105"
                >
                  <img src={siteAssets.branding.goodDogBadge} alt="Good Dog Certified Breeder" className="w-full h-auto" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Explore</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><button onClick={() => navigateTo('home')} className="hover:text-teal-400 transition-colors">Home</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-teal-400 transition-colors">Our Story</button></li>
                <li><button onClick={() => navigateTo('parents')} className="hover:text-teal-400 transition-colors">Meet the Parents</button></li>
                <li><button onClick={() => navigateTo('puppies')} className="hover:text-teal-400 transition-colors">Puppy Gallery</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Knowledge</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><button onClick={() => navigateTo('blog')} className="hover:text-teal-400 transition-colors">Breeder Blog</button></li>
                <li><button onClick={() => navigateTo('schedule')} className="hover:text-teal-400 transition-colors">Upcoming Litters</button></li>
                <li><button onClick={() => navigateTo('waitlist')} className="hover:text-teal-400 transition-colors text-teal-300 font-bold">Join Waitlist</button></li>
                <li><button onClick={() => navigateTo('admin')} className="text-teal-500 font-bold hover:text-teal-300 transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Breeder Portal
                </button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Stay Connected</h4>
              <p className="opacity-70 mb-2 text-sm font-bold">Frisco, North Texas</p>
              <p className="opacity-70 mb-6 text-sm flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {BREEDER_PHONE}
              </p>
              <div className="flex justify-center md:justify-start gap-4 mb-4">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors font-bold text-xs">FB</a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors font-bold text-xs">IG</a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors font-bold text-xs">TT</a>
              </div>
              <a href={`mailto:${BREEDER_CONTACT_EMAIL}`} className="text-teal-400 hover:underline text-sm break-all">{BREEDER_CONTACT_EMAIL}</a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-teal-900 text-center opacity-50 text-xs">
            &copy; {new Date().getFullYear()} Paw-some Pomskies. All Rights Reserved.
          </div>
        </div>
      </footer>

      <AiAssistant />
      <AdoptionModal 
        logo={siteAssets.branding.logo}
        isOpen={isAdoptionModalOpen} 
        onClose={closeAdoptionModal} 
        initialPuppy={adoptionInquiryName}
      />
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onAuthenticated={handleAdminAuth}
      />
    </div>
  );
};

export default App;
