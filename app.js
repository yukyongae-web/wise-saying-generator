// App State
const state = {
  currentTab: 'discovery', // discovery, creator, saved
  currentCategory: 'all',
  searchQuery: '',
  currentQuote: null,
  favorites: [],
  creator: {
    text: "상상력은 모든 것이다. 그것은 삶이 앞으로 만들어갈 것들의 예고편이다.",
    author: "알베르트 아인슈타인",
    bgType: 'gradient', // gradient, solid
    bgValue: 'preset-aurora', // preset-aurora, preset-sunset, etc. or hex color
    fontFamily: 'serif', // serif, sans
    fontSize: 24, // px
    padding: 40, // px
    textAlign: 'center' // left, center, right
  }
};

// Preset Gradients Definitions for Canvas Export
const PRESET_GRADIENTS = {
  'preset-aurora': { colors: ['#4f46e5', '#7c3aed', '#db2777'] },
  'preset-sunset': { colors: ['#f97316', '#ea580c', '#e11d48'] },
  'preset-ocean': { colors: ['#06b6d4', '#0891b2', '#0d9488'] },
  'preset-forest': { colors: ['#10b981', '#059669', '#047857'] },
  'preset-cosmic': { colors: ['#1e1b4b', '#311042', '#111827'] },
  'preset-dark': { colors: ['#12131e', '#12131e'] }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  loadFavorites();
  handleUrlParams();
  setupEventListeners();

  // Pre-load voices for mobile browsers
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  // Set initial quote if not already set by URL params
  if (!state.currentQuote) {
    showRandomQuote();
  }

  // Update custom card preview with initial state
  updateCreatorPreview();
  renderFavorites();
});

// Load Lucide Icons dynamically (falls back gracefully if not loaded)
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.dataset.tab;
      switchTab(targetTab);
    });
  });

  // Discovery: Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.currentCategory = e.currentTarget.dataset.category;
      showRandomQuote();
    });
  });

  // Discovery: Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
    });
    // Search on enter key
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        showRandomQuote();
      }
    });
  }

  // Discovery Actions
  document.getElementById('next-quote-btn').addEventListener('click', showRandomQuote);
  document.getElementById('fav-quote-btn').addEventListener('click', toggleFavoriteCurrent);
  document.getElementById('speak-quote-btn').addEventListener('click', speakCurrentQuote);
  document.getElementById('copy-quote-btn').addEventListener('click', copyCurrentQuote);
  document.getElementById('share-quote-btn').addEventListener('click', shareCurrentQuote);

  // Card Mouse Move Effect (Glassmorphism highlight)
  const displayCard = document.getElementById('quote-card');
  if (displayCard) {
    displayCard.addEventListener('mousemove', (e) => {
      const rect = displayCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      displayCard.style.setProperty('--mouse-x', `${x}px`);
      displayCard.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  // Creator Controls
  const customTextInput = document.getElementById('creator-text');
  const customAuthorInput = document.getElementById('creator-author');
  const fontSizeSlider = document.getElementById('creator-font-size');
  const paddingSlider = document.getElementById('creator-padding');
  const downloadBtn = document.getElementById('creator-download-btn');

  if (customTextInput) {
    customTextInput.addEventListener('input', (e) => {
      state.creator.text = e.target.value;
      updateCreatorPreview();
    });
  }

  if (customAuthorInput) {
    customAuthorInput.addEventListener('input', (e) => {
      state.creator.author = e.target.value;
      updateCreatorPreview();
    });
  }

  // Theme Circles
  document.querySelectorAll('.theme-circle').forEach(circle => {
    circle.addEventListener('click', (e) => {
      document.querySelectorAll('.theme-circle').forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const preset = e.currentTarget.dataset.preset;
      state.creator.bgType = 'gradient';
      state.creator.bgValue = preset;
      updateCreatorPreview();
    });
  });

  // Font Toggle
  document.querySelectorAll('#font-toggle button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#font-toggle button').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.creator.fontFamily = e.currentTarget.dataset.value;
      updateCreatorPreview();
    });
  });

  // Align Toggle
  document.querySelectorAll('#align-toggle button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#align-toggle button').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.creator.textAlign = e.currentTarget.dataset.value;
      updateCreatorPreview();
    });
  });

  if (fontSizeSlider) {
    fontSizeSlider.addEventListener('input', (e) => {
      state.creator.fontSize = parseInt(e.target.value);
      document.getElementById('font-size-val').textContent = `${state.creator.fontSize}px`;
      updateCreatorPreview();
    });
  }

  if (paddingSlider) {
    paddingSlider.addEventListener('input', (e) => {
      state.creator.padding = parseInt(e.target.value);
      document.getElementById('padding-val').textContent = `${state.creator.padding}px`;
      updateCreatorPreview();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', exportCreatorCard);
  }
}

// Tab Switching Logic
function switchTab(tabName) {
  state.currentTab = tabName;

  // Update Navigation UI
  document.querySelectorAll('.nav-tab').forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update Page Panels
  document.querySelectorAll('.tab-content').forEach(content => {
    if (content.id === `${tabName}-tab`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  // Custom action when entering saved tab
  if (tabName === 'saved') {
    renderFavorites();
  }
}

// URL Params Handling (For Shared Quotes)
function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const qId = params.get('id');
  const qText = params.get('text');
  const qAuthor = params.get('author');

  if (qId) {
    const found = QUOTES.find(q => q.id == qId);
    if (found) {
      state.currentQuote = found;
      displayQuote(found);
      switchTab('discovery');
      return;
    }
  }

  if (qText) {
    const customQuote = {
      id: 'shared-' + Date.now(),
      text: decodeURIComponent(qText),
      textEn: '',
      author: decodeURIComponent(qAuthor || '익명'),
      authorEn: '',
      category: 'life'
    };
    state.currentQuote = customQuote;
    displayQuote(customQuote);
    switchTab('discovery');
  }
}

// Get filtered quotes list
function getFilteredQuotes() {
  let list = QUOTES;

  // Filter by category
  if (state.currentCategory !== 'all') {
    list = list.filter(q => q.category === state.currentCategory);
  }

  // Filter by search query
  if (state.searchQuery) {
    list = list.filter(q =>
      q.text.toLowerCase().includes(state.searchQuery) ||
      (q.textEn && q.textEn.toLowerCase().includes(state.searchQuery)) ||
      q.author.toLowerCase().includes(state.searchQuery) ||
      (q.authorEn && q.authorEn.toLowerCase().includes(state.searchQuery))
    );
  }

  return list;
}

// Show Random Quote
function showRandomQuote() {
  const list = getFilteredQuotes();

  if (list.length === 0) {
    // Show empty placeholder quote
    displayQuote({
      text: "검색 조건에 맞는 명언이 없습니다.",
      author: "사색",
      category: "life"
    });
    return;
  }

  // Select a random quote ensuring it's different from the current one if multiple exist
  let selected = state.currentQuote;
  if (list.length === 1) {
    selected = list[0];
  } else {
    while (selected === state.currentQuote) {
      const idx = Math.floor(Math.random() * list.length);
      selected = list[idx];
    }
  }

  state.currentQuote = selected;
  displayQuote(selected);
}

// Display Quote with Animations
function displayQuote(quote) {
  const quoteTextEl = document.getElementById('quote-text-main');
  const quoteTextEnEl = document.getElementById('quote-text-sub');
  const quoteAuthorEl = document.getElementById('quote-author');
  const favBtn = document.getElementById('fav-quote-btn');

  // Trigger animations
  const elements = [quoteTextEl, quoteTextEnEl, quoteAuthorEl];
  elements.forEach(el => {
    if (el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(8px)';
    }
  });

  setTimeout(() => {
    if (quoteTextEl) {
      quoteTextEl.textContent = quote.text;
      quoteTextEl.style.opacity = 1;
      quoteTextEl.style.transform = 'translateY(0)';
    }

    if (quoteTextEnEl) {
      quoteTextEnEl.textContent = quote.textEn || '';
      quoteTextEnEl.style.opacity = 1;
      quoteTextEnEl.style.transform = 'translateY(0)';
    }

    if (quoteAuthorEl) {
      quoteAuthorEl.textContent = quote.authorEn ? `${quote.author} (${quote.authorEn})` : quote.author;
      quoteAuthorEl.style.opacity = 1;
      quoteAuthorEl.style.transform = 'translateY(0)';
    }

    // Update Favorite Button active state
    if (favBtn) {
      const isFav = isFavorite(quote);
      if (isFav) {
        favBtn.classList.add('active-favorite');
        favBtn.innerHTML = `<i data-lucide="heart" class="toast-success-icon" style="fill: var(--accent-danger)"></i>`;
      } else {
        favBtn.classList.remove('active-favorite');
        favBtn.innerHTML = `<i data-lucide="heart"></i>`;
      }
      initLucideIcons();
    }
  }, 200);
}

// Keep a global reference to prevent garbage collection of SpeechSynthesisUtterance in mobile browsers
window.activeUtterances = [];

// Speech Synthesis (TTS)
function speakCurrentQuote() {
  if (!state.currentQuote) return;

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    showToast('음성 출력을 중단했습니다.', 'info');
    return;
  }

  const quote = state.currentQuote;

  // Build speaking text (Korean first, then English if present)
  let speakText = quote.text;
  if (quote.author) {
    speakText += `, - ${quote.author}`;
  }

  // Clear any stuck queue first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(speakText);

  // Set voice to Korean (ko-KR) if available
  const voices = window.speechSynthesis.getVoices();
  const koVoice = voices.find(voice => voice.lang.includes('ko-KR'));
  if (koVoice) {
    utterance.voice = koVoice;
  }

  utterance.rate = 0.95; // Slightly slower for better resonance
  utterance.pitch = 1.0;

  // Prevent garbage collection
  window.activeUtterances.push(utterance);

  utterance.onstart = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const msg = isIOS ? '명언을 낭독합니다. (무음 모드를 해제해 주세요)' : '명언을 낭독합니다...';
    showToast(msg, 'info');

    const speakBtn = document.getElementById('speak-quote-btn');
    if (speakBtn) {
      speakBtn.innerHTML = `<i data-lucide="volume-x"></i>`;
      initLucideIcons();
    }
  };

  utterance.onend = () => {
    window.activeUtterances = window.activeUtterances.filter(u => u !== utterance);
    const speakBtn = document.getElementById('speak-quote-btn');
    if (speakBtn) {
      speakBtn.innerHTML = `<i data-lucide="volume-2"></i>`;
      initLucideIcons();
    }
  };

  utterance.onerror = (e) => {
    window.activeUtterances = window.activeUtterances.filter(u => u !== utterance);
    const speakBtn = document.getElementById('speak-quote-btn');
    if (speakBtn) {
      speakBtn.innerHTML = `<i data-lucide="volume-2"></i>`;
      initLucideIcons();
    }
  };

  window.speechSynthesis.speak(utterance);
}

// Copy Quote text
function copyCurrentQuote() {
  if (!state.currentQuote) return;
  const quote = state.currentQuote;
  const textToCopy = `"${quote.text}"\n- ${quote.author}`;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      showToast('명언 텍스트가 복사되었습니다.', 'success');
    })
    .catch(() => {
      showToast('텍스트 복사에 실패했습니다.', 'info');
    });
}

// Share Quote link
function shareCurrentQuote() {
  if (!state.currentQuote) return;
  const quote = state.currentQuote;

  let shareUrl = '';
  if (typeof quote.id === 'number') {
    shareUrl = `${window.location.origin}${window.location.pathname}?id=${quote.id}`;
  } else {
    // Custom/dynamic quote
    shareUrl = `${window.location.origin}${window.location.pathname}?text=${encodeURIComponent(quote.text)}&author=${encodeURIComponent(quote.author)}`;
  }

  navigator.clipboard.writeText(shareUrl)
    .then(() => {
      showToast('공유 링크가 클립보드에 복사되었습니다.', 'success');
    })
    .catch(() => {
      showToast('링크 복사에 실패했습니다.', 'info');
    });
}

// Check if quote is in Favorites
function isFavorite(quote) {
  if (!quote) return false;
  return state.favorites.some(fav => fav.text === quote.text && fav.author === quote.author);
}

// Toggle Favorite Current
function toggleFavoriteCurrent() {
  if (!state.currentQuote) return;
  const quote = state.currentQuote;

  if (isFavorite(quote)) {
    // Remove
    state.favorites = state.favorites.filter(fav => !(fav.text === quote.text && fav.author === quote.author));
    showToast('보관함에서 제거되었습니다.', 'info');
  } else {
    // Add
    state.favorites.push(quote);
    showToast('보관함에 저장되었습니다.', 'success');
  }

  saveFavorites();
  displayQuote(quote); // Refresh button UI
}

// Load Favorites from LocalStorage
function loadFavorites() {
  const stored = localStorage.getItem('sasaek_favorites');
  if (stored) {
    try {
      state.favorites = JSON.parse(stored);
    } catch (e) {
      state.favorites = [];
    }
  }
}

// Save Favorites to LocalStorage
function saveFavorites() {
  localStorage.setItem('sasaek_favorites', JSON.stringify(state.favorites));
}

// Render Favorites Grid
function renderFavorites() {
  const grid = document.getElementById('saved-grid');
  if (!grid) return;

  grid.innerHTML = '';

  if (state.favorites.length === 0) {
    grid.innerHTML = `
      <div class="empty-archive">
        <i data-lucide="archive" class="empty-archive-icon" style="width: 3.5rem; height: 3.5rem;"></i>
        <h3>보관함이 비어 있습니다</h3>
        <p>명언 탐색 탭에서 마음에 드는 명언의 하트 아이콘을 눌러 저장해보세요.</p>
      </div>
    `;
    initLucideIcons();
    return;
  }

  state.favorites.forEach((quote, idx) => {
    const card = document.createElement('div');
    card.className = 'saved-card';

    card.innerHTML = `
      <div>
        <div class="saved-card-text">${escapeHtml(quote.text)}</div>
        <div class="saved-card-sub">${escapeHtml(quote.textEn || '')}</div>
      </div>
      <div class="saved-card-footer">
        <div class="saved-card-author">${escapeHtml(quote.author)}</div>
        <div class="saved-card-actions">
          <button class="saved-btn-icon speak-saved-btn" title="낭독" data-idx="${idx}">
            <i data-lucide="volume-2" style="width: 1.1rem; height: 1.1rem;"></i>
          </button>
          <button class="saved-btn-icon copy-saved-btn" title="복사" data-idx="${idx}">
            <i data-lucide="copy" style="width: 1.1rem; height: 1.1rem;"></i>
          </button>
          <button class="saved-btn-icon delete-btn" title="삭제" data-idx="${idx}">
            <i data-lucide="trash-2" style="width: 1.1rem; height: 1.1rem;"></i>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Favorites item listeners
  document.querySelectorAll('.speak-saved-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.idx;
      const quote = state.favorites[idx];
      speakText(quote.text, quote.author);
    });
  });

  document.querySelectorAll('.copy-saved-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.idx;
      const quote = state.favorites[idx];
      navigator.clipboard.writeText(`"${quote.text}"\n- ${quote.author}`);
      showToast('텍스트가 복사되었습니다.', 'success');
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      state.favorites.splice(idx, 1);
      saveFavorites();
      renderFavorites();
      showToast('보관함에서 삭제되었습니다.', 'info');
    });
  });

  initLucideIcons();
}

// Speak standalone text helper
function speakText(text, author) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return;
  }
  let speakStr = text;
  if (author) speakStr += `, - ${author}`;

  // Clear any stuck queue first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(speakStr);

  const voices = window.speechSynthesis.getVoices();
  const koVoice = voices.find(voice => voice.lang.includes('ko-KR'));
  if (koVoice) utterance.voice = koVoice;
  utterance.rate = 0.95;

  // Prevent garbage collection
  window.activeUtterances.push(utterance);

  utterance.onend = () => {
    window.activeUtterances = window.activeUtterances.filter(u => u !== utterance);
  };
  utterance.onerror = () => {
    window.activeUtterances = window.activeUtterances.filter(u => u !== utterance);
  };

  window.speechSynthesis.speak(utterance);
}

// Update Card Creator Preview
function updateCreatorPreview() {
  const cardPreview = document.getElementById('creator-preview-card');
  const textEl = document.getElementById('preview-quote-text');
  const authorEl = document.getElementById('preview-quote-author');

  if (!cardPreview || !textEl || !authorEl) return;

  // Apply inputs
  textEl.textContent = state.creator.text || "명언을 여기에 입력하세요.";
  authorEl.textContent = state.creator.author ? `- ${state.creator.author}` : "";

  // Apply Alignment
  textEl.style.textAlign = state.creator.textAlign;
  authorEl.style.textAlign = state.creator.textAlign;
  cardPreview.style.alignItems = state.creator.textAlign === 'left' ? 'flex-start' : (state.creator.textAlign === 'right' ? 'flex-end' : 'center');

  // Apply Fonts
  if (state.creator.fontFamily === 'serif') {
    textEl.style.fontFamily = 'var(--font-serif)';
  } else {
    textEl.style.fontFamily = 'var(--font-sans)';
  }

  // Apply padding & size
  textEl.style.fontSize = `${state.creator.fontSize}px`;
  cardPreview.style.padding = `${state.creator.padding}px`;

  // Apply Background Presets
  // Remove existing presets
  cardPreview.className = 'custom-card-wrapper';

  if (state.creator.bgType === 'gradient') {
    cardPreview.classList.add(state.creator.bgValue);
  }
}

// Custom Quote Card Export (PNG Canvas Renderer)
function exportCreatorCard() {
  showToast('이미지 제작 중...', 'info');

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const width = 1200;
  const height = width / (1.4);
  canvas.width = width;
  canvas.height = height;

  const scale = 1200 / document.getElementById('creator-preview-card').offsetWidth;
  const canvasPadding = state.creator.padding * scale;
  const canvasFontSize = state.creator.fontSize * scale;
  const canvasAuthorSize = 18 * scale;
  const canvasWatermarkSize = 13 * scale;

  // 1. Draw Background
  const preset = PRESET_GRADIENTS[state.creator.bgValue];
  if (preset && preset.colors) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (preset.colors.length === 1) {
      ctx.fillStyle = preset.colors[0];
      ctx.fillRect(0, 0, width, height);
    } else {
      const stopStep = 1 / (preset.colors.length - 1);
      preset.colors.forEach((col, i) => {
        grad.addColorStop(i * stopStep, col);
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }
  } else {
    ctx.fillStyle = '#12131e';
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Draw Quote Decor
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `italic 700 ${180 * scale}px ${state.creator.fontFamily === 'serif' ? 'Gowun Batang' : 'Outfit'}`;
  ctx.fillText('“', width / 2, height / 2.5);

  // 3. Draw Watermark
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = `500 ${canvasWatermarkSize}px Outfit, sans-serif`;
  ctx.textAlign = 'right';
  ctx.fillText('SASAEK / 사색', width - canvasPadding, height - (canvasPadding / 2));

  // 4. Draw Quote Text
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = state.creator.textAlign;
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${canvasFontSize}px ${state.creator.fontFamily === 'serif' ? 'Gowun Batang' : 'Outfit'}`;

  let textX = width / 2;
  if (state.creator.textAlign === 'left') {
    textX = canvasPadding;
  } else if (state.creator.textAlign === 'right') {
    textX = width - canvasPadding;
  }

  const maxTextWidth = width - (canvasPadding * 2);
  const textLineHeight = canvasFontSize * 1.5;
  const textY = height / 2 - 20;

  const nextY = wrapTextOnCanvas(ctx, state.creator.text, textX, textY, maxTextWidth, textLineHeight);

  // 5. Draw Author
  if (state.creator.author) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = `500 ${canvasAuthorSize}px ${state.creator.fontFamily === 'serif' ? 'Gowun Batang' : 'Outfit'}`;
    ctx.textAlign = state.creator.textAlign;

    let authorX = width / 2;
    if (state.creator.textAlign === 'left') {
      authorX = canvasPadding;
    } else if (state.creator.textAlign === 'right') {
      authorX = width - canvasPadding;
    }

    const authorY = nextY + (30 * scale);
    ctx.fillText(`- ${state.creator.author}`, authorX, authorY);
  }

  // 6. Download or Show Modal (Mobile Logic Added)
  try {
    canvas.toBlob((blob) => {
      if (!blob) {
        showToast('이미지 생성에 실패했습니다.', 'info');
        return;
      }
      const url = URL.createObjectURL(blob);

      // 모바일 기기 감지 (화면 너비가 768px 이하이거나 터치 기기일 경우)
      const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

      if (isMobile) {
        // 모바일: 커스텀 팝업(모달) 띄우기
        showMobileImageModal(url);
        showToast('이미지를 길게 눌러 갤러리에 저장하세요.', 'success');
      } else {
        // PC: 기존처럼 직접 다운로드
        const link = document.createElement('a');
        link.download = `sasaek-quote-${Date.now()}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
        showToast('이미지가 성공적으로 저장되었습니다.', 'success');
      }
    }, 'image/png');
  } catch (err) {
    showToast('이미지 처리 중 오류가 발생했습니다.', 'info');
    console.error(err);
  }
}

// Mobile Image Modal (New Function)
function showMobileImageModal(imageUrl) {
  // 이미 모달이 있다면 제거
  const existingModal = document.getElementById('mobile-image-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'mobile-image-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
  modal.style.zIndex = '9999';
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.padding = '20px';

  modal.innerHTML = `
    <p style="color: white; margin-bottom: 15px; text-align: center; font-weight: bold;">
      👇 아래 이미지를 길게 꾹 눌러서<br>'내 이미지에 저장' 또는 '다운로드'를 선택하세요.
    </p>
    <img src="${imageUrl}" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
    <button id="close-modal-btn" style="margin-top: 25px; padding: 10px 20px; background: white; color: black; border: none; border-radius: 20px; font-weight: bold; cursor: pointer;">
      닫기
    </button>
  `;

  document.body.appendChild(modal);

  // 닫기 버튼 이벤트
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.remove();
    setTimeout(() => URL.revokeObjectURL(imageUrl), 100); // 닫을 때 메모리 정리
  });
}

// Canvas Wrap Text Helper
function wrapTextOnCanvas(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Split word by character if it's longer than width
        let chars = word.split('');
        let temp = '';
        for (let j = 0; j < chars.length; j++) {
          if (ctx.measureText(temp + chars[j]).width > maxWidth) {
            lines.push(temp);
            temp = chars[j];
          } else {
            temp += chars[j];
          }
        }
        currentLine = temp;
      }
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  const totalHeight = lines.length * lineHeight;
  let startY = y - (totalHeight / 2) + (lineHeight / 2);

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, startY + (i * lineHeight));
  }

  return startY + (lines.length - 1) * lineHeight + (lineHeight / 2);
}

// UI Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast`;

  const icon = type === 'success' ? 'check-circle' : 'info';
  const iconClass = type === 'success' ? 'toast-success-icon' : 'toast-info-icon';

  toast.innerHTML = `
    <i data-lucide="${icon}" class="${iconClass}" style="width: 1.2rem; height: 1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  initLucideIcons();

  // Slide out after 3 seconds
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 2500);
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}