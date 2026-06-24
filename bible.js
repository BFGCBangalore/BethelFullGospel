/* =========================================================
   Bethel Full Gospel Church — Standalone Bible Reader
   ========================================================= */
(function () {
  "use strict";

  const YOUVERSION_API_KEY = 'MziyDQauvhUClT7jAP7EAlslpwvaiyjaD7G2yczDAFUf2rWL';
  const KJV_ID = 1; 
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
    {ref:"Philippians 4:13", en:"I can do all things through Christ which strengtheneth me.", kn:"ನನ್ನನ್ನು ಬಲಪಡಿಸುವ ಕ್ರಿಸ್ತನ ಮೂಲಕ ನಾನು ಎಲ್ಲವನ್ನೂ ಮಾಡಬಲ್ಲೆನು.", book:null, ch:null, v:null},
    {ref:"Proverbs 3:5", en:"Trust in the LORD with all thine heart; and lean not unto thine own understanding.", kn:"ನಿನ್ನ ಪೂರ್ಣ ಹೃದಯದಿಂದ ಕರ್ತನಲ್ಲಿ ಭರವಸೆ ಇಡು.", book:null, ch:null, v:null},
    {ref:"Isaiah 40:31", en:"But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.", kn:"ಆದರೆ ಕರ್ತನಿಗಾಗಿ ಕಾಯುವವರು ತಮ್ಮ ಶಕ್ತಿಯನ್ನು ನವೀಕರಿಸಿಕೊಳ್ಳುವರು.", book:null, ch:null, v:null},
    {ref:"Romans 8:28", en:"And we know that all things work together for good to them that love God.", kn:"ದೇವರನ್ನು ಪ್ರೀತಿಸುವವರಿಗೆ ಸಕಲ ವಿಷಯಗಳು ಒಳ್ಳೆಯದಕ್ಕಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತವೆ ಎಂದು ನಮಗೆ ತಿಳಿದಿದೆ.", book:null, ch:null, v:null},
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
    const list = document.getElementById('bookList');
    if (!list) return;
    list.innerHTML = '';
    books.forEach(b => {
      const el = document.createElement('div');
      el.className = 'book-item' + (b === currentBook ? ' active' : '');
      el.textContent = b;
      el.onclick = () => selectBook(b);
      list.appendChild(el);
    });
  }

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

    try {
      if (currentLang === 'en' || currentLang === 'both') {
        enVerses = await fetchPassageFromYouVersion(KJV_ID, ref);
        if (enVerses.length === 0) {
            enVerses = await fetchPassageFromYouVersion(3034, ref);
        }
      }
      if (currentLang === 'kn' || currentLang === 'both') {
        knVerses = await fetchPassageFromYouVersion(IRVKAN_ID, ref);
      }

      const verseMap = new Map();
      enVerses.forEach(v => {
        verseMap.set(v.verse, { en: v.text, kn: '' });
      });
      knVerses.forEach(v => {
        if (verseMap.has(v.verse)) {
          verseMap.get(v.verse).kn = v.text;
        } else {
          verseMap.set(v.verse, { en: '', kn: v.text });
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
        <div><div class="br-ch-title">${currentBook} — Chapter ${currentChapter}</div><div class="br-ch-ref">${currentLang === 'en' ? 'KJV' : ''} ${currentLang === 'kn' ? '· ಕನ್ನಡ' : currentLang === 'both' ? 'KJV · Bilingual' : ''}</div></div>
        <div class="br-nav">
          <button class="btn btn-secondary btn-sm" onclick="navChapter(-1)">&larr; Prev</button>
          <button class="btn btn-secondary btn-sm" onclick="navChapter(1)">Next &rarr;</button>
        </div>
      </div><div class="verse-list">`;

      sortedVerseNums.forEach(num => {
        const v = verseMap.get(num);
        html += `<div class="verse-row" data-num="${num}" data-en="${escapeHtml(v.en)}" data-kn="${escapeHtml(v.kn)}" onclick="window.handleVerseClick(this)">
          <span class="verse-num">${num}</span>
          <div class="${currentLang === 'both' ? 'verse-dual' : ''}">
            ${currentLang === 'en' || currentLang === 'both' ? `<span class="verse-en" style="font-size:${fontSize}px">${v.en}</span>` : ''}
            ${currentLang === 'kn' ? `<span class="verse-kn" style="font-size:${fontSize}px">${v.kn}</span>` : ''}
            ${currentLang === 'both' ? `<span class="verse-kn-text" style="font-size:${fontSize - 1}px">${v.kn}</span>` : ''}
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
          knText: el.getAttribute('data-kn')
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

    if (currentLang === 'en' || currentLang === 'both') {
      const vs = await fetchPassageFromYouVersion(KJV_ID, ref);
      if (vs.length > 0) enText = vs[0].text;
      else {
         const alt = await fetchPassageFromYouVersion(3034, ref);
         if (alt.length > 0) enText = alt[0].text;
      }
    }
    if (currentLang === 'kn' || currentLang === 'both') {
      const vs = await fetchPassageFromYouVersion(IRVKAN_ID, ref);
      if (vs.length > 0) knText = vs[0].text;
    }

    let html = `<div class="br-reading">
      <div class="br-reading-header">
        <div><div class="br-ch-title">${book} ${ch}:${v}</div><div class="br-ch-ref">${currentLang === 'en' ? 'KJV' : ''} ${currentLang === 'kn' ? '· ಕನ್ನಡ' : currentLang === 'both' ? 'KJV · Bilingual' : ''}</div></div>
      </div><div class="verse-list">`;
    
    if (!enText && !knText) {
       html += `<div style="font-size:13px;color:var(--muted);padding:12px 0">Could not load the requested verse. Check your internet connection or the reference.</div>`;
       currentPresenterVerse = null;
    } else {
       html += `<div class="verse-row">
            <span class="verse-num">${v}</span>
            <div class="${currentLang === 'both' ? 'verse-dual' : ''}">
              ${currentLang === 'en' || currentLang === 'both' ? `<span class="verse-en" style="font-size:${fontSize}px">${enText}</span>` : ''}
              ${currentLang === 'kn' ? `<span class="verse-kn" style="font-size:${fontSize}px">${knText}</span>` : ''}
              ${currentLang === 'both' ? `<span class="verse-kn-text" style="font-size:${fontSize - 1}px">${knText}</span>` : ''}
            </div>
        </div>`;
       currentPresenterVerse = { book, ch, v, enText, knText };
       updatePresenterState();
    }
    html += '</div></div>';
    resDiv.innerHTML = html;
  }

  function updatePresenterState() {
    if (!currentPresenterVerse) return;
    localStorage.setItem('presenter_state', JSON.stringify({
      ref: `${currentPresenterVerse.book} ${currentPresenterVerse.ch}:${currentPresenterVerse.v}`,
      enText: currentPresenterVerse.enText,
      knText: currentPresenterVerse.knText,
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

         items.forEach(item => {
             if (item.textContent.toLowerCase().includes(filterText)) {
                 item.style.display = 'block';
             } else {
                 item.style.display = 'none';
             }
         });
      });
    }

    ['langEn', 'langKn', 'langBoth'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = function () {
          ['langEn', 'langKn', 'langBoth'].forEach(i => {
            const b = document.getElementById(i);
            if (b) b.classList.remove('active');
          });
          this.classList.add('active');
          currentLang = id === 'langEn' ? 'en' : id === 'langKn' ? 'kn' : 'both';
          
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initBibleReader);
  } else {
    initBibleReader();
  }

})();
