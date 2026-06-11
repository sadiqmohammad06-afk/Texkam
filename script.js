/**
 * TexKam - Core Application Logic
 * Maintains view routing, modal states, sidebar, and multi-language UI logic.
 */

// Define translation mapping dictionary
const translations = {
  hinglish: {
    langName: "Hinglish",
    langCodeSmall: "HIN",
    searchPh: "Bolo ya type karo...",
    searchHint: "Example: 20 Juki operator chahiye",
    findJobTitle: "Find Jobs",
    findJobSub: "Kaam dhoondo aasani se",
    postJobTitle: "Post a Job",
    postJobSub: "Apni requirement daalein",
    filterAll: "All Jobs",
    filterNear: "Near Me",
    topJobsTitle: "✨ Top Jobs For You",
    marketWallTitle: "Market Wall",
    marketWallSub: "Kapda, yarn, machine, spare parts aur local deals",
    aiPopupTitle: "TexKam AI Assistant",
    aiPopupDisc: "Rough language me bolo. AI tumhari requirement ko proper post bana dega."
  },
  hindi: {
    langName: "हिंदी",
    langCodeSmall: "हिं",
    searchPh: "बोलो या टाइप करो...",
    searchHint: "उदाहरण: 20 जूकी ऑपरेटर चाहिए",
    findJobTitle: "काम ढूँढें",
    findJobSub: "आसानी से काम खोजें",
    postJobTitle: "Post a Job",
    postJobSub: "अपनी जरूरत बताएं",
    filterAll: "सभी नौकरियाँ",
    filterNear: "मेरे आस-पास",
    topJobsTitle: "✨ आपके लिए मुख्य नौकरियाँ",
    marketWallTitle: "मार्केट वॉल",
    marketWallSub: "कपड़ा, यार्न, मशीन, स्पेयर पार्ट और लोकल डील",
    aiPopupTitle: "टेक्सकाम एआई असिस्टेंट",
    aiPopupDisc: "अपनी साधारण भाषा में बोलें। एआई आपकी आवश्यकता को सही पोस्ट बना देगा।"
  },
  english: {
    langName: "English",
    langCodeSmall: "ENG",
    searchPh: "Speak or type...",
    searchHint: "Example: Need 20 Juki operators",
    findJobTitle: "Find Jobs",
    findJobSub: "Search work easily",
    postJobTitle: "Post a Job",
    postJobSub: "Post your requirements",
    filterAll: "All Jobs",
    filterNear: "Near Me",
    topJobsTitle: "✨ Top Jobs For You",
    marketWallTitle: "Market Wall",
    marketWallSub: "Fabric, yarn, machines, spare parts & local deals",
    aiPopupTitle: "TexKam AI Assistant",
    aiPopupDisc: "Speak in natural language. AI will draft a proper job requirement post for you."
  }
};

// Cyclic sequence for language toggling
const langCycle = ["hinglish", "hindi", "english"];
let currentLangIndex = 0;

let activeCategory = null;
let activeSubCategory = null;

const initialJobs = [
  {
    title: "Juki Operator Required",
    company: "R.K. Bedsheet Factory",
    location: "📍 Sanoli Road, Panipat",
    distance: 1.2,
    verified: true,
    isTodayKey: true,
    salary: "₹14,000 - ₹18,000",
    unit: "/month",
    tags: ["Full Time", "Experience: 1+ saal"],
    time: "1h ago",
    category: "silai",
    subCategory: "Juki Machine",
    icon: "needle-thread",
    bgClass: "bg-juki-light",
    stroke: "#3b82f6",
    fill: "transparent"
  },
  {
    title: "Loom Operator (Rapier)",
    company: "Shiv Shakti Textiles",
    location: "📍 Sector 29, Panipat",
    distance: 1.2,
    verified: true,
    isTodayKey: true,
    salary: "₹12,000 - ₹15,000",
    unit: "/month",
    tags: ["Full Time", "Experience: 2+ saal"],
    time: "1h ago",
    category: "loom",
    subCategory: "Power Loom",
    icon: "cylinder",
    bgClass: "bg-loom-light",
    stroke: "#071f64",
    fill: "#3b82f6"
  },
  {
    title: "Cutting Master Required",
    company: "Anil Textile",
    location: "📍 Model Town, Panipat",
    distance: 0.8,
    verified: true,
    isTodayKey: true,
    salary: "₹16,000 - ₹22,000",
    unit: "/month",
    tags: ["Full Time", "Exp: 3+ saal"],
    time: "5h ago",
    category: "cutting",
    subCategory: "Fabric Cutting",
    icon: "scissors",
    bgClass: "bg-cut-light",
    stroke: "#ef4444",
    fill: "transparent"
  },
  {
    title: "500 Bedsheet Stitching Work",
    company: "Panipat Home Textile",
    location: "📍 Sector 25, Panipat",
    distance: 3.1,
    verified: false,
    isTodayKey: false,
    salary: "₹12 - ₹18",
    unit: "/piece",
    tags: ["Contract", "Piece Rate"],
    time: "1d ago",
    category: "silai",
    subCategory: "Bedsheet Stitching",
    icon: "package",
    bgClass: "bg-pack-light",
    stroke: "#10b981",
    fill: "#a7f3d0"
  }
];

const subCatsMap = {
  silai: {
    title: "Silai Kaam Jobs & Requirements",
    items: ["Single Needle", "Double Needle", "Juki Machine", "Overlock", "Interlock", "Pico", "Flatlock", "Button Machine", "Kaj Machine", "Bedsheet Stitching", "Pillow Cover Stitching", "Cushion Cover Stitching", "Quilt Stitching", "Curtain Stitching", "Ladies Suit Stitching", "Boutique Stitching", "Helper for Stitching"]
  },
  cutting: {
    title: "Cutting Jobs & Requirements",
    items: ["Fabric Cutting", "Bedsheet Cutting", "Quilt Cutting", "Cushion Cutting", "Curtain Cutting", "Cutting Master", "Helper for Cutting", "Thread Cutting", "Sample Cutting"]
  },
  loom: {
    title: "Loom Jobs & Requirements",
    items: ["Power Loom", "Handloom", "Rapier Loom", "Dobby Loom", "Jacquard Loom", "Towel Loom", "Durrie Loom", "Loom Helper", "Loom Operator", "Weaver"]
  },
  packing: {
    title: "Packing Jobs & Requirements",
    items: ["Packing Staff", "Folding", "Labeling", "Tagging", "Quality Check", "Dispatch", "Loading", "Palledar", "Helper"]
  },
  factory: {
    title: "Factory Jobs & Requirements",
    items: ["Factory Helper", "Supervisor", "Production Staff", "Machine Operator", "Line Incharge", "Store Keeper", "Quality Checker", "Night Shift Worker", "Office Staff"]
  },
  maintenance: {
    title: "Maintenance Jobs & Requirements",
    items: ["Electrician", "Mechanic", "Machine Repair", "Welder", "Carpenter", "Plumber", "Fitter", "Compressor Mechanic", "Generator Mechanic"]
  },
  boutique: {
    title: "Boutique Jobs & Requirements",
    items: ["Ladies Tailor", "Designer Suit", "Bridal Wear", "Alteration", "Kurti Stitching", "Boutique Karigar", "Embroidery", "Hand Work", "Pattern Master"]
  },
  office: {
    title: "Office Jobs & Requirements",
    items: ["Accountant", "Data Entry", "Computer Operator", "HR", "Sales Executive", "Office Boy", "Billing Staff", "Receptionist", "Manager"]
  }
};

// --- DATASET DEFINITIONS ---
const initialGroups = [
  {
    id: "g1",
    name: "Juki Operators Group",
    desc: "Juki, Single Needle, Overlock workers",
    count: "1.2K",
    online: 32,
    icon: "users",
    joined: true,
    messages: [
      { sender: "Sanjay Kumar", text: "Sanjay Bhai, sector 29 me operator chahiye, rate ₹14/pc hai.", time: "10m ago", avatar: "👨‍🔧" },
      { sender: "Deepak Stitcher", text: "Koi Juki machine rent pe dega please contact.", time: "5m ago", avatar: "👤" },
      { sender: "Ramesh Juki", text: "Model town me overtime mil rha hai kya?", time: "Just now", avatar: "🧵" }
    ]
  },
  {
    id: "g2",
    name: "Loom & Weaver Group",
    desc: "Power Loom, Handloom, Rapier Loom workers",
    count: "1.0K",
    online: 45,
    icon: "users",
    joined: true,
    messages: [
      { sender: "Anil Weaver", text: "Rapier loom par experienced master chahiye, daily wages standard.", time: "30m ago", avatar: "🧙‍♂️" },
      { sender: "Sonu Loom", text: "Power loom chalane wale operators click karein, good rates.", time: "15m ago", avatar: "👤" },
      { sender: "Shiv Textiles", text: "Power loom yarn available, ready for delivery.", time: "2m ago", avatar: "🏢" }
    ]
  },
  {
    id: "g3",
    name: "Stitching & Cutting Masters",
    desc: "Stitching, cutting, master karigar",
    count: "980",
    online: 28,
    icon: "users",
    joined: false,
    messages: [
      { sender: "Mastan Cutter", text: "Bedsheet cutting me finishing ke sath fast work available.", time: "1h ago", avatar: "✂️" },
      { sender: "Golu Master", text: "Ladies suit design pattern master ready for boutique.", time: "40m ago", avatar: "👤" }
    ]
  },
  {
    id: "g4",
    name: "Helpers & Palledar Group",
    desc: "Helper, loading, packing, factory support",
    count: "2.1K",
    online: 56,
    icon: "users",
    joined: false,
    messages: [
      { sender: "Amit Loading", text: "Loading/unloading support ready, team of 5.", time: "2h ago", avatar: "💪" },
      { sender: "Ramu Help", text: "Helper vacancies are open in dye house.", time: "1h ago", avatar: "👤" }
    ]
  },
  {
    id: "g5",
    name: "Maintenance & Mechanics",
    desc: "Electrician, mechanic, machine repair",
    count: "760",
    online: 18,
    icon: "users",
    joined: false,
    messages: [
      { sender: "Suresh Repair", text: "Sewing machine board repair and calibration in 1 hour.", time: "3h ago", avatar: "🛠️" },
      { sender: "Kamal Elec", text: "Industrial stitching wiring setups done at cheap rates.", time: "2h ago", avatar: "⚡" }
    ]
  }
];

const initialCommunityPosts = [
  {
    id: "cp1",
    author: "Rakesh Sharma",
    avatar: "👤",
    role: "Sr. Juki Operator",
    time: "2h ago",
    title: "Panipat me piece rate kya chal rha hai?",
    content: "Bhaiyo, please batao aaj kal single needle sheet stitching ka piece rate standard kya mil rha hai Sector 29 me? Mujhe ₹12 per piece offer ho rha hai, kya ye sahi hai?",
    tag: "Local Rates",
    likes: 18,
    liked: false,
    comments: [
      { author: "Satish Kumar", avatar: "👨‍🔧", text: "Bhai ₹12 standard hai, lekin agar cotton dense hai to ₹14 milna chahiye.", time: "1h ago" },
      { author: "Hitesh Weaver", avatar: "👤", text: "Hamare factory me fully automatic loom par ₹13 de rhe hain.", time: "30m ago" }
    ]
  },
  {
    id: "cp2",
    author: "Anil Textile Industries",
    avatar: "🏭",
    role: "Factory Owner",
    time: "4h ago",
    title: "TexKam verified network se hamesha acche karigar milte hain!",
    content: "Pichle hafte humne 10 overlock karigar ki requirement dali thi. 1 hi din me hamesha contact ho gaya aur kaam shuru ho gaya. Highly recommended platform for all Panipat factories.",
    tag: "Hiring Help",
    likes: 24,
    liked: true,
    comments: [
      { author: "Sanjay Operator", avatar: "👨‍🔧", text: "Sir ji, aapki factory me timing aur payment dono badiya hai.", time: "2h ago" }
    ]
  },
  {
    id: "cp3",
    author: "Sunil Mechanic",
    avatar: "🛠️",
    role: "Master Mechanic",
    time: "1d ago",
    title: "New computerized sewing machine repair service",
    content: "Computer boards aur automatic thread trimmer diagnostics ab local rate par Sanoli road shop par. Kisi ko board repair karwana ho to comments me likhein ya inbox karein.",
    tag: "Silai Kaam",
    likes: 12,
    liked: false,
    comments: []
  }
];

const app = {
  isLoggedIn: false,
  activeGroupId: null,
  activeCommunityFilter: 'All',

  init() {
    // Initialize standard Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
    this.setupListeners();
    this.applyLanguage();
    this.renderJobs();
    
    // Initial Dynamic Renders
    this.renderGroups();
    this.renderCommunityFeed();
  },

  setupListeners() {
    // Sidebar
    document.getElementById('menu-btn').addEventListener('click', () => this.openSidebar());
    // Language Toggle
    document.getElementById('lang-btn').addEventListener('click', () => this.toggleLanguage());
    
    // Close dropdowns on document click
    document.addEventListener('click', () => {
       document.querySelectorAll('.group-dropdown-custom').forEach(dd => {
          dd.style.display = 'none';
       });
    });
  },

  // --- NAVIGATION LOGIC ---
  switchView(viewId, triggerBtn = null) {
    // Handle 'chats' mapped to 'groups'
    let targetSection = viewId === 'chats' ? 'groups' : viewId;

    // Hide all views
    document.querySelectorAll('#main-content .view').forEach(view => {
      view.classList.remove('active');
    });

    // Show target
    const target = document.getElementById('view-' + targetSection);
    if (target) {
      target.classList.add('active');
      // Scroll to top
      document.getElementById('main-content').scrollTop = 0;
    }

    // Hide bottom navigation in active chat view for natural fullscreen layout
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
       if (targetSection === 'active-chat') {
          bottomNav.style.display = 'none';
       } else {
          bottomNav.style.display = 'flex';
       }
    }

    // Update Bottom Nav state
    if (triggerBtn) {
      document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => btn.classList.remove('active'));
      triggerBtn.classList.add('active');
    } else {
      // Sync bottom nav if switched from elsewhere (e.g. Action Cards, Sidebar)
      document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => {
        btn.classList.remove('active');
        const spanText = btn.querySelector('span').innerText.toLowerCase();
        if (spanText === targetSection || (spanText === 'chats' && targetSection === 'groups')) {
          btn.classList.add('active');
        }
      });
    }

    this.closeSidebar();
  },

  // --- SIDEBAR LOGIC ---
  openSidebar() {
    document.getElementById('desktop-simulator').classList.add('sidebar-open');
  },
  
  closeSidebar() {
    document.getElementById('desktop-simulator').classList.remove('sidebar-open');
  },

  // --- MODAL LOGIC ---
  openModal(modalId) {
    if (modalId === 'post-modal') {
      this.currentPostType = 'karigar';
      if (!this.formMedia) {
         this.formMedia = { karigar: null, maal: null, job: null, contractor: null, direct: null, market: null };
      }
      let defaultWorkText = "";
      if (activeSubCategory) {
         defaultWorkText = activeSubCategory + " chahiye";
      } else if (activeCategory) {
         const catNames = {
             'silai': 'Machine Operator',
             'cutting': 'Cutting Master',
             'loom': 'Loom Operator',
             'packing': 'Packing Staff',
             'factory': 'Factory Worker',
             'maintenance': 'Mechanic/Electrician',
             'boutique': 'Tailor/Karigar',
             'office': 'Office Staff'
         };
         defaultWorkText = (catNames[activeCategory] || "Worker") + " chahiye";
      }

      const karigarInput = document.getElementById('karigar-work-skill');
      if (karigarInput) karigarInput.value = activeSubCategory ? (activeSubCategory + " chahiye") : "";
      
      const maalInput = document.getElementById('maal-name');
      if (maalInput) maalInput.value = defaultWorkText;
      
      const jobRoleInput = document.getElementById('job-role');
      if (jobRoleInput) jobRoleInput.value = activeSubCategory ? activeSubCategory : defaultWorkText;
      
      const jobTitleInput = document.getElementById('job-title');
      if (jobTitleInput) jobTitleInput.value = "";
      
      const contractorInput = document.getElementById('contractor-work');
      if (contractorInput) contractorInput.value = defaultWorkText;

      if (activeCategory) {
         const selectCat = document.getElementById('job-category');
         if(selectCat) {
             const optionMap = {
                'silai': 'Textile / Factory Work',
                'cutting': 'Textile / Factory Work',
                'loom': 'Textile / Factory Work',
                'packing': 'Textile / Factory Work',
                'factory': 'Textile / Factory Work',
                'maintenance': 'Maintenance / Mechanic',
                'boutique': 'Boutique / Fashion',
                'office': 'Office Job'
             };
             if(optionMap[activeCategory]) selectCat.value = optionMap[activeCategory];
         }
      }
    }
    document.getElementById(modalId).classList.add('open');
    document.getElementById(modalId + '-overlay').classList.add('open');
  },

  closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
    document.getElementById(modalId + '-overlay').classList.remove('open');
  },

  sendLoginOtp() {
    const mobileInput = document.getElementById('login-mobile-input');
    const mobileNum = mobileInput ? mobileInput.value.trim() : '';
    if (!mobileNum || mobileNum.length < 10) {
      this.showToast('Please enter your 10-digit mobile number! ⚠️');
      return;
    }
    this.closeModal('login-modal');
    this.isLoggedIn = true;
    this.showToast('Successfully Logged In! 🎉');

    // Update header login button to say "Log Out"
    const loginHeaderBtn = document.getElementById('login-header-btn');
    if (loginHeaderBtn) {
      loginHeaderBtn.innerText = 'Log Out';
      loginHeaderBtn.setAttribute('onclick', 'app.logout()');
    }

    // Update sidebar profile card
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarPhone = document.getElementById('sidebar-user-phone');
    if (sidebarName) sidebarName.innerText = 'TexKam Member';
    if (sidebarPhone) sidebarPhone.innerText = '+91 ' + mobileNum;

    if (mobileInput) mobileInput.value = '';
  },

  logout() {
    this.isLoggedIn = false;
    this.showToast('Logged Out successfully! 🚪');

    // Update header login button back to "Login"
    const loginHeaderBtn = document.getElementById('login-header-btn');
    if (loginHeaderBtn) {
      loginHeaderBtn.innerText = 'Login';
      loginHeaderBtn.setAttribute('onclick', "app.openModal('login-modal')");
    }

    // Reset sidebar profile card
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarPhone = document.getElementById('sidebar-user-phone');
    if (sidebarName) sidebarName.innerText = 'Guest User';
    if (sidebarPhone) sidebarPhone.innerText = 'Not Logged In';
  },

  triggerMediaUpload(type) {
    const input = document.getElementById(`media-upload-${type}`);
    if (input) {
      input.click();
    }
  },

  handleMediaSelection(type, event) {
    if (!this.formMedia) {
      this.formMedia = { karigar: null, maal: null, job: null, contractor: null, direct: null, market: null };
    }
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      this.showToast("File size too large! Max 15MB ⚠️");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';

    this.formMedia[type] = {
      file: file,
      url: objectUrl,
      type: mediaType,
      name: file.name
    };

    this.renderMediaPreview(type);
  },

  renderMediaPreview(type) {
    const media = this.formMedia ? this.formMedia[type] : null;
    
    if (type === 'market') {
      const preview = document.getElementById('market-upload-preview');
      if (!preview) return;
      if (!media) {
         preview.style.display = 'none';
         return;
      }
      preview.style.display = 'flex';
      
      const imgContainer = preview.querySelector('div[style*="width:48px"]');
      const textContainer = preview.querySelector('div[style*="flex:1"]');
      
      if (imgContainer) {
         if (media.type === 'video') {
            imgContainer.innerHTML = `<video src="${media.url}" style="width:100%; height:100%; object-fit:cover;" muted></video>`;
         } else {
            imgContainer.innerHTML = `<img src="${media.url}" style="width:100%; height:100%; object-fit:cover;">`;
         }
      }
      if (textContainer) {
         textContainer.innerHTML = `<p style="font-size:13px;font-weight:700;color:var(--navy);">${media.name}</p><p style="font-size:11px;color:#22c55e;font-weight:700;">Ready to upload</p>`;
      }
      return;
    }

    const container = document.getElementById(`media-preview-container-${type}`);
    if (!container) return;

    if (!media) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    container.style.display = 'block';
    container.style.marginTop = '12px';
    container.style.padding = '8px';
    container.style.border = '1px solid #cbd5e1';
    container.style.borderRadius = '12px';
    container.style.background = '#f8fafc';

    let mediaHtml = '';
    if (media.type === 'video') {
      mediaHtml = `
        <video src="${media.url}" style="width:100px; height:100px; border-radius:8px; object-fit:cover;" controls muted></video>
      `;
    } else {
      mediaHtml = `
        <img src="${media.url}" style="width:100px; height:100px; border-radius:8px; object-fit:cover;" alt="preview">
      `;
    }

    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="position:relative; flex-shrink:0;">
          ${mediaHtml}
          <div style="position:absolute; bottom:4px; right:4px; background:rgba(0,0,0,0.6); color:white; font-size:10px; padding:2px 4px; border-radius:4px; font-weight:700; text-transform:uppercase;">
            ${media.type}
          </div>
        </div>
        <div style="flex:1; min-width:0;">
          <p style="font-size:13px; font-weight:700; color:var(--navy); margin:0; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${media.name}</p>
          <p style="font-size:11px; color:#64748b; margin:2px 0 0 0;">Type: ${media.file.type || 'Unknown'}</p>
          <p style="font-size:11px; color:#22c55e; margin:2px 0 0 0; font-weight:700; display:flex; align-items:center; gap:3px;">
            <i data-lucide="check-circle" style="width:12px; height:12px;"></i> Ready to upload
          </p>
        </div>
        <button onclick="app.removeMedia('${type}')" style="background:#fee2e2; border:none; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#ef4444; cursor:pointer;" title="Delete">
          <i data-lucide="trash-2" style="width:18px; height:18px;"></i>
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  removeMedia(type) {
    if (!this.formMedia) {
      this.formMedia = { karigar: null, maal: null, job: null, contractor: null, direct: null, market: null };
    }
    if (this.formMedia[type] && this.formMedia[type].url) {
      URL.revokeObjectURL(this.formMedia[type].url);
    }
    this.formMedia[type] = null;
    this.renderMediaPreview(type);
    
    // reset file input
    const input = document.getElementById(`media-upload-${type}`);
    if (input) input.value = '';
  },

  submitPostModal(msg) {
    const currentType = this.currentPostType || 'karigar';
    if (!this.formMedia) {
       this.formMedia = { karigar: null, maal: null, job: null, contractor: null, direct: null, market: null };
    }
    
    let newPostObj = null;
    let isCommunity = false;

    if (currentType === 'karigar') {
       const workSkill = document.getElementById('karigar-work-skill')?.value || '';
       const count = document.getElementById('karigar-count')?.value || '';
       const rate = document.getElementById('karigar-rate')?.value || '';
       const location = document.getElementById('karigar-location')?.value || '';
       const isUrgent = document.getElementById('karigar-urgent')?.checked || false;

       if (!workSkill.trim()) {
           this.showToast('Please enter Work / Skill details! ⚠️');
           return;
       }

       newPostObj = {
           title: "Karigar Wanted: " + workSkill.substring(0, 30) + (workSkill.length > 30 ? "..." : ""),
           company: "Panipat Local Manufacturer",
           location: "📍 " + (location || "Panipat"),
           distance: 1.0,
           verified: true,
           isTodayKey: true,
           salary: rate || "₹12,000 - ₹18,000",
           unit: "",
           tags: [count ? count + " Karigar" : "Karigar Wanted", "Experience Needed"],
           time: "Just now",
           category: "silai",
           subCategory: "Juki Machine",
           icon: "needle-thread",
           bgClass: "bg-juki-light",
           stroke: "#3b82f6",
           fill: "transparent"
       };
       if (isUrgent) {
           newPostObj.tags.push("Urgent 🔥");
       }
    } 
    else if (currentType === 'maal') {
       const name = document.getElementById('maal-name')?.value || '';
       const qty = document.getElementById('maal-qty')?.value || '';
       const rate = document.getElementById('maal-rate')?.value || '';
       const location = document.getElementById('maal-location')?.value || '';
       
       if (!name.trim()) {
           this.showToast('Please enter Product / Maal Name! ⚠️');
           return;
       }

       newPostObj = {
           title: "Maal Order: " + name,
           company: "Order from Panipat Trader",
           location: "📍 " + (location || "Panipat"),
           distance: 1.5,
           verified: true,
           isTodayKey: true,
           salary: rate || "Rate Discuss",
           unit: "",
           tags: [qty ? "Qty: " + qty : "Stitching", "Contract Work"],
           time: "Just now",
           category: "silai",
           subCategory: "Stitching",
           icon: "needle-thread",
           bgClass: "bg-juki-light",
           stroke: "#3b82f6",
           fill: "transparent"
       };
    } 
    else if (currentType === 'job') {
       const catSelect = document.getElementById('job-category')?.value || 'silai';
       const role = document.getElementById('job-role')?.value || '';
       const title = document.getElementById('job-title')?.value || '';
       const company = document.getElementById('job-company')?.value || '';
       const loc = document.getElementById('job-loc')?.value || '';
       const salaryFrom = document.getElementById('job-salary-from')?.value || '';
       const salaryTo = document.getElementById('job-salary-to')?.value || '';
       const desc = document.getElementById('job-desc')?.value || '';

       if (!title.trim() && !role.trim()) {
           this.showToast('Please fill Job Role or Custom Job Title! ⚠️');
           return;
       }

       const salaryText = (salaryFrom || salaryTo) ? `₹${salaryFrom || '10,000'} - ₹${salaryTo || '20,000'}` : "₹12,000 - ₹18,000";

       newPostObj = {
           title: title || role || "Job Vacancy",
           company: company || "Panipat Textile Industry",
           location: "📍 " + (loc || "Panipat"),
           distance: 1.8,
           verified: true,
           isTodayKey: true,
           salary: salaryText,
           unit: "/month",
           tags: ["Full Time", "Experience required"],
           time: "Just now",
           category: catSelect.toLowerCase().includes('loom') ? 'loom' : 'silai',
           subCategory: role || "Staff",
           icon: "briefcase",
           bgClass: "bg-factory-light",
           stroke: "#475569",
           fill: "transparent"
       };
    } 
    else if (currentType === 'contractor') {
       const work = document.getElementById('contractor-work')?.value || '';
       const qty = document.getElementById('contractor-qty')?.value || '';
       const rate = document.getElementById('contractor-rate')?.value || '';
       const team = document.getElementById('contractor-team')?.value || '';
       const loc = document.getElementById('contractor-location')?.value || '';

       if (!work.trim()) {
           this.showToast('Please enter Work Details! ⚠️');
           return;
       }

       newPostObj = {
           title: "Contractor Wanted: " + work.substring(0, 30) + (work.length > 30 ? "..." : ""),
           company: "Panipat Bulk Order Manufacturer",
           location: "📍 " + (loc || "Panipat"),
           distance: 2.2,
           verified: true,
           isTodayKey: true,
           salary: rate || "Stitching, Loom",
           unit: "",
           tags: [team ? "Team size: " + team : "Contractor needed", "Bulk Work"],
           time: "Just now",
           category: "loom",
           subCategory: "Contract",
           icon: "users",
           bgClass: "bg-loom-light",
           stroke: "#071f64",
           fill: "#3b82f6"
       };
    } 
    else if (currentType === 'direct') {
       const content = document.getElementById('direct-content')?.value || '';
       const category = document.getElementById('direct-category')?.value || 'Textile Work';
       const loc = document.getElementById('direct-location')?.value || '';
       const salary = document.getElementById('direct-salary')?.value || '';

       if (!content.trim()) {
           this.showToast('Please enter requirement details! ⚠️');
           return;
       }

       isCommunity = true;
       initialCommunityPosts.unshift({
          id: 'cp_' + Date.now(),
          author: 'Guest User',
          avatar: '👤',
          role: "Verified Karigar",
          time: 'Just now',
          title: "Direct Requirement: " + category,
          content: content + (loc ? `\n\n📍 Location: ${loc}` : '') + (salary ? `\n💰 Offer: ${salary}` : ''),
          tag: category,
          likes: 0,
          liked: false,
          comments: []
       });

       const currentMedia = this.formMedia[currentType];
       if (currentMedia) {
         initialCommunityPosts[0].mediaUrl = currentMedia.url;
         initialCommunityPosts[0].mediaType = currentMedia.type;
       }
    }

    if (newPostObj && !isCommunity) {
       const currentMedia = this.formMedia[currentType];
       if (currentMedia) {
         newPostObj.mediaUrl = currentMedia.url;
         newPostObj.mediaType = currentMedia.type;
       }
       initialJobs.unshift(newPostObj);
    }

    this.removeMedia(currentType);

    // Reset input fields
    const fieldsToReset = [
      'karigar-work-skill', 'karigar-count', 'karigar-rate', 'karigar-location',
      'maal-name', 'maal-qty', 'maal-rate', 'maal-location', 'maal-phone',
      'job-role', 'job-title', 'job-company', 'job-loc', 'job-salary-from', 'job-salary-to', 'job-vacancies', 'job-phone', 'job-desc',
      'contractor-work', 'contractor-qty', 'contractor-rate', 'contractor-team', 'contractor-location', 'contractor-phone',
      'direct-content', 'direct-location', 'direct-salary', 'direct-phone'
    ];
    fieldsToReset.forEach(fid => {
       const el = document.getElementById(fid);
       if (el) el.value = '';
    });
    const chk = document.getElementById('karigar-urgent');
    if (chk) chk.checked = false;
    const chk2 = document.getElementById('job-urgent');
    if (chk2) chk2.checked = false;

    this.closeModal('post-modal');
    this.showToast(msg);
    
    if (isCommunity) {
       this.switchView('community');
       this.renderCommunityFeed();
    } else {
       this.switchView('jobs');
       this.renderJobs();
    }
  },

  showToast(msg) {
    let t = document.getElementById('toast');
    if(!t) {
        t = document.createElement('div');
        t.id = 'toast';
        document.body.appendChild(t);
    }
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => {
        t.classList.remove('show');
    }, 3000);
  },

  toggleFormChip(btn) {
    btn.parentElement.querySelectorAll('.form-chip').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
  },

  // --- AI LOGIC ---
  fillAi(text) {
    document.getElementById('ai-prompt').value = text;
  },

  sendAiQuery() {
    const input = document.getElementById('ai-prompt');
    if(input.value.trim() === '') return;
    
    // Simulate loading/response
    const btn = document.querySelector('.ai-send-btn i');
    const oldIcon = btn.getAttribute('data-lucide');
    btn.setAttribute('data-lucide', 'loader-2');
    btn.classList.add('animate-spin');
    window.lucide.createIcons();

    setTimeout(() => {
      // Switch to post modal
      this.closeModal('ai-modal');
      this.openModal('post-modal');
      input.value = '';
      
      // Reset icon
      btn.setAttribute('data-lucide', oldIcon);
      btn.classList.remove('animate-spin');
      window.lucide.createIcons();
    }, 600);
  },

  setPostModalType(type, btnObj) {
    this.currentPostType = type;
    document.querySelectorAll('.post-type-scroll .f-chip').forEach(btn => btn.classList.remove('active'));
    if(btnObj) btnObj.classList.add('active');
    
    document.querySelectorAll('#post-modal .dynamic-form').forEach(form => {
      form.style.display = 'none';
      form.classList.remove('active');
    });

    if (type === 'karigar') document.getElementById('form-karigar').style.display = 'block';
    if (type === 'maal') document.getElementById('form-maal').style.display = 'block';
    if (type === 'job') document.getElementById('form-job').style.display = 'block';
    if (type === 'contractor') document.getElementById('form-contractor').style.display = 'block';
    if (type === 'direct') document.getElementById('form-direct').style.display = 'block';
  },

  // --- CATEGORY LOGIC ---
  activeJobFilter: 'all',

  setJobFilter(filterType, element) {
    this.activeJobFilter = filterType;
    const parentContainer = document.getElementById('job-filter-chips');
    if (parentContainer) {
      parentContainer.querySelectorAll('.f-chip').forEach(btn => btn.classList.remove('active'));
    }
    if (element) element.classList.add('active');
    this.renderJobs();
  },

  viewJobDetail(idx) {
    const j = initialJobs[idx];
    if (!j) return;
    document.getElementById('job-modal-title').innerText = j.title;
    document.getElementById('job-modal-company').innerText = j.company;
    const iconContainer = document.getElementById('job-modal-icon-container');
    if(iconContainer) {
      iconContainer.className = `flex-center ${j.bgClass || 'bg-factory-light'}`;
    }
    const iconLucide = document.getElementById('job-modal-icon-lucide');
    if(iconLucide) {
      iconLucide.setAttribute('data-lucide', j.icon || 'briefcase');
      iconLucide.style.stroke = j.stroke || '#475569';
      iconLucide.style.fill = j.fill || 'transparent';
    }
    let detailHtml = `
      <div style="font-family: inherit; color: var(--navy); display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #f0fdf4; padding: 12px; border-radius: 12px; border: 1px solid #bbf7d0; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <b style="color: var(--primary); font-size: 11px; text-transform: uppercase;">💰 Monthly Salary</b>
            ${j.verified ? `<span style="background: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 8px;">✓ Verified Job</span>` : ''}
          </div>
          <p style="margin: 0; font-size: 16px; font-weight: 950; color: var(--primary);">${j.salary} <span style="font-size:12px; font-weight:600; color:#475569;">${j.unit}</span></p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569; font-weight: 600;">
            <i data-lucide="map-pin" style="width: 15px; height: 15px; color: #64748b;"></i>
            <span>${j.location} ${j.distance ? `• <b>${j.distance} km away</b>` : ''}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569; font-weight: 600;">
            <i data-lucide="clock" style="width: 15px; height: 15px; color: #64748b;"></i>
            <span>Posted: ${j.time}</span>
          </div>
        </div>
        <div>
          <h4 style="font-size: 14px; font-weight: 800; color: var(--navy); margin-bottom: 6px;">Job Description &amp; Requirements:</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; display: flex; flex-direction: column; gap: 4px;">
            <li>Requires experience in Panipat textile manufacturing environments.</li>
            <li>Must keep work area clean and maintain good stitching / operating speed.</li>
            <li>Standard working hours apply. Overtime benefits included as per factory rules.</li>
            <li>Adhere to factory safety guidelines and quality specifications.</li>
          </ul>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 4px; display: flex; flex-wrap: wrap; gap: 6px;">
          ${j.tags.map(t => `<span style="background: #f1f5f9; color: var(--navy); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #cbd5e1;">${t}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button class="btn-primary" style="flex: 1.2; padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; border:none; color:white; cursor:pointer;" onclick="app.closeModal('job-detail-modal'); app.showToast('🚀 Application submitted successfully!')">Quick Apply</button>
          <button class="btn-secondary" style="flex: 1; border: 1px solid #cbd5e1; background:white; color:var(--navy); padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px;" onclick="app.closeModal('job-detail-modal'); app.startJobChat(${idx})">
            <i data-lucide="message-circle" style="width:14px;height:14px;color:var(--primary);"></i> Chat Now
          </button>
        </div>
      </div>
    `;
    document.getElementById('job-modal-body').innerHTML = detailHtml;
    this.openModal('job-detail-modal');
    if (window.lucide) window.lucide.createIcons();
  },

  startJobChat(idx) {
    const j = initialJobs[idx];
    if (!j) return;
    this.showToast(`💬 Opening Chat with Hiring Manager at ${j.company}...`);
    let groupId = "g1";
    if (j.category === "loom") groupId = "g2";
    setTimeout(() => { this.openGroupChat(groupId); }, 500);
  },

  toggleBookmark(idx, elem) {
    const j = initialJobs[idx];
    if (!j) return;
    j.bookmarked = !j.bookmarked;
    if (j.bookmarked) {
      this.showToast(`Saved ${j.title} to Bookmarks! 📁`);
      if (elem) {
        elem.classList.add('active');
        elem.style.color = '#10b981';
        elem.style.background = '#ecfdf5';
        elem.style.borderColor = '#10b981';
      }
    } else {
      this.showToast(`Removed ${j.title} from Bookmarks`);
      if (elem) {
        elem.classList.remove('active');
        elem.style.color = '';
        elem.style.background = '';
        elem.style.borderColor = '';
      }
    }
    if (window.lucide) window.lucide.createIcons();
  },

  renderJobs() {
    const list = document.getElementById('dynamic-jobs-list');
    let filtered = initialJobs;
    let titleEl = document.getElementById('dynamic-jobs-title');

    // Category / Subcategory filtering
    if (activeSubCategory) {
       filtered = initialJobs.filter(j => j.subCategory === activeSubCategory || j.title.includes(activeSubCategory));
       titleEl.innerHTML = `✨ ${activeSubCategory} Jobs & Requirements`;
       
       if(filtered.length === 0) {
           filtered = [{
              title: activeSubCategory + " Required",
              company: "Panipat Local Factory",
              location: "📍 Panipat",
              distance: 1.5,
              verified: true,
              isTodayKey: true,
              salary: "₹12,000 - ₹20,000",
              unit: "/month",
              tags: ["Full Time", "Urgent"],
              time: "Just now",
              icon: "briefcase",
              bgClass: "bg-factory-light",
              stroke: "#475569",
              fill: "transparent"
           }];
       }
    } else if (activeCategory) {
       filtered = initialJobs.filter(j => j.category === activeCategory);
       titleEl.innerHTML = `✨ ${subCatsMap[activeCategory].title}`;
       
       if(filtered.length === 0) {
           filtered = [{
              title: "Worker Required for " + subCatsMap[activeCategory].title.replace(' Jobs & Requirements',''),
              company: "Panipat Textile Mill",
              location: "📍 Sector 29",
              distance: 2.0,
              verified: true,
              isTodayKey: true,
              salary: "₹10,000+ ",
              unit: "/month",
              tags: ["Full Time"],
              time: "Just now",
              icon: "briefcase",
              bgClass: "bg-factory-light",
              stroke: "#475569",
              fill: "transparent"
           }];
       }
    } else {
       titleEl.innerHTML = `✨ Top Jobs For You`;
    }

    // Apply the active Job Filter (All, Near Me, Today's, Verified Only)
    const filter = this.activeJobFilter || 'all';
    if (filter === 'near') {
       filtered = filtered.filter(j => j.distance <= 2.0);
    } else if (filter === 'today') {
       filtered = filtered.filter(j => j.isTodayKey === true || j.time.includes('h ago') || j.time.includes('now'));
    } else if (filter === 'verified') {
       filtered = filtered.filter(j => j.verified === true);
    }

    let html = '';
    filtered.forEach((j) => { const originalIndex = initialJobs.indexOf(j); 
        let mtClass = 'mt-3';
        let mediaHtml = '';
        if (j.mediaUrl) {
          if (j.mediaType === 'video') {
            mediaHtml = `
              <div style="margin-top:12px; width:100%; border-radius:12px; overflow:hidden; border:1px solid #cbd5e1; background:black; aspect-ratio:16/9; display:flex; align-items:center;">
                <video src="${j.mediaUrl}" style="width:100%; max-height:100%; object-fit:contain;" controls playsinline loop muted></video>
              </div>
            `;
          } else {
            mediaHtml = `
              <div style="margin-top:12px; width:100%; border-radius:12px; overflow:hidden; border:1px solid #cbd5e1; background:#f8fafc; overflow:hidden;">
                <img src="${j.mediaUrl}" style="width:100%; max-height:300px; object-fit:cover; display:block;" alt="attached-media" onclick="event.stopPropagation()">
              </div>
            `;
          }
        }

        // Prettify location string
        let locText = j.location || '';
        if (locText.startsWith('📍')) {
          locText = locText.replace('📍', '').trim();
        }

        const activeBookmarkStyle = j.bookmarked ? 'style="color:#10b981; background:#ecfdf5; border-color:#10b981;"' : '';

        html += `
            <div class="job-card ${mtClass}">
              <div class="jc-content-row">
                <div class="jc-large-icon ${j.bgClass || 'bg-factory-light'} flex-center">
                  <i data-lucide="${j.icon || 'briefcase'}" style="width:40px;height:40px;stroke:${j.stroke || '#475569'};fill:${j.fill || 'transparent'};"></i>
                </div>
                <div class="jc-details">
                  <div class="jc-top-meta flex justify-between w-full">
                    ${j.verified ? `
                      <span class="verified-text"><i data-lucide="check-circle-2"></i> Verified</span>
                    ` : `<span style="visibility: hidden;">Offset</span>`}
                    <span class="time-text">${j.time}</span>
                  </div>
                  <h4>${j.title}</h4>
                  <p class="company-name">${j.company}</p>
                  <p class="jc-location"><i data-lucide="map-pin" style="width:12px; height:12px; display:inline-block; margin-right:2px; vertical-align:middle;"></i> ${locText} ${j.distance ? `• <b>${j.distance} km away</b>` : ''}</p>
                  <div class="jc-salary">${j.salary} <span class="month">${j.unit}</span></div>
                  <div class="jc-tags">
                    ${j.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                  </div>
                </div>
              </div>
              ${mediaHtml}
              <div class="jc-actions-row mt-4">
                <button class="btn-chat-primary" onclick="app.startJobChat(${originalIndex})"><i data-lucide="message-circle"></i> Chat</button>
                <div class="jc-actions-right">
                  <button class="btn-icon-outline" onclick="app.viewJobDetail(${originalIndex})"><i data-lucide="eye"></i></button>
                  <button class="btn-icon-outline" ${activeBookmarkStyle} onclick="app.toggleBookmark(${originalIndex}, this)"><i data-lucide="bookmark"></i></button>
                </div>
              </div>
            </div>
        `;
    });
    if (filtered.length === 0) {
      html = `
        <div style="background: white; border-radius: 16px; border: 1px solid #cbd5e1; padding: 24px; text-align: center; color: #64748b; margin-top: 12px;">
          <i data-lucide="search-x" style="width: 48px; height: 48px; margin: 0 auto 12px; color: #94a3b8;"></i>
          <h4 style="font-size: 15px; font-weight: 800; color: var(--navy); margin-bottom: 4px;">No Jobs Match Your Filter</h4>
          <p style="font-size: 12.5px; margin: 0;">Please try resetting the filters or check custom sewing requirements.</p>
        </div>
      `;
    }
    list.innerHTML = html;
    if(window.lucide) {
        window.lucide.createIcons();
    }
  },

  selectCategory(catKey) {
     const container = document.getElementById('subcat-container');
     const titleEl = document.getElementById('subcat-title');
     const chipsEl = document.getElementById('subcat-chips');

     if (activeCategory === catKey && container.style.display === 'block') {
         container.style.display = 'none';
         activeCategory = null;
         activeSubCategory = null;
         this.renderJobs();
         return;
     }

     activeCategory = catKey;
     activeSubCategory = null;
     
     if (subCatsMap[catKey]) {
         container.style.display = 'block';
         titleEl.innerText = subCatsMap[catKey].title;
         
         let chipsHtml = '';
         subCatsMap[catKey].items.forEach(sub => {
            chipsHtml += `<button class="f-chip" onclick="app.selectSubCategory('${sub}')">${sub}</button>`;
         });
         chipsEl.innerHTML = chipsHtml;
     } else {
         container.style.display = 'none';
     }
     
     this.renderJobs();
  },

  selectSubCategory(subKey) {
     activeSubCategory = subKey;
     const buttons = document.querySelectorAll('#subcat-chips .f-chip');
     buttons.forEach(b => {
        if(b.innerText === subKey) b.classList.add('active');
        else b.classList.remove('active');
     });
     
     this.renderJobs();
  },

  clearCategory() {
     activeCategory = null;
     activeSubCategory = null;
     document.getElementById('subcat-container').style.display = 'none';
     this.renderJobs();
  },

  // --- LANGUAGE LOGIC ---
  toggleLanguage() {
    currentLangIndex = (currentLangIndex + 1) % langCycle.length;
    this.applyLanguage();
  },

  applyLanguage() {
    const langKey = langCycle[currentLangIndex];
    const dict = translations[langKey];

    // Replace text contents
    const textTargets = document.querySelectorAll('[data-i18n-target]');
    textTargets.forEach(el => {
      const key = el.getAttribute('data-i18n-target');
      if (dict[key]) {
        if (el.querySelector('i')) {
           const icon = el.querySelector('i').outerHTML;
           el.innerHTML = icon + ' ' + dict[key];
        } else {
           el.innerText = dict[key];
        }
      }
    });

    // Replace attributes (like placeholder)
    const attrTargets = document.querySelectorAll('[data-i18n-attr]');
    attrTargets.forEach(el => {
      const attr = el.getAttribute('data-i18n-attr');
      const key = el.getAttribute('data-i18n-key');
      if (dict[key]) {
        el.setAttribute(attr, dict[key]);
      }
    });
  },

  demoMarketUpload() {
     const preview = document.getElementById('market-upload-preview');
     if(preview) {
         preview.style.display = 'flex';
     }
  },

  submitMarketPost(btn) {
      btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin" style="width:20px;height:20px;"></i> Posting...';
      if(window.lucide) window.lucide.createIcons();
      
      setTimeout(() => {
          this.closeModal('market-post-modal');
          btn.innerHTML = 'Post Market Item 🚀';
          
          this.switchView('market');
          
          const type = document.getElementById('market-item-type').value || 'Other';
          const name = document.getElementById('market-item-name').value || 'New Market Item';
          const qty = document.getElementById('market-item-qty').value || 'Contact Seller';
          const price = document.getElementById('market-item-price').value || 'Discuss';
          const loc = document.getElementById('market-item-loc').value || 'Panipat';
          const seller = document.getElementById('market-item-seller').value || 'Guest User';
          
          const isUrgent = document.getElementById('market-urgent').checked;
          const urgentBadgeHtml = isUrgent ? '<span style="font-size: 11px; background: #fee2e2; color: #ef4444; padding: 4px 8px; border-radius: 12px; font-weight: 700; margin-left: 8px;">🔥 Urgent</span>' : '';

          const html = `
            <div class="job-card market-card" style="padding: 16px;">
               <div style="display: flex; gap: 16px; margin-bottom: 14px;">
                 <div style="width: 80px; height: 80px; border-radius: 12px; background: #e2e8f0; overflow: hidden; flex-shrink: 0;">
                    ${(this.formMedia && this.formMedia['market']) ? (this.formMedia['market'].type === 'video' ? `<video src="${this.formMedia['market'].url}" style="width:100%; height:100%; object-fit:cover;" muted autoplay loop playsinline></video>` : `<img src="${this.formMedia['market'].url}" style="width:100%; height:100%; object-fit:cover;" alt="thumbnail">`) : `<img src="https://images.unsplash.com/photo-1528318259074-b4df4bc97eb4?auto=format&fit=crop&w=200&q=80" style="width:100%; height:100%; object-fit:cover;" alt="thumbnail">`}
                 </div>
                 <div style="flex: 1;">
                   <div style="display: flex; justify-content: space-between; align-items:flex-start; margin-bottom: 6px;">
                     <div>
                       <span style="font-size: 11px; background: #ecfdf5; color: var(--primary); padding: 4px 8px; border-radius: 12px; font-weight: 700; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="check-circle" style="width:12px; height:12px;"></i> Verified</span>
                       ${urgentBadgeHtml}
                     </div>
                     <span style="font-size: 11px; color: #94a3b8; font-weight: 600;">Just now</span>
                   </div>
                   <h3 style="font-size: 16px; color: var(--navy); font-weight: 800; line-height: 1.3; margin-bottom: 4px;">${name}</h3>
                   <p style="font-size: 13px; color: #475569; font-weight: 600; display:flex; align-items:center; gap:4px;"><i data-lucide="store" style="width:14px; height:14px; color:#94a3b8;"></i> ${seller}</p>
                 </div>
               </div>
               <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9;">
                 <div style="grid-column: span 2; display:flex; align-items:center; gap:6px;"><i data-lucide="map-pin" style="width:14px; height:14px; color:#94a3b8;"></i> <strong style="font-size:13px; color:var(--navy); font-weight:700;">${loc}</strong></div>
                 <div><span style="font-size:11px; color:#64748b; font-weight:600; display:block;">Quantity / Info</span><strong style="font-size:13px; color:var(--navy); font-weight:800;">${qty}</strong></div>
                 <div><span style="font-size:11px; color:#64748b; font-weight:600; display:block;">Rate</span><strong style="font-size:13px; color:var(--primary); font-weight:800;">${price}</strong></div>
               </div>
               <div style="display:flex; gap: 8px;">
                 <button style="flex:1; background: #f0fdf4; color: var(--primary); border: 2px solid var(--primary); border-radius: 10px; padding: 8px; font-size: 14px; font-weight: 800; display:flex; align-items:center; justify-content:center; gap:6px;"><i data-lucide="message-square" style="width:18px; height:18px;"></i> Chat</button>
                 <button style="flex:1; background: var(--primary); color: white; border: none; border-radius: 10px; padding: 8px; font-size: 14px; font-weight: 800; display:flex; align-items:center; justify-content:center; gap:6px;"><i data-lucide="phone" style="width:18px; height:18px;"></i> Call</button>
                 <button style="width:44px; background: white; color: #94a3b8; border: 1px solid #cbd5e1; border-radius: 10px; padding: 8px; display:flex; align-items:center; justify-content:center;"><i data-lucide="star" style="width:18px; height:18px;"></i></button>
               </div>
            </div>
          `;
          
          const list = document.getElementById('market-wall-list');
          list.insertAdjacentHTML('afterbegin', html);
          
          if(window.lucide) window.lucide.createIcons();
          
          this.showToast('Market item post ho gaya ✅');
          
          document.getElementById('market-item-name').value = '';
          document.getElementById('market-item-qty').value = '';
          document.getElementById('market-item-price').value = '';
          document.getElementById('market-item-loc').value = '';
          document.getElementById('market-item-seller').value = '';
          document.getElementById('market-item-phone').value = '';
          document.getElementById('market-item-desc').value = '';
          const preview = document.getElementById('market-upload-preview');
          if(preview) preview.style.display = 'none';
          document.getElementById('market-urgent').checked = false;
      }, 700);
  },

  // --- INDIVIDUAL COMMUNITY DISCUSSION METHODS ---
  renderCommunityFeed() {
    const list = document.getElementById('community-posts-list');
    if (!list) return;

    let filtered = initialCommunityPosts;
    if (this.activeCommunityFilter !== 'All') {
       filtered = initialCommunityPosts.filter(p => p.tag === this.activeCommunityFilter);
    }

    let html = '';
    filtered.forEach(p => {
       const hasComments = p.comments && p.comments.length > 0;
       const commentCount = p.comments ? p.comments.length : 0;
       const likeHeartClass = p.liked ? 'fill-[#22c55e] stroke-[#22c55e] text-[#22c55e]' : 'color-[#64748b]';
       const likeBtnStyle = p.liked ? 'color:#22c55e; font-weight: 800;' : 'color:#64748b;';
       
       html += `
         <div class="job-card" style="padding: 16px; border-radius: 16px; border: 1px solid #e2e8f0; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.02); display: flex; flex-direction: column;" id="com-post-${p.id}">
           <!-- Top metadata -->
           <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 12px; width: 100%;">
             <div style="display:flex; align-items:center; gap:10px;">
               <div style="width: 40px; height: 40px; border-radius:50%; background:#f1f5f9; display:flex; align-items:center; justify-content:center; font-size:18px; border:1px solid #e2e8f0;">
                 ${p.avatar || '👤'}
               </div>
               <div>
                 <h4 style="font-size: 14px; font-weight:800; color:var(--navy); margin:0; line-height:1.2;">
                   ${p.author} 
                   <span style="font-size: 11px; background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 8px; font-weight: 700; margin-left:4px; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="check-circle" style="width:10px; height:10px;"></i> Verified</span>
                 </h4>
                 <p style="font-size: 12px; color:#64748b; font-weight:600; margin: 2px 0 0;">${p.role} &bull; ${p.time}</p>
               </div>
             </div>
             <div>
               <span style="font-size:11px; background: #f1f5f9; color:#475569; padding:4px 10px; border-radius:12px; font-weight:700;"># ${p.tag}</span>
             </div>
           </div>

           <!-- Content -->
           <h3 style="font-size: 16px; font-weight: 800; color: var(--navy); line-height:1.3; margin-bottom:6px;">${p.title}</h3>
           <p style="font-size: 14px; color:#475569; font-weight:500; line-height:1.4; margin-bottom:14px; white-space:pre-line;">${p.content}</p>

           ${p.mediaUrl ? (p.mediaType === 'video' ? `
             <div style="margin-bottom:14px; width:100%; border-radius:12px; overflow:hidden; border:1px solid #cbd5e1; background:black; aspect-ratio:16/9; display:flex; align-items:center;">
               <video src="${p.mediaUrl}" style="width:100%; max-height:100%; object-fit:contain;" controls playsinline loop muted></video>
             </div>
           ` : `
             <div style="margin-bottom:14px; width:100%; border-radius:12px; overflow:hidden; border:1px solid #cbd5e1; background:#f8fafc;">
               <img src="${p.mediaUrl}" style="width:100%; max-height:300px; object-fit:cover; display:block; margin:0 auto;" alt="attached-media">
             </div>
           `) : ''}

           <!-- Bottom Interaction bar -->
           <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid #f1f5f9; padding-top:10px; border-bottom: ${hasComments ? '1px solid #f1f5f9' : 'none'}; padding-bottom: ${hasComments ? '10px' : '0'};">
             <button onclick="app.toggleLikeCommunity('${p.id}')" style="background:transparent; border:none; display:flex; align-items:center; gap:6px; font-size:13px; font-weight:700; cursor:pointer; ${likeBtnStyle} transition:0.2s;">
               <i data-lucide="thumbs-up" class="${likeHeartClass}" style="width:18px; height:18px;"></i> 
               <span>${p.likes} Likes</span>
             </button>
             
             <button onclick="app.toggleCommentsSection('${p.id}')" style="background:transparent; border:none; display:flex; align-items:center; gap:6px; font-size:13px; font-weight:700; color:#64748b; cursor:pointer;">
               <i data-lucide="message-square" style="width:18px; height:18px;"></i> 
               <span>${commentCount} Comments</span>
             </button>

             <button onclick="app.shareCommunityPost('${p.id}')" style="background:transparent; border:none; display:flex; align-items:center; gap:6px; font-size:13px; font-weight:700; color:#64748b; cursor:pointer;">
               <i data-lucide="share" style="width:18px; height:18px;"></i> 
               <span>Share</span>
             </button>
           </div>

           <!-- Comment list region (collapsible) -->
           <div id="comments-box-${p.id}" style="display:none; padding-top:12px;">
             <div style="max-height: 200px; overflow-y:auto; display:flex; flex-direction:column; gap:8px; margin-bottom:12px;" id="comments-list-${p.id}">
                ${(p.comments || []).map(c => `
                  <div style="background:#f8fafc; padding:10px; border-radius:12px; border:1px solid #f1f5f9;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; width: 100%;">
                       <strong style="font-size:12px; color:var(--navy); font-weight:800;">${c.author}</strong>
                       <span style="font-size:11px; color:#94a3b8; font-weight:600;">${c.time || 'Just now'}</span>
                    </div>
                    <p style="font-size:12px; color:#475569; font-weight:500; line-height:1.3; margin:0;">${c.text}</p>
                  </div>
                `).join('')}
             </div>
             
             <!-- Comment Input Form -->
             <div style="display:flex; gap:8px; width:100%;">
               <input type="text" id="comment-input-${p.id}" placeholder="Apna comment likhein..." style="flex:1; padding:8px 12px; border:1px solid #cbd5e1; border-radius:18px; font-size:12px; font-weight:500; outline:none; color:var(--navy);" onkeydown="if(event.key === 'Enter') app.addCommentToPost('${p.id}')">
               <button onclick="app.addCommentToPost('${p.id}')" style="background:var(--primary); color:white; border:none; padding:8px 14px; border-radius:18px; font-size:12px; font-weight:800; cursor:pointer;">Send</button>
             </div>
           </div>
         </div>
       `;
    });
    list.innerHTML = html;
    if(window.lucide) window.lucide.createIcons();
  },

  filterCommunity(tag, btn) {
    this.activeCommunityFilter = tag;
    
    // Manage active state of chips
    if (btn) {
       btn.parentElement.querySelectorAll('.f-chip').forEach(c => c.classList.remove('active'));
       btn.classList.add('active');
    }
    
    this.renderCommunityFeed();
  },

  toggleLikeCommunity(postId) {
     const post = initialCommunityPosts.find(p => p.id === postId);
     if (post) {
        post.liked = !post.liked;
        if(post.liked) post.likes += 1;
        else post.likes -= 1;
        
        this.renderCommunityFeed();
     }
  },

  toggleCommentsSection(postId) {
     const el = document.getElementById(`comments-box-${postId}`);
     if (el) {
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
     }
  },

  addCommentToPost(postId) {
     const input = document.getElementById(`comment-input-${postId}`);
     if (!input || input.value.trim() === '') return;
     
     const text = input.value.trim();
     input.value = '';
     
     const post = initialCommunityPosts.find(p => p.id === postId);
     if (post) {
        if(!post.comments) post.comments = [];
        post.comments.push({
           author: 'Guest User',
           avatar: '👤',
           text: text,
           time: 'Just now'
        });
        
        this.renderCommunityFeed();
        // Keep the comments box open
        const el = document.getElementById(`comments-box-${postId}`);
        if(el) el.style.display = 'block';
     }
  },

  shareCommunityPost(postId) {
     this.showToast('Link copied to clipboard! 📋');
  },

  submitCommunityPost() {
     const title = document.getElementById('com-post-title').value || '';
     const content = document.getElementById('com-post-content').value || '';
     const tag = document.getElementById('com-post-tag').value || 'Generals';
     
     if(title.trim() === '' || content.trim() === '') {
        this.showToast('Please fill all fields! ⚠️');
        return;
     }

     initialCommunityPosts.unshift({
        id: 'cp_' + Date.now(),
        author: 'Guest User',
        avatar: '👤',
        role: "Verified Karigar",
        time: 'Just now',
        title: title,
        content: content,
        tag: tag,
        likes: 0,
        liked: false,
        comments: []
     });

     // Reset fields
     document.getElementById('com-post-title').value = '';
     document.getElementById('com-post-content').value = '';

     this.closeModal('community-post-modal');
     this.renderCommunityFeed();
     this.showToast('Community post successfully live! 📢');
  },

  // --- GROUPS DISCUSSIONS AND CHATS METHODS ---
  renderGroups() {
    const list = document.getElementById('groups-list-container');
    if (!list) return;
    
    let html = '';
    initialGroups.forEach(g => {
      const isJoined = g.joined;
      const btnText = isJoined ? 'Open' : 'Join';
      const btnStyleHtml = isJoined 
        ? 'background: white; border: 2px solid var(--primary); color: var(--primary);' 
        : 'background: var(--primary); border: none; color: white;';
      
      html += `
        <div class="group-card" id="card-${g.id}" style="border-radius: 16px; padding: 16px; border: 1px solid #e2e8f0; background:white; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; align-items: center; justify-content: space-between; position: relative;">
          <div style="display: flex; align-items: center; gap: 12px; flex: 1; cursor: pointer;" onclick="app.clickGroupCard('${g.id}')">
            <div class="grp-icon" style="width: 52px; height: 52px; border-radius: 16px; background: #ecfdf5; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <i data-lucide="${g.icon || 'users'}" style="width: 24px; height: 24px; color: var(--primary);"></i>
            </div>
            <div class="grp-info" style="flex: 1;">
              <h4 style="font-size: 16px; font-weight: 800; color: var(--navy); line-height: 1.2; margin-bottom: 4px;">${g.name}</h4>
              <p style="font-size: 13px; color: #475569; font-weight: 500; margin-bottom: 8px; line-height: 1.3;">${g.desc}</p>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600;">
                 <span style="color: #64748b; display: flex; align-items: center; gap: 4px;"><i data-lucide="user" style="width: 14px; height: 14px;"></i> ${g.count}</span>
                 <span style="color: #cbd5e1;">•</span>
                 <span style="color: var(--primary); display: flex; align-items: center; gap: 4px;"><div style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%;"></div> ${g.online} online</span>
              </div>
            </div>
          </div>
          
          <div style="display:flex; align-items:center; gap: 8px; flex-shrink:0;">
            <button class="btn-secondary-small" style="${btnStyleHtml} padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; transition: 0.2s;" onclick="app.handleGroupAction('${g.id}', event)">${btnText}</button>
            <button class="btn-icon" style="background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer;" onclick="app.toggleGroupOptions('${g.id}', event)">
              <i data-lucide="more-vertical" style="width: 18px; height: 18px;"></i>
            </button>
          </div>

          <!-- ABSOLUTE DROPDOWN MENU -->
          <div id="dropdown-${g.id}" class="group-dropdown-custom" style="position: absolute; right: 16px; top: 70px; background: white; border: 1px solid #cbd5e1; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 200; width: 150px; display: none; overflow: hidden;">
             <button onclick="app.showGroupInfo('${g.id}', event)" style="width: 100%; text-align: left; padding: 12px; background: transparent; border: none; font-size: 13px; font-weight: 700; color: var(--navy); border-bottom: 1px solid #f1f5f9; cursor: pointer; display: flex; align-items: center; gap: 8px;"><i data-lucide="info" style="width: 14px; height: 14px; color:var(--primary);"></i> Details</button>
             <button onclick="app.shareGroup('${g.id}', event)" style="width: 100%; text-align: left; padding: 12px; background: transparent; border: none; font-size: 13px; font-weight: 700; color: var(--navy); border-bottom: 1px solid #f1f5f9; cursor: pointer; display: flex; align-items: center; gap: 8px;"><i data-lucide="share-2" style="width: 14px; height: 14px; color:var(--primary);"></i> Share</button>
             <button onclick="app.exitGroup('${g.id}', event)" style="width: 100%; text-align: left; padding: 12px; background: transparent; border: none; font-size: 13px; font-weight: 700; color: #ef4444; cursor: pointer; display: flex; align-items: center; gap: 8px;"><i data-lucide="log-out" style="width: 14px; height: 14px;"></i> Leave</button>
          </div>
        </div>
      `;
    });
    list.innerHTML = html;
    if(window.lucide) window.lucide.createIcons();
  },

  clickCreateGroupBtn() {
    if (!this.isLoggedIn) {
       this.showToast('Group banane ke liye Login required hai');
       return;
    }
    this.openModal('create-group-modal');
  },

  handleGroupAction(groupId, event) {
     if(event) event.stopPropagation();
     const group = initialGroups.find(g => g.id === groupId);
     if (group) {
        if (!group.joined) {
           if (!this.isLoggedIn) {
              this.showToast('Group join karne ke liye Login required hai');
              return;
           }
           group.joined = true;
           this.renderGroups();
           this.showToast(`${group.name} join ho gaya! ✅`);
        } else {
           this.openGroupChat(groupId);
        }
     }
  },

  clickGroupCard(groupId) {
     const group = initialGroups.find(g => g.id === groupId);
     if (group) {
        if (!group.joined) {
           if (!this.isLoggedIn) {
              this.showToast('Group join karne ke liye Login required hai');
              return;
           }
           group.joined = true;
           this.renderGroups();
           this.showToast(`${group.name} Joined! 🤝`);
        }
        this.openGroupChat(groupId);
     }
  },

  toggleGroupOptions(groupId, event) {
     if(event) event.stopPropagation();
     const dd = document.getElementById(`dropdown-${groupId}`);
     if(!dd) return;
     const alreadyOpen = dd.style.display === 'block';
     
     // Close all dropdowns
     document.querySelectorAll('.group-dropdown-custom').forEach(ddmenu => ddmenu.style.display = 'none');
     
     if(!alreadyOpen) {
        dd.style.display = 'block';
     }
  },

  showGroupInfo(groupId, event) {
     if(event) event.stopPropagation();
     const group = initialGroups.find(g => g.id === groupId);
     if(group) {
        alert(`Group Info:\n\n💬 Name: ${group.name}\n👥 Members: ${group.count}\n🟢 Online: ${group.online} workers`);
     }
  },

  shareGroup(groupId, event) {
     if(event) event.stopPropagation();
     this.showToast('Group join link copied! 📋');
  },

  exitGroup(groupId, event) {
     if(event) event.stopPropagation();
     const group = initialGroups.find(g => g.id === groupId);
     if(group) {
        group.joined = false;
        this.renderGroups();
        this.showToast('Left Group successfully 🚪');
     }
  },

  openGroupChat(groupId) {
     const group = initialGroups.find(g => g.id === groupId);
     if(!group) return;

     this.activeGroupId = groupId;
     
     // Set UI Header Info
     document.getElementById('chat-header-name').innerText = group.name;
     document.getElementById('chat-header-status').innerHTML = `
        <span style="width: 6px; height: 6px; background: var(--primary); border-radius: 50%; display: inline-block;"></span> ${group.online} online
     `;
     
     this.switchView('active-chat');
     this.renderChatMessages();
  },

  renderChatMessages() {
     const container = document.getElementById('chat-messages-container');
     if(!container) return;

     const group = initialGroups.find(g => g.id === this.activeGroupId);
     if(!group) return;

     let html = '';
     group.messages.forEach(msg => {
       const isSelf = msg.sender === 'Guest User' || msg.isSelf;
       const bubbleStyle = isSelf
         ? 'background: #d9fdd3; color: var(--navy); border-radius: 12px 12px 0 12px; align-self: flex-end; box-shadow: 0 1px 2px rgba(0,0,0,0.1); border: 1px solid #c1ebd3;'
         : 'background: white; color: var(--navy); border-radius: 12px 12px 12px 0; align-self: flex-start; box-shadow: 0 1px 2px rgba(0,0,0,0.1); border: 1px solid #f1f5f9;';
       const containerStyle = isSelf ? 'display: flex; justify-content: flex-end;' : 'display: flex; justify-content: flex-start;';
       
       html += `
         <div style="${containerStyle} width: 100%;">
           <div style="max-width: 80%; padding: 10px 12px; display:inline-block; ${bubbleStyle}">
             ${!isSelf ? `<div style="font-size:11px; font-weight:800; color:var(--primary); margin-bottom:3px; display:flex; align-items:center; gap:4px;">${msg.avatar || '👤'} ${msg.sender}</div>` : ''}
             <p style="font-size: 14px; font-weight: 500; margin: 0; line-height:1.4; word-break: break-word;">${msg.text}</p>
             <div style="font-size: 10px; color: #8b96a5; text-align: right; margin-top: 4px; font-weight: 600;">${msg.time || 'Just now'}</div>
           </div>
         </div>
       `;
     });
     
     container.innerHTML = html;
     
     // Scroll to bottom
     setTimeout(() => {
        container.scrollTop = container.scrollHeight;
     }, 40);
  },

  sendChatMessage() {
     const input = document.getElementById('chat-input-text');
     if(!input || input.value.trim() === '') return;

     const text = input.value.trim();
     input.value = '';

     const group = initialGroups.find(g => g.id === this.activeGroupId);
     if(!group) return;

     group.messages.push({
        sender: 'Guest User',
        isSelf: true,
        text: text,
        time: 'Just now'
     });

     this.renderChatMessages();
     this.showToast('Message sent ✅');

     // Mock Auto-Reply after 1.5 seconds
     setTimeout(() => {
        const replies = [
          "Badiya rates chal rhe hain aajkal Panipat me.",
          "Haan bhai, iske baare me details mil sakti hain kya?",
          "Mujhe bhi is tarah ka work seekhna hai.",
          "Hum direct contact kar rhe hain call button par, check karo."
        ];
        const randomText = replies[Math.floor(Math.random() * replies.length)];
        const senders = ["Sonu Operator 🧵", "Rajesh Weaver 🏭", "Yash Cutter ✂️", "Naresh Mechanic 🛠️"];
        const randomSender = senders[Math.floor(Math.random() * senders.length)];
        
        group.messages.push({
           sender: randomSender,
           isSelf: false,
           text: randomText,
           time: '1s ago',
           avatar: '👤'
        });

        this.renderChatMessages();
     }, 1500);
  },

  showActiveGroupInfo() {
     const group = initialGroups.find(g => g.id === this.activeGroupId);
     if (group) {
        alert(`${group.name}\n\n👥 Members: ${group.count}\n🟢 Online: ${group.online} workers`);
     }
  },

  triggerChatAttachment() {
     this.showToast('Photos & Documents attachments are enabled 🖼️');
  },

  submitCreateGroup() {
     const name = document.getElementById('new-group-name') ? document.getElementById('new-group-name').value : '';
     const desc = document.getElementById('new-group-desc') ? document.getElementById('new-group-desc').value : '';
     const category = document.getElementById('new-group-category') ? document.getElementById('new-group-category').value : '';
     const location = document.getElementById('new-group-location') ? document.getElementById('new-group-location').value : '';
     const groupType = document.getElementById('new-group-type') ? document.getElementById('new-group-type').value : '';

     if (name.trim() === '' || desc.trim() === '') {
        this.showToast('Please fill all fields! ⚠️');
        return;
     }

     const newId = 'g_' + Date.now();
     initialGroups.unshift({
        id: newId,
        name: name,
        desc: desc,
        count: "1 member",
        online: 1,
        icon: "users",
        joined: true,
        category: category,
        location: location,
        type: groupType,
        messages: [
           { sender: "System", text: `Welcome to your newly created group! Category: ${category || 'Other'}. Location: ${location || 'Panipat'}. Type: ${groupType || 'Public'}.`, time: "Just now", avatar: "🤖" }
        ]
     });

     // Reset fields
     if (document.getElementById('new-group-name')) document.getElementById('new-group-name').value = '';
     if (document.getElementById('new-group-desc')) document.getElementById('new-group-desc').value = '';
     if (document.getElementById('new-group-location')) document.getElementById('new-group-location').value = '';

     this.closeModal('create-group-modal');
     this.renderGroups();
     this.showToast(`Group "${name}" created successfully! 🚀`);
     this.openGroupChat(newId);
  },

  // --- READ BLOGS LOGIC ---
  readBlog(blogId) {
    const blogsData = {
      'juki-operator': {
        title: '🪡 Juki Operator ka kaam kya hota hai?',
        icon: '🪡',
        content: `
          <div style="font-family: inherit; color: var(--navy);">
            <p style="margin-bottom: 12px; font-size: 15px; font-weight: 600; line-height: 1.5; color: #475569;">
               <strong>Juki operator</strong> ek behad hi specialized role hai jo Panipat aur pure India ke garments/textile sectors me demand me rehta hai. 
               Kayi log samajhte hain ki general stitching aur Juki operator ek hi hain, par inme thoda farq hota hai:
            </p>
            
            <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">1. Core Skill Level Difference</h4>
            <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
               Stitching ek poori broad skill category hai (jisme hand-stitching, general tailoring, domestic machine stitching sab aata hai). 
               Wahin, <strong>Juki Operator</strong> mukhya roop se high-speed industrial single needle ya multi-needle lockstitch machines par kaam karta hai jo industrial standards par heavy fabrics ya speed works ke liye bani hoti hain.
            </p>

            <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">2. Industrial Machines aur Functions</h4>
            <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
               Juki operator ko mukhya roop se industrial single needle lockstitch machine chalanay ki samjh honi chahiye. Thread tension tight karna, thread roll load karna, speed control bar (pedal operator mechanism) aur lubrication maintenance unka lagatar kaam hai.
            </p>

            <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">3. Job Opportunities in Panipat</h4>
            <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
               Panipat ke industrial setup jaise bedsheets units, export houses aur cushions pillow stitching unit me rozana sainkdo Juki Operators ki zaroorat padti hai. 
               Yahan par karigari piece-rate ya fir fix monthly payment par milti hai, jisme unki speed aur safai ke anusar salary badhti hai.
            </p>
          </div>
        `
      },
      'market-update': {
        title: '🏭 Panipat Textile Market Update',
        icon: '🏭',
        content: `
          <div style="font-family: inherit; color: var(--navy);">
            <p style="margin-bottom: 12px; font-size: 15px; font-weight: 600; line-height: 1.5; color: #475569;">
               Panipat textile hub me latest demand aur rates ko lekar kayi nayi baatein samne aa rahi hain. Agle quarter ke liye factories me naye registrations aur capacity update ho rahe hain.
            </p>
            
            <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">1. Yarn and Price Updates</h4>
            <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
               Polyester aur blend cotton yarn ki range me achha balance bana hua hai. Iske karan raw material budget control me hone se export orders badhne ki sambhavna hai.
            </p>

            <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">2. Loom Machine Capacity Expansion</h4>
            <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
               Panipat me traditional power loom se advance Rapier Loom aur Electronic Jacquard Loom ki taraf shifts badh gaya hai. Operators ko advance electronic devices ki skill jaldi sikhna padega, kyunki uski demand 20% tak badhi hai.
            </p>

            <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">3. Workers demand and wage security</h4>
            <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
               Sardiyon ke season ke liye blankets aur home furnishing units me abhi se loading start ho chuki hai. Helper, operator aur stitching master ko advance booking contracts mil rahe hain.
            </p>
          </div>
        `
      },
      'machine-guide': {
        title: '🔧 Machine Guide',
        icon: '🔧',
        content: `
          <div style="font-family: inherit; color: var(--navy);">
            <p style="margin-bottom: 12px; font-size: 15px; font-weight: 600; line-height: 1.5; color: #475569;">
               Textile production me dher saari machines ka use hota hai. Ek achhe karigar ko in sab ki samajh honi chahiye:
             </p>
             
             <h4 style="font-size: 14px; font-weight: 800; margin-top: 12px; margin-bottom: 4px; color: var(--navy);">• Single Needle Lockstitch Machine</h4>
             <p style="margin-bottom: 8px; font-size: 13.5px; line-height: 1.4; color: #475569;">
                Sabse common machine jo straight and plain stitch ke liye use hoti hai. Yeh har textile aur boutique factory ki basic need hai.
             </p>

             <h4 style="font-size: 14px; font-weight: 800; margin-top: 12px; margin-bottom: 4px; color: var(--navy);">• Double Needle Machine</h4>
             <p style="margin-bottom: 8px; font-size: 13.5px; line-height: 1.4; color: #475569;">
                Heavy stitching (jaise jeans, durable bags aur heavy cotton sheets) me do lines ki ek sath parallel stitching ke liye iska use kiya jata hai. Isse safety badhti hai.
             </p>

             <h4 style="font-size: 14px; font-weight: 800; margin-top: 12px; margin-bottom: 4px; color: var(--navy);">• Overlock Machine</h4>
             <p style="margin-bottom: 8px; font-size: 13.5px; line-height: 1.4; color: #475569;">
                Fabric ke kinaro (edges) ko finishing dene aur dhage nikalne se bachane ke liye cutting-edge stitch karti hai. Isko side lock ya interlock overlapping bhi bolte hain.
             </p>

             <h4 style="font-size: 14px; font-weight: 800; margin-top: 12px; margin-bottom: 4px; color: var(--navy);">• Interlock (Flatlock) Machine</h4>
             <p style="margin-bottom: 8px; font-size: 13.5px; line-height: 1.4; color: #475569;">
                Knitted fabrics ya stretchable kapdon (pajamas, t-shirts) ke seams jo khichte hain, unko bina toote hold karne ke liye use hoti hai.
             </p>

             <h4 style="font-size: 14px; font-weight: 800; margin-top: 12px; margin-bottom: 4px; color: var(--navy);">• Pico Machine</h4>
             <p style="margin-bottom: 8px; font-size: 13.5px; line-height: 1.4; color: #475569;">
                Dupattas, sarees aur suits ke kinaro par fine rolled circular stitching karne ke liye decorative finish deti hai.
             </p>
           </div>
         `
       },
       'bridal-suit-2026': {
         title: '👗 Bridal Suit Designs 2026',
         icon: '👗',
         content: `
           <div style="font-family: inherit; color: var(--navy);">
             <p style="margin-bottom: 12px; font-size: 15px; font-weight: 600; line-height: 1.5; color: #475569;">
                Boutiques ke liye bridalwear hamesha bada business le kar aata hai. Panipat ke successful ladies boutique owners ke liye 2026 ke exclusive designs aur styling trends yahan hain:
             </p>
             
             <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">1. Velvet & Organza Synergy</h4>
             <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
                Heavy velvet suits with organza dupatta border and zardozi detailing are top on requests. Is design me traditional aura ke sath modern feel milta hai.
             </p>

             <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">2. Pastels over Classic Red</h4>
             <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
                Royal bride and guests standard traditional red ki jagah lavender, pale gold, soft rose blush aur sage green colors ko choose kar rahe hain. Boutiques ko kora and satin fabric blanks stocks me rakhne chahiye.
             </p>

             <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">3. Handcrafted Dabka & Gotta Patti</h4>
             <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
                Karigaron ko handmade gotta patti, dabka work aur katori sitara lace pattern sikhne aur offer karne chahiye jo premium value add karte hain.
             </p>
           </div>
         `
       },
       'trending-kurti': {
         title: '🎀 Trending Kurti Designs',
         icon: '🎀',
         content: `
           <div style="font-family: inherit; color: var(--navy);">
             <p style="margin-bottom: 12px; font-size: 15px; font-weight: 600; line-height: 1.5; color: #475569;">
                Panipat ke ladies tailors aur local boutique owners ke liye fashion trends update aur SEO optimize ideas unki dukaan me naye grahak laane me help karenge.
             </p>
             
             <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">1. Style Update: Necklines and Sleeve Details</h4>
             <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
                Organza insert ke sath V-neck cuts, bell sleeves aur anchor-thread detailing are trending. Cotton kurtis me asymmetric hemlines aur high-low cuts bhi ladies kafi pasand karte hain.
             </p>

             <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">2. Local Boutique SEO Guide</h4>
             <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
                Boutique orders pane ke liye apnay WhatsApp Business status ya local listings me in terms ka use karein: <i>"Best custom boutique in Model Town Panipat"</i>, <i>"Designer suits and daily wear cotton kurti tailoring"</i>, ya <i>"Ladies tailor in Panipat with fast delivery"</i>. Isse local search queries me help milti hai.
             </p>

             <h4 style="font-size: 15px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: var(--navy);">3. Fabric Focus</h4>
             <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5; color: #475569;">
                Suti (Cotton), Linen blend aur Khadi blanks are best suited for summer trend. Iis par simple white dori embroidery ya mirror lace kafi minimal par classy lagta hai.
             </p>
           </div>
         `
       }
     };

     const blog = blogsData[blogId];
     if (blog) {
       document.getElementById('blog-modal-title').innerText = blog.title;
       document.getElementById('blog-modal-icon').innerText = blog.icon;
       document.getElementById('blog-modal-body').innerHTML = blog.content;
       this.openModal('blog-reader-modal');
     }
   },

   // --- FILTER BOUTIQUE GALLERY LOGIC ---
   filterBoutiqueGallery(category, btnElement) {
     // Manage active state of chips
     const chipsParent = btnElement.parentElement;
     chipsParent.querySelectorAll('.f-chip').forEach(btn => {
       btn.classList.remove('active');
     });
     btnElement.classList.add('active');

     // Filter cards
     const cards = document.querySelectorAll('.boutique-gallery-card');
     cards.forEach(card => {
       const cardCategory = card.getAttribute('data-category');
       if (category === 'All' || cardCategory === category) {
         card.style.display = 'flex';
       } else {
         card.style.display = 'none';
       }
     });
   },

   // --- SHOW BOUTIQUE DETAILS MODAL ---
   showBoutiqueDetail(boutiqueId) {
     const details = {
       'riya': {
         name: 'Riya Boutique',
         location: 'Model Town, Panipat',
         icon: '👗',
         content: `
           <div style="font-family: inherit; color: var(--navy); display: flex; flex-direction: column; gap: 14px;">
             <div style="background: #fdf2f8; padding: 12px; border-radius: 12px; border: 1px solid #fbcfe8;">
               <b style="color: #db2777; font-size: 11px; text-transform: uppercase;">✨ Specialization</b>
               <p style="margin: 4px 0 0; font-size: 13.5px; font-weight: 700; color: #475569;">Designer Suits, Premium Bridal Wear &amp; Custom Kurti Designs</p>
             </div>
             
             <div>
               <h4 style="font-size: 14px; font-weight: 800; color: var(--navy); margin-bottom: 6px;">Services Offered:</h4>
               <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; display: flex; flex-direction: column; gap: 4px;">
                 <li>Handcrafted Zardozi &amp; Gotta Patti Suits</li>
                 <li>Customized Bridal Lehengas and Troussau Wear</li>
                 <li>Premium cotton Kurti stitching with designer necklines</li>
                 <li>Fast tailoring delivery options (within 48 hours)</li>
               </ul>
             </div>

             <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;">
               <h4 style="font-size: 13px; font-weight: 800; color: var(--navy); margin-bottom: 4px;">📍 Outlet Address:</h4>
               <p style="margin: 0; font-size: 12.5px; color: #64748b; font-weight: 600;">Shop No. 42, Near Fountain Chowk, Model Town, Panipat</p>
             </div>

             <div style="display: flex; gap: 8px; margin-top: 12px;">
               <button class="btn-primary" style="flex: 1; padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; border:none; color:white; cursor:pointer;" onclick="app.closeModal('boutique-detail-modal'); app.showToast('💬 Opening chat with Riya Boutique...')">Open Chat</button>
               <a href="tel:+919876543210" style="flex: 1; text-align: center; border: 1px solid #cbd5e1; padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; color:var(--navy); background: white; text-decoration: none;" onclick="app.closeModal('boutique-detail-modal'); app.showToast('📞 Calling Riya Boutique...')">Call Boutique</a>
             </div>
           </div>
         `
       },
       'noor': {
         name: 'Noor Fashion Studio',
         location: 'Insar Bazaar, Panipat',
         icon: '🥻',
         content: `
           <div style="font-family: inherit; color: var(--navy); display: flex; flex-direction: column; gap: 14px;">
             <div style="background: #f0fdf4; padding: 12px; border-radius: 12px; border: 1px solid #bbf7d0;">
               <b style="color: #16a34a; font-size: 11px; text-transform: uppercase;">✨ Specialization</b>
               <p style="margin: 4px 0 0; font-size: 13.5px; font-weight: 700; color: #475569;">Ladies Tailoring, Expert Fitting, Quick Alterations &amp; Daily Wear Kurtis</p>
             </div>

             <div>
               <h4 style="font-size: 14px; font-weight: 800; color: var(--navy); margin-bottom: 6px;">Services Offered:</h4>
               <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; display: flex; flex-direction: column; gap: 4px;">
                 <li>Excellent fitting for Salwar and Punjabi Suits</li>
                 <li>Same-day fitting alteration &amp; size correction</li>
                 <li>Elegant neck styles and sleeve designs for daily wear kurtis</li>
                 <li>Bulk stitching contracts for ladies uniforms and boutique owners</li>
               </ul>
             </div>

             <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;">
               <h4 style="font-size: 13px; font-weight: 800; color: var(--navy); margin-bottom: 4px;">📍 Outlet Address:</h4>
               <p style="margin: 0; font-size: 12.5px; color: #64748b; font-weight: 600;">Main Market Road, Opp. Noor Masjid, Insar Bazaar, Panipat</p>
             </div>

             <div style="display: flex; gap: 8px; margin-top: 12px;">
               <button class="btn-primary" style="flex: 1; padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; border:none; color:white; cursor:pointer;" onclick="app.closeModal('boutique-detail-modal'); app.showToast('💬 Opening chat with Noor Fashion Studio...')">Open Chat</button>
               <a href="tel:+919876543211" style="flex: 1; text-align: center; border: 1px solid #cbd5e1; padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; color:var(--navy); background: white; text-decoration: none;" onclick="app.closeModal('boutique-detail-modal'); app.showToast('📞 Calling Noor Fashion Studio...')">Call Studio</a>
             </div>
           </div>
         `
       },
       'aayat': {
         name: 'Aayat Bridal Wear',
         location: 'Panipat',
         icon: '💃',
         content: `
           <div style="font-family: inherit; color: var(--navy); display: flex; flex-direction: column; gap: 14px;">
             <div style="background: #fef2f2; padding: 12px; border-radius: 12px; border: 1px solid #fecaca;">
               <b style="color: #dc2626; font-size: 11px; text-transform: uppercase;">✨ Specialization</b>
               <p style="margin: 4px 0 0; font-size: 13.5px; font-weight: 700; color: #475569;">Exclusive Bridal Wear, Heavy Lehengas &amp; Designer Party Wear</p>
             </div>

             <div>
               <h4 style="font-size: 14px; font-weight: 800; color: var(--navy); margin-bottom: 6px;">Services Offered:</h4>
               <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; display: flex; flex-direction: column; gap: 4px;">
                 <li>Royal Bridal Lehengas with customized heavy can-can</li>
                 <li>Traditional Chunri pattern and gotta-work dupattas</li>
                 <li>Premium Indo-Western wedding gowns &amp; designer sarees</li>
                 <li>On-demand bridal designer consultancy</li>
               </ul>
             </div>

             <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;">
               <h4 style="font-size: 13px; font-weight: 800; color: var(--navy); margin-bottom: 4px;">📍 Outlet Address:</h4>
               <p style="margin: 0; font-size: 12.5px; color: #64748b; font-weight: 600;">G.T. Road, Near Grand Trunk Hotel, Panipat</p>
             </div>

             <div style="display: flex; gap: 8px; margin-top: 12px;">
               <button class="btn-primary" style="flex: 1; padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; border:none; color:white; cursor:pointer;" onclick="app.closeModal('boutique-detail-modal'); app.showToast('💬 Opening chat with Aayat Bridal Wear...')">Open Chat</button>
               <a href="tel:+919876543212" style="flex: 1; text-align: center; border: 1px solid #cbd5e1; padding: 12px 0; font-size: 13px; font-weight: 800; border-radius: 10px; color:var(--navy); background: white; text-decoration: none;" onclick="app.closeModal('boutique-detail-modal'); app.showToast('📞 Calling Aayat Bridal Wear...')">Call Boutique</a>
             </div>
           </div>
         `
       }
     };

     const shop = details[boutiqueId];
     if (shop) {
       document.getElementById('boutique-modal-name').innerText = shop.name;
       document.getElementById('boutique-modal-location').innerText = shop.location;
       document.getElementById('boutique-modal-icon').innerText = shop.icon;
       document.getElementById('boutique-modal-body').innerHTML = shop.content;
       this.openModal('boutique-detail-modal');
       if (window.lucide) window.lucide.createIcons();
     }
   }
};

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
