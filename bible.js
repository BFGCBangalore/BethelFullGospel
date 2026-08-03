/* =========================================================
   Bethel Full Gospel Church — Standalone Bible Reader
   ========================================================= */
(function () {
  "use strict";

  const YOUVERSION_API_KEY = 'MziyDQauvhUClT7jAP7EAlslpwvaiyjaD7G2yczDAFUf2rWL';
  const NIV_ID = 111; 
  const HHBD_ID = 819; 
  const IRVKAN_ID = 1898; 

  const BIBLE_METADATA = {
    "Genesis": { chapters: 50, usfm: "GEN" },
    "Exodus": { chapters: 40, usfm: "EXO" },
    "Leviticus": { chapters: 27, usfm: "LEV" },
    "Numbers": { chapters: 36, usfm: "NUM" },
    "Deuteronomy": { chapters: 34, usfm: "DEU" },
    "Joshua": { chapters: 24, usfm: "JOS" },
    "Judges": { chapters: 21, usfm: "JDG" },
    "Ruth": { chapters: 4, usfm: "RUT" },
    "1 Samuel": { chapters: 31, usfm: "1SA" },
    "2 Samuel": { chapters: 24, usfm: "2SA" },
    "1 Kings": { chapters: 22, usfm: "1KI" },
    "2 Kings": { chapters: 25, usfm: "2KI" },
    "1 Chronicles": { chapters: 29, usfm: "1CH" },
    "2 Chronicles": { chapters: 36, usfm: "2CH" },
    "Ezra": { chapters: 10, usfm: "EZR" },
    "Nehemiah": { chapters: 13, usfm: "NEH" },
    "Esther": { chapters: 10, usfm: "EST" },
    "Job": { chapters: 42, usfm: "JOB" },
    "Psalms": { chapters: 150, usfm: "PSA" },
    "Proverbs": { chapters: 31, usfm: "PRO" },
    "Ecclesiastes": { chapters: 12, usfm: "ECC" },
    "Song of Solomon": { chapters: 8, usfm: "SNG" },
    "Isaiah": { chapters: 66, usfm: "ISA" },
    "Jeremiah": { chapters: 52, usfm: "JER" },
    "Lamentations": { chapters: 5, usfm: "LAM" },
    "Ezekiel": { chapters: 48, usfm: "EZK" },
    "Daniel": { chapters: 12, usfm: "DAN" },
    "Hosea": { chapters: 14, usfm: "HOS" },
    "Joel": { chapters: 3, usfm: "JOL" },
    "Amos": { chapters: 9, usfm: "AMO" },
    "Obadiah": { chapters: 1, usfm: "OBA" },
    "Jonah": { chapters: 4, usfm: "JON" },
    "Micah": { chapters: 7, usfm: "MIC" },
    "Nahum": { chapters: 3, usfm: "NAM" },
    "Habakkuk": { chapters: 3, usfm: "HAB" },
    "Zephaniah": { chapters: 3, usfm: "ZEP" },
    "Haggai": { chapters: 2, usfm: "HAG" },
    "Zechariah": { chapters: 14, usfm: "ZEC" },
    "Malachi": { chapters: 4, usfm: "MAL" },
    "Matthew": { chapters: 28, usfm: "MAT" },
    "Mark": { chapters: 16, usfm: "MRK" },
    "Luke": { chapters: 24, usfm: "LUK" },
    "John": { chapters: 21, usfm: "JHN" },
    "Acts": { chapters: 28, usfm: "ACT" },
    "Romans": { chapters: 16, usfm: "ROM" },
    "1 Corinthians": { chapters: 16, usfm: "1CO" },
    "2 Corinthians": { chapters: 13, usfm: "2CO" },
    "Galatians": { chapters: 6, usfm: "GAL" },
    "Ephesians": { chapters: 6, usfm: "EPH" },
    "Philippians": { chapters: 4, usfm: "PHP" },
    "Colossians": { chapters: 4, usfm: "COL" },
    "1 Thessalonians": { chapters: 5, usfm: "1TH" },
    "2 Thessalonians": { chapters: 3, usfm: "2TH" },
    "1 Timothy": { chapters: 6, usfm: "1TI" },
    "2 Timothy": { chapters: 4, usfm: "2TI" },
    "Titus": { chapters: 3, usfm: "TIT" },
    "Philemon": { chapters: 1, usfm: "PHM" },
    "Hebrews": { chapters: 13, usfm: "HEB" },
    "James": { chapters: 5, usfm: "JAS" },
    "1 Peter": { chapters: 5, usfm: "1PE" },
    "2 Peter": { chapters: 3, usfm: "2PE" },
    "1 John": { chapters: 5, usfm: "1JN" },
    "2 John": { chapters: 1, usfm: "2JN" },
    "3 John": { chapters: 1, usfm: "3JN" },
    "Jude": { chapters: 1, usfm: "JUD" },
    "Revelation": { chapters: 22, usfm: "REV" }
  };

  const SEED_SEARCH_INDEX = [
    {ref:"John 3:16", en:"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", kn:"ದೇವರು ಲೋಕವನ್ನು ಎಷ್ಟು ಪ್ರೀತಿಸಿದನೆಂದರೆ ತನ್ನ ಒಬ್ಬನೇ ಮಗನನ್ನು ದಯಪಾಲಿಸಿದನು.", book:"John", ch:3, v:16},
    {ref:"Psalms 23:1", en:"The LORD is my shepherd; I shall not want.", kn:"ಕರ್ತನು ನನ್ನ ಕುರುಬನು; ನನಗೆ ಏನೂ ಕೊರತೆಯಿಲ್ಲ.", book:"Psalms", ch:23, v:1},
    {ref:"Matthew 28:19", en:"Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.", kn:"ಆದ್ದರಿಂದ ನೀವು ಹೋಗಿ ಎಲ್ಲಾ ಜನಾಂಗಗಳನ್ನು ಶಿಷ್ಯರನ್ನಾಗಿ ಮಾಡಿ.", book:"Matthew", ch:28, v:19},
    {ref:"John 1:1", en:"In the beginning was the Word, and the Word was with God, and the Word was God.", kn:"ಆದಿಯಲ್ಲಿ ವಾಕ್ಯವಿತ್ತು, ಮತ್ತು ವಾಕ್ಯವು ದೇವರ ಸಂಗಡ ಇತ್ತು.", book:"John", ch:1, v:1},
    {ref:"Genesis 1:1", en:"In the beginning God created the heaven and the earth.", kn:"ಆದಿಯಲ್ಲಿ ದೇವರು ಆಕಾಶ ಮತ್ತು ಭೂಮಿಯನ್ನು ಸೃಷ್ಟಿಸಿದನು.", book:"Genesis", ch:1, v:1},
    {ref:"Matthew 5:3", en:"Blessed are the poor in spirit: for theirs is the kingdom of heaven.", kn:"ಆತ್ಮದಲ್ಲಿ ಬಡವರು ಧನ್ಯರು; ಏಕೆಂದರೆ ಆಕಾಶ ರಾಜ್ಯವು ಅವರದು.", book:"Matthew", ch:5, v:3},
  ];

  let currentLang = 'en';
  let currentBook = null;
  let currentChapter = null;
  let fontSize = 13;
  let currentPresenterVerse = null;

  const books = Object.keys(BIBLE_METADATA);

  function buildBookList() {
    const otList = document.getElementById('otBookList');
    const ntList = document.getElementById('ntBookList');
    if (!otList || !ntList) return;
    
    otList.innerHTML = '';
    ntList.innerHTML = '';
    
    const booksArr = Object.keys(BIBLE_METADATA);
    booksArr.forEach((b, index) => {
      const el = document.createElement('div');
      el.className = 'book-item' + (b === currentBook ? ' active' : '');
      el.textContent = b;
      el.onclick = () => selectBook(b);
      
      if (index < 39) {
        otList.appendChild(el);
      } else {
        ntList.appendChild(el);
      }
    });
  }

  window.toggleTestament = function(testament) {
    const otAcc = document.getElementById('otAccordion');
    const ntAcc = document.getElementById('ntAccordion');
    const otList = document.getElementById('otBookList');
    const ntList = document.getElementById('ntBookList');

    if (testament === 'ot') {
      otAcc.classList.toggle('active');
      otList.style.display = otAcc.classList.contains('active') ? 'flex' : 'none';
    } else {
      ntAcc.classList.toggle('active');
      ntList.style.display = ntAcc.classList.contains('active') ? 'flex' : 'none';
    }
  };

  function selectBook(b) {
    currentBook = b;
    currentChapter = null;
    buildBookList();
    
    // Toggle sidebar visibility
    const booksSec = document.getElementById('sidebarBooksSection');
    const chapSec = document.getElementById('sidebarChaptersSection');
    const selectedBookLbl = document.getElementById('sidebarSelectedBook');
    
    if (booksSec) booksSec.style.display = 'none';
    if (chapSec) chapSec.style.display = 'block';
    if (selectedBookLbl) selectedBookLbl.textContent = b;

    buildChapterRow();
    showEmpty();
  }

  function showBooksList() {
    const booksSec = document.getElementById('sidebarBooksSection');
    const chapSec = document.getElementById('sidebarChaptersSection');
    if (booksSec) booksSec.style.display = 'block';
    if (chapSec) chapSec.style.display = 'none';
  }

  function buildChapterRow() {
    const row = document.getElementById('chapterRow');
    if (!row) return;
    row.innerHTML = '';
    if (!currentBook) return;

    const count = BIBLE_METADATA[currentBook].chapters;

    for (let i = 1; i <= Math.min(count, 150); i++) {
      const btn = document.createElement('button');
      btn.className = 'ch-btn' + (i === currentChapter ? ' active' : '');
      btn.textContent = i;
      btn.onclick = () => selectChapter(i);
      row.appendChild(btn);
    }
  }

  function selectChapter(ch) {
    currentChapter = ch;
    buildChapterRow();
    renderReading();
  }

  async function fetchPassageFromYouVersion(versionId, passageRef) {
    const url = `https://api.youversion.com/v1/bibles/${versionId}/passages/${passageRef}?format=html`;
    try {
      const res = await fetch(url, {
        headers: {
          "X-YVP-App-Key": YOUVERSION_API_KEY,
          "Accept": "application/json"
        }
      });
      if (!res.ok) throw new Error("HTTP error " + res.status);
      const data = await res.json();
      return parseVersesFromHtml(data.content);
    } catch (err) {
      console.error("Fetch failed:", err);
      return [];
    }
  }

  function parseVersesFromHtml(html) {
    const verses = [];
    const segments = html.split(/<span class="yv-v"/);
    
    for (let i = 1; i < segments.length; i++) {
      const seg = segments[i];
      const match = seg.match(/^\s*v="(\d+)">.*?<\/span>(.*)$/);
      if (match) {
        const verseNum = parseInt(match[1]);
        let text = match[2];
        
        // Remove the inner verse label to prevent duplicate numbering
        text = text.replace(/<span class="yv-vlbl">.*?<\/span>/g, '');
        // Remove all other HTML tags
        text = text.replace(/<[^>]+>/g, '').trim();
        // Replace HTML entities
        text = text.replace(/&ldquo;|&rdquo;/g, '"')
                   .replace(/&lsquo;|&rsquo;/g, "'")
                   .replace(/&amp;/g, '&')
                   .replace(/&quot;/g, '"')
                   .replace(/&#39;/g, "'")
                   .replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .trim();
        
        if (text) {
          verses.push({ verse: verseNum, text: text });
        }
      }
    }
    return verses;
  }

  let localKannadaBible = null;
  async function getLocalKannadaBible() {
    if (localKannadaBible) return localKannadaBible;
    try {
      const res = await fetch('kannada_bible_1684.json');
      localKannadaBible = await res.json();
      return localKannadaBible;
    } catch (err) {
      console.error("Failed to load local Kannada bible:", err);
      return null;
    }
  }

  async function getLocalPassage(book, chapter) {
    const bible = await getLocalKannadaBible();
    if (!bible) return [];
    if (bible[book] && bible[book][chapter]) {
       return bible[book][chapter];
    }
    return [];
  }

  async function renderReading() {
    const pane = document.getElementById('brReadingPane');
    const searchResults = document.getElementById('brSearchResults');
    if (!pane) return;
    if (searchResults) searchResults.style.display = 'none';

    pane.innerHTML = `<div class="br-empty"><i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i><p>Loading verses...</p></div>`;
    pane.style.display = 'block';

    if (!currentBook || !currentChapter) {
      showEmpty();
      return;
    }

    const usfm = BIBLE_METADATA[currentBook].usfm;
    const ref = `${usfm}.${currentChapter}`;
    
    let enVerses = [];
    let knVerses = [];
    let hiVerses = [];

    try {
      enVerses = await fetchPassageFromYouVersion(NIV_ID, ref);
      if (enVerses.length === 0) enVerses = await fetchPassageFromYouVersion(3034, ref);
      
      hiVerses = await fetchPassageFromYouVersion(HHBD_ID, ref);
      knVerses = await getLocalPassage(currentBook, currentChapter);

      const verseMap = new Map();
      enVerses.forEach(v => {
        verseMap.set(v.verse, { en: v.text, kn: '', hi: '' });
      });
      knVerses.forEach(v => {
        if (verseMap.has(v.verse)) {
          verseMap.get(v.verse).kn = v.text;
        } else {
          verseMap.set(v.verse, { en: '', kn: v.text, hi: '' });
        }
      });
      hiVerses.forEach(v => {
        if (verseMap.has(v.verse)) {
          verseMap.get(v.verse).hi = v.text;
        } else {
          verseMap.set(v.verse, { en: '', kn: '', hi: v.text });
        }
      });

      const sortedVerseNums = Array.from(verseMap.keys()).sort((a, b) => a - b);

      if (sortedVerseNums.length === 0) {
        pane.innerHTML = `<div class="br-empty">
          <i class="fa-solid fa-circle-exclamation" aria-hidden="true" style="color:var(--brand)"></i>
          <p>Failed to load chapter content.</p>
          <p style="font-size:12px;color:var(--muted);max-width:320px;margin:0 auto;line-height:1.5;">Make sure you have an active internet connection and the API key is valid.</p>
        </div>`;
        return;
      }

      function escapeHtml(unsafe) {
          return (unsafe || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      }

      let html = `<div class="br-reading-header">
        <div><div class="br-ch-title">${currentBook} — Chapter ${currentChapter}</div><div class="br-ch-ref">${currentLang === 'en' ? 'NIV' : ''} ${currentLang === 'kn' ? '· ಕನ್ನಡ' : currentLang === 'hi' ? '· हिंदी' : currentLang === 'en-kn' ? 'NIV · ಕನ್ನಡ' : currentLang === 'en-hi' ? 'NIV · हिंदी' : currentLang === 'kn-hi' ? 'ಕನ್ನಡ · हिंदी' : currentLang === 'all' ? 'NIV · ಕನ್ನಡ · हिंदी' : ''}</div></div>
        <div class="br-nav">
          <button class="btn btn-secondary btn-sm" onclick="navChapter(-1)">&larr; Prev</button>
          <button class="btn btn-secondary btn-sm" onclick="navChapter(1)">Next &rarr;</button>
        </div>
      </div><div class="verse-list">`;

      sortedVerseNums.forEach(num => {
        const v = verseMap.get(num);
        html += `<div class="verse-row" data-num="${num}" data-en="${escapeHtml(v.en)}" data-kn="${escapeHtml(v.kn)}" data-hi="${escapeHtml(v.hi)}" onclick="window.handleVerseClick(this)">
          <span class="verse-num">${num}</span>
          <div class="${(currentLang === 'en-kn' || currentLang === 'en-hi' || currentLang === 'kn-hi' || currentLang === 'all') ? 'verse-dual' : ''}">
            ${(currentLang === 'en' || currentLang === 'en-kn' || currentLang === 'en-hi' || currentLang === 'all') ? `<span class="verse-en" style="font-size:${fontSize}px">${v.en}</span>` : ''}
            ${currentLang === 'kn' ? `<span class="verse-kn" style="font-size:${fontSize}px">${v.kn}</span>` : ''}
            ${currentLang === 'hi' ? `<span class="verse-hi" style="font-size:${fontSize}px">${v.hi}</span>` : ''}
            ${(currentLang === 'en-kn' || currentLang === 'kn-hi' || currentLang === 'all') ? `<span class="verse-kn-text" style="font-size:${fontSize - 1}px">${v.kn}</span>` : ''}
            ${(currentLang === 'en-hi' || currentLang === 'kn-hi' || currentLang === 'all') ? `<span class="verse-hi-text" style="font-size:${fontSize - 1}px">${v.hi}</span>` : ''}
          </div>
        </div>`;
      });
      html += '</div>';
      pane.innerHTML = html;

    } catch (err) {
      console.error("Error loading chapter:", err);
      pane.innerHTML = `<div class="br-empty"><i class="fa-solid fa-triangle-exclamation"></i><p>Failed to load verses.</p></div>`;
    }
  }

  window.navChapter = function (dir) {
    if (!currentBook || !currentChapter) return;
    const newCh = currentChapter + dir;
    if (newCh < 1 || newCh > BIBLE_METADATA[currentBook].chapters) return;
    selectChapter(newCh);
  };

  window.handleVerseClick = function(el) {
    const isHighlighted = el.classList.contains('highlighted');
    
    // Clear all highlights in the reading pane to enforce single selection for presenter
    document.querySelectorAll('.verse-row.highlighted').forEach(r => r.classList.remove('highlighted'));
    
    if (isHighlighted) {
       // If it was already highlighted, toggle it off and clear projector
       currentPresenterVerse = null;
       localStorage.removeItem('presenter_state');
    } else {
       // Highlight it and push to projector
       el.classList.add('highlighted');
       
       currentPresenterVerse = {
          book: currentBook,
          ch: currentChapter,
          v: el.getAttribute('data-num'),
          enText: el.getAttribute('data-en'),
          knText: el.getAttribute('data-kn'),
          hiText: el.getAttribute('data-hi')
       };
       updatePresenterState();
    }
  };

  function showEmpty() {
    const pane = document.getElementById('brReadingPane');
    if (pane) {
      pane.innerHTML = `<div class="br-empty"><i class="fa-solid fa-book-open" aria-hidden="true"></i><p>Select a book and chapter to begin reading</p></div>`;
    }
  }

  function doSearch() {
    const input = document.getElementById('brSearchInput');
    if (!input) return;
    const q = input.value.trim().toLowerCase();
    
    if (!q) {
      const searchResults = document.getElementById('brSearchResults');
      const readingPane = document.getElementById('brReadingPane');
      if (searchResults) searchResults.style.display = 'none';
      if (readingPane) readingPane.style.display = 'block';
      return;
    }

    const pane = document.getElementById('brReadingPane');
    const resDiv = document.getElementById('brSearchResults');
    if (pane) pane.style.display = 'none';
    if (!resDiv) return;

    // Check if it's a verse reference (e.g. John 3:16)
    const refMatch = q.match(/^([1-3]?\s*[a-z]+)\s+(\d+):(\d+)$/i);
    if (refMatch) {
      const bookInput = refMatch[1];
      const chNum = parseInt(refMatch[2]);
      const vNum = parseInt(refMatch[3]);

      const matchedBook = books.find(b => b.toLowerCase() === bookInput.toLowerCase() || b.toLowerCase().startsWith(bookInput.toLowerCase()));
      if (matchedBook) {
        fetchAndDisplaySingleVerse(matchedBook, chNum, vNum);
        return;
      }
    }

    // Check if it's a chapter reference (e.g. John 3)
    const chMatch = q.match(/^([1-3]?\s*[a-z]+)\s+(\d+)$/i);
    if (chMatch) {
      const bookInput = chMatch[1];
      const chNum = parseInt(chMatch[2]);
      const matchedBook = books.find(b => b.toLowerCase() === bookInput.toLowerCase() || b.toLowerCase().startsWith(bookInput.toLowerCase()));
      if (matchedBook) {
        if (searchResults) searchResults.style.display = 'none';
        if (pane) pane.style.display = 'block';
        selectBook(matchedBook);
        selectChapter(chNum);
        return;
      }
    }

    // Keyword Search: Local mock search using the sample index
    resDiv.innerHTML = `<div class="br-search-result"><div class="sr-label">Searching the Word...</div><div style="font-size:13px;color:var(--muted);padding:12px 0"><i class="fa-solid fa-spinner fa-spin"></i> Searching...</div></div>`;
    resDiv.style.display = 'block';

    setTimeout(() => {
        let results = SEED_SEARCH_INDEX.filter(s =>
            (s.en && s.en.toLowerCase().includes(q)) ||
            (s.kn && s.kn.includes(q)) ||
            (s.ref && s.ref.toLowerCase().includes(q))
        );

        let html = `<div class="br-search-result"><div class="sr-label">${results.length} result${results.length !== 1 ? 's' : ''} for "${input.value}"</div>`;
        if (results.length === 0) {
            html += `<div style="font-size:13px;color:var(--muted);padding:12px 0">No verses found in sample index. Try references like "John 3:16" or keywords like "love" or "ಪ್ರೀತಿ".</div>`;
        } else {
            results.forEach(r => {
            html += `<div class="sr-card" onclick="window.openFromSearch('${r.book}',${r.ch},${r.v})">
                <div class="sr-ref"><i class="fa-solid fa-bookmark" style="font-size:13px" aria-hidden="true"></i>${r.ref}</div>
                <div class="sr-text-en" style="font-size:${fontSize}px">${r.en}</div>
                ${currentLang !== 'en' ? `<div class="sr-text-kn" style="font-size:${fontSize - 1}px">${r.kn}</div>` : ''}
            </div>`;
            });
        }
        html += '</div>';
        resDiv.innerHTML = html;
    }, 500);
  }

  async function fetchAndDisplaySingleVerse(book, ch, v) {
    const resDiv = document.getElementById('brSearchResults');
    resDiv.style.display = 'block';
    resDiv.innerHTML = `<div class="br-reading"><div class="br-empty"><i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i><p>Loading verse...</p></div></div>`;
    
    const usfm = BIBLE_METADATA[book].usfm;
    const ref = `${usfm}.${ch}.${v}`;
    
    let enText = '';
    let knText = '';
    let hiText = '';

    // Always fetch all languages for seamless presenter integration
    const vsEn = await fetchPassageFromYouVersion(NIV_ID, ref);
    if (vsEn.length > 0) enText = vsEn[0].text;
    else {
        const alt = await fetchPassageFromYouVersion(3034, ref);
        if (alt.length > 0) enText = alt[0].text;
    }

    const vsKn = await getLocalPassage(book, ch);
    const verseObj = vsKn.find(verseData => String(verseData.verse) === String(v));
    if (verseObj) knText = verseObj.text;

    const vsHi = await fetchPassageFromYouVersion(HHBD_ID, ref);
    if (vsHi.length > 0) hiText = vsHi[0].text;

    let html = `<div class="br-reading">
      <div class="br-reading-header">
        <div><div class="br-ch-title">${book} ${ch}:${v}</div><div class="br-ch-ref">${currentLang === 'en' ? 'NIV' : ''} ${currentLang === 'kn' ? '· ಕನ್ನಡ' : currentLang === 'hi' ? '· हिंदी' : currentLang === 'en-kn' ? 'NIV · ಕನ್ನಡ' : currentLang === 'en-hi' ? 'NIV · हिंदी' : currentLang === 'kn-hi' ? 'ಕನ್ನಡ · हिंदी' : currentLang === 'all' ? 'NIV · ಕನ್ನಡ · हिंदी' : ''}</div></div>
      </div><div class="verse-list">`;
    
    if (!enText && !knText && !hiText) {
       html += `<div style="font-size:13px;color:var(--muted);padding:12px 0">Could not load the requested verse. Check your internet connection or the reference.</div>`;
       currentPresenterVerse = null;
    } else {
       html += `<div class="verse-row">
          <span class="verse-num">${v}</span>
          <div class="${(currentLang === 'en-kn' || currentLang === 'en-hi' || currentLang === 'kn-hi' || currentLang === 'all') ? 'verse-dual' : ''}">
            ${(currentLang === 'en' || currentLang === 'en-kn' || currentLang === 'en-hi' || currentLang === 'all') ? `<span class="verse-en" style="font-size:${fontSize}px">${enText}</span>` : ''}
            ${currentLang === 'kn' ? `<span class="verse-kn" style="font-size:${fontSize}px">${knText}</span>` : ''}
            ${currentLang === 'hi' ? `<span class="verse-hi" style="font-size:${fontSize}px">${hiText}</span>` : ''}
            ${(currentLang === 'en-kn' || currentLang === 'kn-hi' || currentLang === 'all') ? `<span class="verse-kn-text" style="font-size:${fontSize - 1}px">${knText}</span>` : ''}
            ${(currentLang === 'en-hi' || currentLang === 'kn-hi' || currentLang === 'all') ? `<span class="verse-hi-text" style="font-size:${fontSize - 1}px">${hiText}</span>` : ''}
          </div>
        </div>`;
       currentPresenterVerse = { book, ch, v, enText, knText, hiText };
       updatePresenterState();
    }
    html += '</div></div>';
    resDiv.innerHTML = html;
  }

  function updatePresenterState() {
    if (!currentPresenterVerse) return;
    localStorage.setItem('presenter_state', JSON.stringify({
      ref: `${currentPresenterVerse.book} ${currentPresenterVerse.ch}:${currentPresenterVerse.v}`,
      enText: currentPresenterVerse.enText || '',
      knText: currentPresenterVerse.knText || '',
      hiText: currentPresenterVerse.hiText || '',
      lang: currentLang,
      fontSize: fontSize
    }));
  }

  window.openFromSearch = function (book, ch, v) {
    if (!book || !ch) return;
    const input = document.getElementById('brSearchInput');
    if (input) input.value = '';
    
    currentBook = book; currentChapter = ch;
    buildBookList(); buildChapterRow();
    const searchResults = document.getElementById('brSearchResults');
    const readingPane = document.getElementById('brReadingPane');
    if (searchResults) searchResults.style.display = 'none';
    if (readingPane) readingPane.style.display = 'block';
    renderReading().then(() => {
        setTimeout(() => {
            const rows = document.querySelectorAll('.verse-row');
            // Find the correct verse element based on data attribute or inner text
            let targetRow = null;
            rows.forEach(r => {
               if (r.getAttribute('data-num') === String(v)) targetRow = r;
            });
            if (targetRow) {
                window.handleVerseClick(targetRow);
                targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    });
  };

  /* =========================================================
     Event Listener Bindings
     ========================================================= */
  function initBibleReader() {
    buildBookList();
    buildChapterRow();

    const searchBtn = document.getElementById('brSearchBtn');
    if (searchBtn) searchBtn.onclick = doSearch;

    const backBtn = document.getElementById('brSidebarBackBtn');
    if (backBtn) {
      backBtn.onclick = () => {
        showBooksList();
      };
    }

    const clearBtn = document.getElementById('brClearBtn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        const input = document.getElementById('brSearchInput');
        if (input) input.value = '';
        const searchResults = document.getElementById('brSearchResults');
        const readingPane = document.getElementById('brReadingPane');
        if (searchResults) searchResults.style.display = 'none';
        if (readingPane) readingPane.style.display = 'block';
        
        currentPresenterVerse = null;
        localStorage.removeItem('presenter_state');
        
        showBooksList();
        
        // Clear book list filter
        const items = document.querySelectorAll('.book-item');
        items.forEach(item => item.style.display = 'block');
      };
    }

    const searchInput = document.getElementById('brSearchInput');
    if (searchInput) {
      searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
      
      // Live filter books in the sidebar
      searchInput.addEventListener('input', () => {
         const q = searchInput.value.trim().toLowerCase();
         const items = document.querySelectorAll('.book-item');
         
         // If query has numbers, it's likely a verse search, don't filter the book list heavily,
         // just match the letters part
         const textMatch = q.match(/^[a-z\s]+/i);
         const filterText = textMatch ? textMatch[0].trim() : q;

         const otAcc = document.getElementById('otAccordion');
         const ntAcc = document.getElementById('ntAccordion');
         const otList = document.getElementById('otBookList');
         const ntList = document.getElementById('ntBookList');

         if (filterText.length > 0) {
             // Auto-expand both accordions when searching
             if (otAcc) otAcc.classList.add('active');
             if (otList) otList.style.display = 'flex';
             if (ntAcc) ntAcc.classList.add('active');
             if (ntList) ntList.style.display = 'flex';
         }

         items.forEach(item => {
             if (item.textContent.toLowerCase().includes(filterText)) {
                 item.style.display = 'block';
             } else {
                 item.style.display = 'none';
             }
         });
      });
    }

    const langIds = ['langEn', 'langKn', 'langHi', 'langEnKn', 'langEnHi', 'langKnHi', 'langAll'];
    langIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = function () {
          langIds.forEach(i => {
            const b = document.getElementById(i);
            if (b) b.classList.remove('active');
          });
          this.classList.add('active');
          
          if (id === 'langEn') currentLang = 'en';
          else if (id === 'langKn') currentLang = 'kn';
          else if (id === 'langHi') currentLang = 'hi';
          else if (id === 'langEnKn') currentLang = 'en-kn';
          else if (id === 'langEnHi') currentLang = 'en-hi';
          else if (id === 'langKnHi') currentLang = 'kn-hi';
          else currentLang = 'all';
          
          if (currentPresenterVerse) updatePresenterState();
          
          // Re-render
          const resDiv = document.getElementById('brSearchResults');
          if (resDiv && resDiv.style.display === 'block') {
             doSearch(); // Re-trigger search to update languages
          } else if (currentChapter) {
             renderReading();
          }
        };
      }
    });

    const fontUp = document.getElementById('fontUp');
    if (fontUp) {
      fontUp.onclick = () => {
        if (fontSize < 20) {
          fontSize++;
          const lbl = document.getElementById('fontLbl');
          if (lbl) lbl.textContent = fontSize + 'px';
          
          if (currentPresenterVerse) updatePresenterState();
          
          const resDiv = document.getElementById('brSearchResults');
          if (resDiv && resDiv.style.display === 'block') doSearch();
          else if (currentChapter) renderReading();
        }
      };
    }

    const fontDn = document.getElementById('fontDn');
    if (fontDn) {
      fontDn.onclick = () => {
        if (fontSize > 11) {
          fontSize--;
          const lbl = document.getElementById('fontLbl');
          if (lbl) lbl.textContent = fontSize + 'px';
          
          if (currentPresenterVerse) updatePresenterState();
          
          const resDiv = document.getElementById('brSearchResults');
          if (resDiv && resDiv.style.display === 'block') doSearch();
          else if (currentChapter) renderReading();
        }
      };
    }

    /* =========================================================
       Live Monitor & DroidCam Controls
       ========================================================= */
    const lmFab = document.getElementById('liveMonitorFab');
    const lmPanel = document.getElementById('liveMonitorPanel');
    const lmContent = document.getElementById('lmContent');
    const lmCamToggle = document.getElementById('lmCamToggle');
    const lmCamControls = document.getElementById('lmCamControls');
    const lmCamPreview = document.getElementById('lmCamPreview');
    const lmCamVideo = document.getElementById('lmCamVideo');
    const camShapeCircleBtn = document.getElementById('camShapeCircle');
    const camShapeSquareBtn = document.getElementById('camShapeSquare');
    const camShapeRectBtn = document.getElementById('camShapeRect');
    const camShapeFullBtn = document.getElementById('camShapeFull');
    const camWidthSlider = document.getElementById('camWidthSlider');
    const camHeightSlider = document.getElementById('camHeightSlider');
    const camWidthLbl = document.getElementById('camWidthLabel');
    const camHeightLbl = document.getElementById('camHeightLabel');
    const camDeviceSelect = document.getElementById('camDeviceSelect');
    const fabIcon = document.getElementById('fabIcon');

    let lmOpen = false;
    let camActive = false;
    let camShape = 'circle';
    let camW = 150;
    let camH = 150;
    let lmCamStream = null; // Separate stream for live monitor preview

    // Toggle Live Monitor panel
    if (lmFab) {
      lmFab.onclick = () => {
        lmOpen = !lmOpen;
        if (lmPanel) {
          lmPanel.classList.toggle('open', lmOpen);
        }
        lmFab.classList.toggle('active', lmOpen);
        if (fabIcon) {
          fabIcon.className = lmOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-tv';
        }
        // Update mini preview on open
        if (lmOpen) {
          updateMiniPreview();
          // If camera is active, start local preview stream
          if (camActive && !lmCamStream) {
            startLocalCamPreview();
          } else if (camActive && lmCamStream && lmCamPreview) {
            lmCamPreview.style.display = 'block';
            lmCamPreview.classList.add(camShape);
          }
          // Try to populate camera list
          populateCameraList();
        } else {
          // Hide local preview stream when panel closes, DO NOT stop camera
          if (lmCamPreview) lmCamPreview.style.display = 'none';
        }
      };
    }

    // Update mini presenter preview
    function updateMiniPreview() {
      if (!lmContent) return;
      const raw = localStorage.getItem('presenter_state');
      if (!raw) {
        lmContent.innerHTML = '<div class="mini-empty">Waiting for verse selection...</div>';
        return;
      }
      try {
        const state = JSON.parse(raw);
        if (!state.ref) {
          lmContent.innerHTML = '<div class="mini-empty">Waiting for verse selection...</div>';
          return;
        }
        let html = `<div class="mini-ref">${state.ref}</div>`;
        if (state.lang === 'en' || state.lang === 'en-kn' || state.lang === 'en-hi' || state.lang === 'all') {
          html += `<div class="mini-verse-en">${state.enText}</div>`;
        }
        if (state.lang === 'kn' || state.lang === 'en-kn' || state.lang === 'kn-hi' || state.lang === 'all') {
          html += `<div class="mini-verse-kn">${state.knText}</div>`;
        }
        if (state.lang === 'hi' || state.lang === 'en-hi' || state.lang === 'kn-hi' || state.lang === 'all') {
          html += `<div class="mini-verse-hi">${state.hiText}</div>`;
        }
        lmContent.innerHTML = html;
      } catch (e) {
        lmContent.innerHTML = '<div class="mini-empty">Waiting for verse selection...</div>';
      }
    }

    // Patch updatePresenterState to also update mini preview
    const originalUpdatePresenter = updatePresenterState;
    updatePresenterState = function() {
      originalUpdatePresenter();
      if (lmOpen) updateMiniPreview();
    };

    /* --- Local Camera Preview for Live Monitor --- */
    async function startLocalCamPreview() {
      if (!lmCamVideo || !lmCamPreview) return;
      try {
        const constraints = {
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 }
          }
        };
        // Use the same device if one is selected
        const savedDevice = localStorage.getItem('droidcam_selected_device');
        if (savedDevice) {
          constraints.video.deviceId = { exact: savedDevice };
        }
        lmCamStream = await navigator.mediaDevices.getUserMedia(constraints);
        lmCamVideo.srcObject = lmCamStream;
        window.camStream = lmCamStream; // EXPORT FOR PRESENTER

        if (lmOpen) {
          lmCamPreview.style.display = 'block';
          lmCamPreview.classList.remove('circle', 'square', 'rect', 'full');
          lmCamPreview.classList.add(camShape);
          updateMiniCamSize();
        }
        localStorage.setItem('droidcam_status', JSON.stringify({ active: true, timestamp: Date.now() }));
      } catch (err) {
        console.warn('Could not start local preview:', err);
        localStorage.setItem('droidcam_status', JSON.stringify({ active: false, error: err.message, timestamp: Date.now() }));
      }
    }

    function stopLocalCamPreview() {
      if (lmCamStream) {
        lmCamStream.getTracks().forEach(t => t.stop());
        lmCamStream = null;
        window.camStream = null; // CLEAR EXPORT
      }
      if (lmCamVideo) lmCamVideo.srcObject = null;
      if (lmCamPreview) lmCamPreview.style.display = 'none';
      localStorage.setItem('droidcam_status', JSON.stringify({ active: false, timestamp: Date.now() }));
    }

    /* --- Mini cam preview dragging inside Live Monitor --- */
    let lmCamDragging = false;
    let lmCamDragOffset = { x: 0, y: 0 };

    if (lmCamPreview) {
      lmCamPreview.addEventListener('mousedown', (e) => {
        lmCamDragging = true;
        const rect = lmCamPreview.getBoundingClientRect();
        lmCamDragOffset.x = e.clientX - rect.left;
        lmCamDragOffset.y = e.clientY - rect.top;
        lmCamPreview.style.transition = 'none';
        e.preventDefault();
        e.stopPropagation();
      });

      document.addEventListener('mousemove', (e) => {
        if (!lmCamDragging) return;
        const container = document.getElementById('lmPreview');
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const x = e.clientX - containerRect.left - lmCamDragOffset.x;
        const y = e.clientY - containerRect.top - lmCamDragOffset.y;
        // Clamp within preview bounds
        const maxX = containerRect.width - lmCamPreview.offsetWidth;
        const maxY = containerRect.height - lmCamPreview.offsetHeight;
        lmCamPreview.style.left = Math.max(0, Math.min(maxX, x)) + 'px';
        lmCamPreview.style.top = Math.max(0, Math.min(maxY, y)) + 'px';
        lmCamPreview.style.right = 'auto';
        lmCamPreview.style.bottom = 'auto';
        e.preventDefault();
      });

      document.addEventListener('mouseup', () => {
        if (lmCamDragging) {
          lmCamDragging = false;
          lmCamPreview.style.transition = '';
          // Sync drag position to presenter as percentage-based coordinates
          const container = document.getElementById('lmPreview');
          if (container) {
            const containerRect = container.getBoundingClientRect();
            const leftPx = parseFloat(lmCamPreview.style.left) || 0;
            const topPx = parseFloat(lmCamPreview.style.top) || 0;
            const leftPct = (leftPx / containerRect.width) * 100;
            const topPct = (topPx / containerRect.height) * 100;
            localStorage.setItem('droidcam_position', JSON.stringify({
              leftPct: leftPct,
              topPct: topPct,
              timestamp: Date.now()
            }));
          }
        }
      });
    }

    /* --- Camera Device Selector --- */
    let cachedDeviceList = null;
    async function populateCameraList() {
      if (!camDeviceSelect) return;
      try {
        let devices = await navigator.mediaDevices.enumerateDevices();
        let videoDevices = devices.filter(d => d.kind === 'videoinput');
        
        // If we don't have labels, we need to request permission first
        const hasLabels = videoDevices.some(d => d.label);
        if (!hasLabels) {
          try {
            const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
            tempStream.getTracks().forEach(t => t.stop());
            // Re-enumerate now that we have permission
            devices = await navigator.mediaDevices.enumerateDevices();
            videoDevices = devices.filter(d => d.kind === 'videoinput');
          } catch (e) {
            console.warn('Could not get camera permission for labels:', e);
          }
        }
        
        if (videoDevices.length > 0) {
          cachedDeviceList = videoDevices.map(d => ({
            deviceId: d.deviceId,
            label: d.label || `Camera ${videoDevices.indexOf(d) + 1}`
          }));
          
          const savedDevice = localStorage.getItem('droidcam_selected_device');
          camDeviceSelect.innerHTML = cachedDeviceList.map(d =>
            `<option value="${d.deviceId}" ${d.deviceId === savedDevice ? 'selected' : ''}>${d.label}</option>`
          ).join('');
        } else {
          camDeviceSelect.innerHTML = '<option value="">No cameras found</option>';
        }
      } catch(e) {
        console.error('Failed to enumerate cameras:', e);
        camDeviceSelect.innerHTML = '<option value="">Error finding cameras</option>';
      }
    }

    if (camDeviceSelect) {
      camDeviceSelect.onchange = () => {
        const deviceId = camDeviceSelect.value;
        localStorage.setItem('droidcam_selected_device', deviceId);
        // Restart local preview with new device
        if (lmCamStream) {
          stopLocalCamPreview();
          startLocalCamPreview();
        }
      };
    }

    // Also listen for storage events (from presenter or other tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === 'presenter_state' && lmOpen) {
        updateMiniPreview();
      }
      // bible.js is now the master of the camera stream, so we don't listen to status changes from elsewhere
      // Sync size from presenter resize handle
      if (e.key === 'droidcam_size_sync') {
        try {
          const dims = JSON.parse(e.newValue);
          if (camWidthSlider) { camWidthSlider.value = dims.w; camW = dims.w; }
          if (camHeightSlider) { camHeightSlider.value = dims.h; camH = dims.h; }
          if (camWidthLbl) camWidthLbl.textContent = dims.w;
          if (camHeightLbl) camHeightLbl.textContent = dims.h;
          // Also update mini cam preview size
          if (lmCamPreview) {
            lmCamPreview.style.width = dims.w + 'px';
            lmCamPreview.style.height = dims.h + 'px';
          }
        } catch(e) {}
      }
      // Sync position from presenter drag
      if (e.key === 'droidcam_position') {
        try {
          const pos = JSON.parse(e.newValue);
          if (pos.leftPct !== undefined && pos.topPct !== undefined && lmCamPreview) {
            const container = document.getElementById('lmPreview');
            if (container) {
              const containerRect = container.getBoundingClientRect();
              lmCamPreview.style.left = (pos.leftPct / 100 * containerRect.width) + 'px';
              lmCamPreview.style.top = (pos.topPct / 100 * containerRect.height) + 'px';
              lmCamPreview.style.right = 'auto';
              lmCamPreview.style.bottom = 'auto';
            }
          }
        } catch(e) {}
      }
      // Camera device list updated
      if (e.key === 'droidcam_devices') {
        populateCameraList();
      }
    });

    // DroidCam Toggle
    if (lmCamToggle) {
      lmCamToggle.onclick = () => {
        camActive = !camActive;
        lmCamToggle.classList.toggle('active', camActive);
        if (lmCamControls) lmCamControls.classList.toggle('visible', camActive);
        if (camActive) {
          startLocalCamPreview();
        } else {
          stopLocalCamPreview();
        }
      };
    }

    // Shape buttons helper
    function setAllShapeButtons(active) {
      [camShapeCircleBtn, camShapeSquareBtn, camShapeRectBtn, camShapeFullBtn].forEach(b => {
        if (b) b.classList.remove('active');
      });
      if (active) active.classList.add('active');
    }

    function sendShapeCommand(shape) {
      camShape = shape;
      localStorage.setItem('droidcam_command', JSON.stringify({
        action: 'shape', value: shape, timestamp: Date.now()
      }));
      localStorage.setItem('droidcam_shape', shape);
      // Update mini preview shape
      if (lmCamPreview) {
        lmCamPreview.classList.remove('circle', 'square', 'rect', 'full');
        lmCamPreview.classList.add(shape);
      }
      if (shape === 'circle') {
        const minDim = Math.min(camW, camH);
        camW = minDim;
        camH = minDim;
        if (camWidthSlider) camWidthSlider.value = minDim;
        if (camHeightSlider) camHeightSlider.value = minDim;
        if (camWidthLbl) camWidthLbl.textContent = minDim;
        if (camHeightLbl) camHeightLbl.textContent = minDim;
      } else if (shape === 'rect') {
        if (camW === camH) {
          // Make it explicitly rectangular 16:9
          camW = Math.min(Math.round(camH * 1.77), 500);
          if (camWidthSlider) camWidthSlider.value = camW;
          if (camWidthLbl) camWidthLbl.textContent = camW;
        }
      }
      updateMiniCamSize();
    }

    if (camShapeCircleBtn) {
      camShapeCircleBtn.onclick = () => { setAllShapeButtons(camShapeCircleBtn); sendShapeCommand('circle'); };
    }
    if (camShapeSquareBtn) {
      camShapeSquareBtn.onclick = () => { setAllShapeButtons(camShapeSquareBtn); sendShapeCommand('square'); };
    }
    if (camShapeRectBtn) {
      camShapeRectBtn.onclick = () => { setAllShapeButtons(camShapeRectBtn); sendShapeCommand('rect'); };
    }
    if (camShapeFullBtn) {
      camShapeFullBtn.onclick = () => { setAllShapeButtons(camShapeFullBtn); sendShapeCommand('full'); };
    }

    // Helper to update mini cam preview size in live monitor proportionally to the 1920px presenter
    function updateMiniCamSize() {
      if (!lmCamPreview) return;
      const container = document.getElementById('lmPreview');
      const scale = (container && container.clientWidth > 0) ? (container.clientWidth / 1920) : 0.166;
      lmCamPreview.style.width = (camW * scale) + 'px';
      lmCamPreview.style.height = (camH * scale) + 'px';
    }

    // Width slider
    if (camWidthSlider) {
      camWidthSlider.oninput = () => {
        camW = parseInt(camWidthSlider.value);
        if (camWidthLbl) camWidthLbl.textContent = camW;
        // For circle, sync height too
        if (camShape === 'circle') {
          camH = camW;
          if (camHeightSlider) camHeightSlider.value = camW;
          if (camHeightLbl) camHeightLbl.textContent = camW;
        }
        updateMiniCamSize();
        localStorage.setItem('droidcam_command', JSON.stringify({
          action: 'resize', width: camW, height: camH, timestamp: Date.now()
        }));
        localStorage.setItem('droidcam_width', String(camW));
        localStorage.setItem('droidcam_height', String(camH));
      };
    }

    // Height slider
    if (camHeightSlider) {
      camHeightSlider.oninput = () => {
        camH = parseInt(camHeightSlider.value);
        if (camHeightLbl) camHeightLbl.textContent = camH;
        // For circle, sync width too
        if (camShape === 'circle') {
          camW = camH;
          if (camWidthSlider) camWidthSlider.value = camH;
          if (camWidthLbl) camWidthLbl.textContent = camH;
        }
        updateMiniCamSize();
        localStorage.setItem('droidcam_command', JSON.stringify({
          action: 'resize', width: camW, height: camH, timestamp: Date.now()
        }));
        localStorage.setItem('droidcam_width', String(camW));
        localStorage.setItem('droidcam_height', String(camH));
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initBibleReader);
  } else {
    initBibleReader();
  }

})();
