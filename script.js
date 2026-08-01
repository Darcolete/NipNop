// ELEMENTOS DO DOM
const authScreen = document.getElementById('auth-screen');
const appScreen = document.getElementById('app-screen');

const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');

const regUsernameInput = document.getElementById('reg-username');
const regPasswordInput = document.getElementById('reg-password');
const avatarFileInput = document.getElementById('avatar-file');

const currentUserAvatar = document.getElementById('current-user-avatar');
const currentUserName = document.getElementById('current-user-name');
const currentUserCoins = document.getElementById('current-user-coins');
const btnLogout = document.getElementById('btn-logout');

const sidebar = document.getElementById('sidebar');
const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');

const addFriendForm = document.getElementById('add-friend-form');
const friendNameInput = document.getElementById('friend-name');
const friendsList = document.getElementById('friends-list');

// NAVEGAÇÃO DE CONTEÚDO
const navFeed = document.getElementById('nav-feed');
const navChat = document.getElementById('nav-chat');
const navGames = document.getElementById('nav-games');
const navProfile = document.getElementById('nav-profile');
const navNewPost = document.getElementById('nav-new-post');
const navNotifications = document.getElementById('nav-notifications');

const viewFeed = document.getElementById('view-feed');
const viewChat = document.getElementById('view-chat');
const viewGames = document.getElementById('view-games');
const viewProfile = document.getElementById('view-profile');
const viewNewPost = document.getElementById('view-new-post');
const viewNotifications = document.getElementById('view-notifications');

// ABA GAMES - CENTRAL E SUBVISÕES
const subviewGamesHub = document.getElementById('subview-games-hub');
const subviewDraw = document.getElementById('subview-draw');
const subviewSnake = document.getElementById('subview-snake');
const cardGameDraw = document.getElementById('card-game-draw');
const cardGameSnake = document.getElementById('card-game-snake');
const btnBackHubDraw = document.getElementById('btn-back-hub-draw');
const btnBackHubSnake = document.getElementById('btn-back-hub-snake');

// COMPONENTES DE CHAT
const chatHeader = document.getElementById('chat-title');
const messagesContainer = document.getElementById('messages-container');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

// COMPONENTES DE PERFIL E POSTS
const myProfileBtn = document.getElementById('my-profile-btn');
const profileAvatarWrapper = document.getElementById('profile-avatar-wrapper');
const profileViewAvatar = document.getElementById('profile-view-avatar');
const btnChangeAvatar = document.getElementById('btn-change-avatar');
const changeAvatarInput = document.getElementById('change-avatar-input');

const profileHeader = document.querySelector('.profile-header');
const profileViewName = document.getElementById('profile-view-name');
const profileViewStats = document.getElementById('profile-view-stats');
const profileViewCoins = document.getElementById('profile-view-coins');
const postsContainer = document.getElementById('posts-container');
const feedPostsContainer = document.getElementById('feed-posts-container');
const createPostForm = document.getElementById('create-post-form');

const profileCustomizePanel = document.getElementById('profile-customize-panel');
const profileBgColorInput = document.getElementById('profile-bg-color');
const profileNameColorSelect = document.getElementById('profile-name-color');

// MODAL DE AMPLIAÇÃO DE IMAGEM
const imageModal = document.getElementById('image-modal');
const modalImageSrc = document.getElementById('modal-image-src');
const closeImageModal = document.getElementById('close-image-modal');

// ELEMENTOS LOUSA COOP
const canvas = document.getElementById('coop-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const btnToolPen = document.getElementById('btn-tool-pen');
const btnToolEraser = document.getElementById('btn-tool-eraser');
const drawColorInput = document.getElementById('draw-color');
const drawSizeInput = document.getElementById('draw-size');
const btnClearCanvas = document.getElementById('btn-clear-canvas');
const selectInviteFriend = document.getElementById('select-invite-friend');
const btnInviteFriend = document.getElementById('btn-invite-friend');
const btnKickUser = document.getElementById('btn-kick-user');

// ELEMENTOS SNAKE MULTIPLAYER, SINGLEPLAYER & BOTS
const snakeLobby = document.getElementById('snake-lobby');
const snakeGameScreen = document.getElementById('snake-game-screen');
const snakePlayersList = document.getElementById('snake-players-list');
const selectSnakeFriend = document.getElementById('select-snake-friend');
const btnInviteSnakeFriend = document.getElementById('btn-invite-snake-friend');
const btnStartSnakeGame = document.getElementById('btn-start-snake-game');
const btnStartSnakeSingleplayer = document.getElementById('btn-start-snake-singleplayer');
const snakeBotsCountSelect = document.getElementById('snake-bots-count');
const snakeBotsScores = document.getElementById('snake-bots-scores');
const snakeCanvas = document.getElementById('snake-canvas');
const snakeCtx = snakeCanvas ? snakeCanvas.getContext('2d') : null;
const snakeScoreP1 = document.getElementById('snake-score-p1');
const snakeScoreP2 = document.getElementById('snake-score-p2');

const notificationsList = document.getElementById('notifications-list');

// ESTADO DA APLICAÇÃO
let currentUser = null;
let activeFriend = null;
let profileViewUser = null; 
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=e6f4ea&color=2ea043&name=';

let isDrawing = false;
let currentTool = 'pen';

// ESTADO DO JOGO SNAKE
let isSnakeSingleplayer = false;
let snakeLobbyHost = null;
let snakeLobbyPlayers = [];
let snakeGameInterval = null;
const GRID_SIZE = 20;
const TILE_COUNT_X = 30; 
const TILE_COUNT_Y = 20; 

let p1Snake = [];
let p2Snake = [];
let p1Dir = { x: 1, y: 0 };
let p2Dir = { x: -1, y: 0 };
let p1Score = 0;
let p2Score = 0;
let fruit = { x: 15, y: 10 };
let p1Alive = true;
let p2Alive = true;

// ESTRUTURA PARA BOTS NO SNAKE
let bots = [];
const BOT_COLORS = ['#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'];

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  setupEventListeners();
  initCanvas();
});

function setupEventListeners() {
  tabLogin.addEventListener('click', () => switchAuthTab('login'));
  tabRegister.addEventListener('click', () => switchAuthTab('register'));

  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  btnLogout.addEventListener('click', handleLogout);
  btnToggleSidebar.addEventListener('click', toggleSidebar);

  const toggleButtons = document.querySelectorAll('.btn-toggle-password');
  toggleButtons.forEach(button => {
    button.addEventListener('click', togglePasswordVisibility);
  });

  addFriendForm.addEventListener('submit', handleAddFriend);
  chatForm.addEventListener('submit', handleSendMessage);

  navFeed.addEventListener('click', () => switchMainView('feed'));
  navChat.addEventListener('click', () => switchMainView('chat'));
  navGames.addEventListener('click', () => switchMainView('games'));
  navProfile.addEventListener('click', () => {
    profileViewUser = currentUser.name;
    switchMainView('profile');
  });
  navNewPost.addEventListener('click', () => switchMainView('new-post'));
  navNotifications.addEventListener('click', () => switchMainView('notifications'));

  if (cardGameDraw) cardGameDraw.addEventListener('click', () => openGame('draw'));
  if (cardGameSnake) cardGameSnake.addEventListener('click', () => openGame('snake'));
  if (btnBackHubDraw) btnBackHubDraw.addEventListener('click', () => openGame('hub'));
  if (btnBackHubSnake) btnBackHubSnake.addEventListener('click', () => openGame('hub'));

  myProfileBtn.addEventListener('click', (e) => {
    if (e.target === currentUserAvatar) {
      openImageModal(currentUserAvatar.src);
    } else {
      profileViewUser = currentUser.name;
      switchMainView('profile');
    }
  });

  btnChangeAvatar.addEventListener('click', () => changeAvatarInput.click());
  changeAvatarInput.addEventListener('change', handleAvatarUpload);

  profileBgColorInput.addEventListener('input', handleProfileCustomization);
  profileNameColorSelect.addEventListener('change', handleProfileCustomization);

  createPostForm.addEventListener('submit', handleCreatePost);

  closeImageModal.addEventListener('click', () => imageModal.classList.add('hidden'));

  // CONTROLES LOUSA COOP
  if (btnToolPen) btnToolPen.addEventListener('click', () => setTool('pen'));
  if (btnToolEraser) btnToolEraser.addEventListener('click', () => setTool('eraser'));
  if (btnClearCanvas) btnClearCanvas.addEventListener('click', clearCanvas);
  if (btnInviteFriend) btnInviteFriend.addEventListener('click', sendCoopInvite);

  // CONTROLES SNAKE
  if (btnInviteSnakeFriend) btnInviteSnakeFriend.addEventListener('click', sendSnakeInvite);
  if (btnStartSnakeGame) btnStartSnakeGame.addEventListener('click', () => startSnakeGame(false));
  if (btnStartSnakeSingleplayer) btnStartSnakeSingleplayer.addEventListener('click', () => startSnakeGame(true));

  // CONTROLES DE TECLADO (SUPORTE SETAS + W A S D)
  window.addEventListener('keydown', handleSnakeKeydown);

  setupMobileSnakeControls();
}

function switchAuthTab(tab) {
  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

function togglePasswordVisibility(e) {
  const targetId = e.target.getAttribute('data-target');
  const input = document.getElementById(targetId);
  if (input) {
    if (input.type === 'password') {
      input.type = 'text';
      e.target.textContent = '🙈';
    } else {
      input.type = 'password';
      e.target.textContent = '👁️';
    }
  }
}

function toggleSidebar() {
  sidebar.classList.toggle('collapsed');
  btnToggleSidebar.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
}

function checkSession() {
  const sessionUser = localStorage.getItem('nipnop_session');
  if (sessionUser) {
    currentUser = getUserData(sessionUser);
    if (currentUser) {
      showAppScreen();
      return;
    }
  }
  showAuthScreen();
}

function getUserData(username) {
  const users = JSON.parse(localStorage.getItem('nipnop_users') || '{}');
  return users[username] || null;
}

function updateUserData() {
  if (!currentUser) return;
  const users = JSON.parse(localStorage.getItem('nipnop_users') || '{}');
  users[currentUser.name] = currentUser;
  localStorage.setItem('nipnop_users', JSON.stringify(users));
  updateUIHeader();
}

function showAuthScreen() {
  authScreen.classList.remove('hidden');
  appScreen.classList.add('hidden');
}

function showAppScreen() {
  authScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
  profileViewUser = currentUser.name;
  updateUIHeader();
  renderFriendsList();
  switchMainView('feed');
  checkIncomingNotifications();
}

function updateUIHeader() {
  currentUserName.textContent = currentUser.name;
  currentUserCoins.textContent = currentUser.coins || 0;
  currentUserAvatar.src = currentUser.avatar || (DEFAULT_AVATAR + currentUser.name);
}

function handleLogin(e) {
  e.preventDefault();
  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value.trim();

  const user = getUserData(username);
  if (!user || user.password !== password) {
    alert('Usuário ou senha incorretos.');
    return;
  }

  currentUser = user;
  localStorage.setItem('nipnop_session', currentUser.name);
  showAppScreen();
}

function handleRegister(e) {
  e.preventDefault();
  const username = regUsernameInput.value.trim();
  const password = regPasswordInput.value.trim();
  const file = avatarFileInput.files[0];

  if (getUserData(username)) {
    alert('Este nome de usuário já existe.');
    return;
  }

  const saveNewUser = (avatarUrl) => {
    const newUser = {
      name: username,
      password: password,
      coins: 100,
      avatar: avatarUrl || (DEFAULT_AVATAR + username),
      friends: [],
      posts: [],
      bgColor: '#ffffff',
      nameColor: '#1f2937',
      ignoredNotifications: []
    };

    const users = JSON.parse(localStorage.getItem('nipnop_users') || '{}');
    users[username] = newUser;
    localStorage.setItem('nipnop_users', JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem('nipnop_session', currentUser.name);
    showAppScreen();
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => saveNewUser(event.target.result);
    reader.readAsDataURL(file);
  } else {
    saveNewUser(null);
  }
}

function handleLogout() {
  if (snakeGameInterval) clearInterval(snakeGameInterval);
  localStorage.removeItem('nipnop_session');
  currentUser = null;
  activeFriend = null;
  showAuthScreen();
}

function handleAddFriend(e) {
  e.preventDefault();
  const friendName = friendNameInput.value.trim();

  if (friendName === currentUser.name) {
    alert('Você não pode adicionar a si mesmo.');
    return;
  }

  const friendUser = getUserData(friendName);
  if (!friendUser) {
    alert('Usuário não encontrado.');
    return;
  }

  if (currentUser.friends.includes(friendName)) {
    alert('Este usuário já é seu amigo.');
    return;
  }

  currentUser.friends.push(friendName);
  updateUserData();

  if (!friendUser.friends.includes(currentUser.name)) {
    friendUser.friends.push(currentUser.name);
    const users = JSON.parse(localStorage.getItem('nipnop_users') || '{}');
    users[friendName] = friendUser;
    localStorage.setItem('nipnop_users', JSON.stringify(users));
  }

  friendNameInput.value = '';
  renderFriendsList();
}

function renderFriendsList() {
  friendsList.innerHTML = '';
  currentUser.friends.forEach(friendName => {
    const friendData = getUserData(friendName) || { avatar: DEFAULT_AVATAR + friendName };

    const li = document.createElement('li');
    li.className = 'friend-item';
    if (activeFriend === friendName) li.classList.add('active');

    li.innerHTML = `
      <img src="${friendData.avatar}" class="avatar-small alt="${friendName}">
      <span>${friendName}</span>
    `;

    li.addEventListener('click', () => {
      activeFriend = friendName;
      renderFriendsList();
      if (!viewChat.classList.contains('hidden')) {
        openChatWith(activeFriend);
      } else {
        profileViewUser = friendName;
        switchMainView('profile');
      }
    });

    friendsList.appendChild(li);
  });

  populateInviteDropdowns();
}

function switchMainView(viewName) {
  viewFeed.classList.add('hidden');
  viewChat.classList.add('hidden');
  viewGames.classList.add('hidden');
  viewProfile.classList.add('hidden');
  viewNewPost.classList.add('hidden');
  viewNotifications.classList.add('hidden');

  navFeed.classList.remove('active');
  navChat.classList.remove('active');
  navGames.classList.remove('active');
  navProfile.classList.remove('active');
  navNewPost.classList.remove('active');
  navNotifications.classList.remove('active');

  if (viewName === 'feed') {
    viewFeed.classList.remove('hidden');
    navFeed.classList.add('active');
    renderFeed();
  } else if (viewName === 'chat') {
    viewChat.classList.remove('hidden');
    navChat.classList.add('active');
    if (activeFriend) {
      openChatWith(activeFriend);
    } else if (currentUser.friends.length > 0) {
      activeFriend = currentUser.friends[0];
      renderFriendsList();
      openChatWith(activeFriend);
    } else {
      chatHeader.textContent = 'Adicione amigos para conversar';
      messagesContainer.innerHTML = '';
    }
  } else if (viewName === 'games') {
    viewGames.classList.remove('hidden');
    navGames.classList.add('active');
    openGame('hub');
  } else if (viewName === 'profile') {
    viewProfile.classList.remove('hidden');
    navProfile.classList.add('active');
    renderProfileView();
  } else if (viewName === 'new-post') {
    viewNewPost.classList.remove('hidden');
    navNewPost.classList.add('active');
  } else if (viewName === 'notifications') {
    viewNotifications.classList.remove('hidden');
    navNotifications.classList.add('active');
    renderNotifications();
  }
}

function openGame(subview) {
  subviewGamesHub.classList.add('hidden');
  subviewDraw.classList.add('hidden');
  subviewSnake.classList.add('hidden');

  if (snakeGameInterval) {
    clearInterval(snakeGameInterval);
    snakeGameInterval = null;
  }

  if (subview === 'hub') {
    subviewGamesHub.classList.remove('hidden');
  } else if (subview === 'draw') {
    subviewDraw.classList.remove('hidden');
  } else if (subview === 'snake') {
    subviewSnake.classList.remove('hidden');
    initSnakeLobby();
  }
}

// CHAT E MENSAGENS
function openChatWith(friendName) {
  chatHeader.textContent = `Chat com ${friendName}`;
  renderMessages();
}

function getChatKey(user1, user2) {
  return [user1, user2].sort().join('_chat_');
}

function renderMessages() {
  if (!activeFriend) return;
  const chatKey = getChatKey(currentUser.name, activeFriend);
  const messages = JSON.parse(localStorage.getItem(chatKey) || '[]');

  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.sender === currentUser.name ? 'sent' : 'received'}`;
    div.textContent = msg.text;
    messagesContainer.appendChild(div);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleSendMessage(e) {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text || !activeFriend) return;

  const chatKey = getChatKey(currentUser.name, activeFriend);
  const messages = JSON.parse(localStorage.getItem(chatKey) || '[]');

  messages.push({
    sender: currentUser.name,
    text: text,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem(chatKey, JSON.stringify(messages));
  messageInput.value = '';
  renderMessages();
}

// CÁLCULO DE LUMINÂNCIA E CONSTRASTE AUTOMÁTICO DE TEXTO NO PERFIL
function getContrastingTextColor(hexColor) {
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  
  // Fórmula padrão de percepção de luminância W3C
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'dark' : 'light';
}

// PERFIL E PERSONALIZAÇÃO
function renderProfileView() {
  const targetUser = getUserData(profileViewUser) || currentUser;
  const isOwnProfile = targetUser.name === currentUser.name;

  profileViewAvatar.src = targetUser.avatar || (DEFAULT_AVATAR + targetUser.name);
  profileViewName.textContent = targetUser.name;
  profileViewCoins.textContent = targetUser.coins || 0;
  profileViewStats.textContent = `Publicações: ${(targetUser.posts || []).length}`;

  const bgColor = targetUser.bgColor || '#ffffff';
  profileHeader.style.backgroundColor = bgColor;

  // LÓGICA DE ADAPTAÇÃO AUTOMÁTICA DA COLORACÃO DOS TEXTOS
  const themeMode = getContrastingTextColor(bgColor);
  if (themeMode === 'light') {
    profileHeader.style.color = '#ffffff';
    profileHeader.style.textShadow = '0 2px 4px rgba(0,0,0,0.6)';
    profileViewName.style.color = targetUser.nameColor && targetUser.nameColor !== '#1f2937' ? targetUser.nameColor : '#ffffff';
  } else {
    profileHeader.style.color = '#1f2937';
    profileHeader.style.textShadow = 'none';
    profileViewName.style.color = targetUser.nameColor || '#1f2937';
  }

  profileViewAvatar.onclick = () => openImageModal(profileViewAvatar.src);

  if (isOwnProfile) {
    btnChangeAvatar.classList.remove('hidden');
    profileCustomizePanel.classList.remove('hidden');
    profileBgColorInput.value = targetUser.bgColor || '#ffffff';
    profileNameColorSelect.value = targetUser.nameColor || '#1f2937';
  } else {
    btnChangeAvatar.classList.add('hidden');
    profileCustomizePanel.classList.add('hidden');
  }

  renderUserPosts(targetUser);
}

function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    currentUser.avatar = event.target.result;
    updateUserData();
    renderProfileView();
  };
  reader.readAsDataURL(file);
}

function handleProfileCustomization() {
  currentUser.bgColor = profileBgColorInput.value;
  currentUser.nameColor = profileNameColorSelect.value;
  updateUserData();
  renderProfileView();
}

function handleCreatePost(e) {
  e.preventDefault();
  const mediaInput = document.getElementById('post-media-file');
  const captionInput = document.getElementById('post-caption');
  const file = mediaInput.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const isVideo = file.type.startsWith('video/');
    const newPost = {
      id: Date.now(),
      author: currentUser.name,
      mediaUrl: event.target.result,
      isVideo: isVideo,
      caption: captionInput.value.trim(),
      timestamp: new Date().toLocaleDateString('pt-BR')
    };

    if (!currentUser.posts) currentUser.posts = [];
    currentUser.posts.unshift(newPost);
    updateUserData();

    mediaInput.value = '';
    captionInput.value = '';
    switchMainView('feed');
  };
  reader.readAsDataURL(file);
}

function renderUserPosts(user) {
  postsContainer.innerHTML = '';
  const posts = user.posts || [];

  if (posts.length === 0) {
    postsContainer.innerHTML = '<p style="color: var(--text-muted);">Nenhuma publicação ainda.</p>';
    return;
  }

  posts.forEach(post => {
    const card = createPostCard(post);
    postsContainer.appendChild(card);
  });
}

function renderFeed() {
  feedPostsContainer.innerHTML = '';
  const users = JSON.parse(localStorage.getItem('nipnop_users') || '{}');
  let allPosts = [];

  Object.values(users).forEach(u => {
    if (u.posts) {
      u.posts.forEach(p => {
        allPosts.push({ ...p, authorAvatar: u.avatar });
      });
    }
  });

  allPosts.sort((a, b) => b.id - a.id);

  if (allPosts.length === 0) {
    feedPostsContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Nenhuma publicação no feed.</p>';
    return;
  }

  allPosts.forEach(post => {
    const card = createPostCard(post);
    feedPostsContainer.appendChild(card);
  });
}

function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';

  const authorData = getUserData(post.author) || {};
  const avatarUrl = post.authorAvatar || authorData.avatar || (DEFAULT_AVATAR + post.author);

  let mediaHtml = '';
  if (post.isVideo) {
    mediaHtml = `<video src="${post.mediaUrl}" controls></video>`;
  } else {
    mediaHtml = `<img src="${post.mediaUrl}" alt="Mídia da publicação" class="clickable-media">`;
  }

  card.innerHTML = `
    <div class="post-header">
      <img src="${avatarUrl}" class="avatar-small" alt="${post.author}">
      <strong>${post.author}</strong>
    </div>
    <div class="post-media">${mediaHtml}</div>
    <div class="post-caption">
      <strong>${post.author}:</strong> ${post.caption}
    </div>
  `;

  const imgElem = card.querySelector('img.clickable-media');
  if (imgElem) {
    imgElem.addEventListener('click', () => openImageModal(post.mediaUrl));
  }

  return card;
}

function openImageModal(src) {
  modalImageSrc.src = src;
  imageModal.classList.remove('hidden');
}

// LOUSA COLABORATIVA
function initCanvas() {
  if (!canvas) return;

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchend', () => {
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  });
}

function setTool(tool) {
  currentTool = tool;
  if (tool === 'pen') {
    btnToolPen.classList.add('active');
    btnToolEraser.classList.remove('active');
  } else {
    btnToolEraser.classList.add('active');
    btnToolPen.classList.remove('active');
  }
}

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = drawSizeInput.value;
  ctx.lineCap = 'round';

  if (currentTool === 'eraser') {
    ctx.strokeStyle = '#ffffff';
  } else {
    ctx.strokeStyle = drawColorInput.value;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  if (ctx) ctx.beginPath();
}

function clearCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function populateInviteDropdowns() {
  if (selectInviteFriend) {
    selectInviteFriend.innerHTML = '<option value="">Selecione um amigo...</option>';
    currentUser.friends.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      selectInviteFriend.appendChild(opt);
    });
  }

  if (selectSnakeFriend) {
    selectSnakeFriend.innerHTML = '<option value="">Selecione um amigo...</option>';
    currentUser.friends.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      selectSnakeFriend.appendChild(opt);
    });
  }
}

function sendCoopInvite() {
  const friendName = selectInviteFriend.value;
  if (!friendName) return;

  sendNotification(friendName, {
    type: 'coop_invite',
    from: currentUser.name,
    message: `${currentUser.name} convidou você para desenhar na Lousa Coop!`
  });

  alert(`Convite enviado para ${friendName}!`);
}

// LÓGICA DO MULTIPLAYER E BOT DO SNAKE
function initSnakeLobby() {
  snakeLobbyHost = currentUser.name;
  snakeLobbyPlayers = [currentUser.name];
  snakeLobby.classList.remove('hidden');
  snakeGameScreen.classList.add('hidden');
  renderSnakeLobby();
}

function renderSnakeLobby() {
  snakePlayersList.innerHTML = '';
  snakeLobbyPlayers.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p + (p === snakeLobbyHost ? ' (Anfitrião)' : '');
    snakePlayersList.appendChild(li);
  });
}

function sendSnakeInvite() {
  const friendName = selectSnakeFriend.value;
  if (!friendName) return;

  if (snakeLobbyPlayers.length >= 2) {
    alert('O lobby do Snake já está cheio (máx. 2 jogadores).');
    return;
  }

  sendNotification(friendName, {
    type: 'snake_invite',
    from: currentUser.name,
    message: `${currentUser.name} convidou você para uma partida de Snake!`
  });

  alert(`Convite do Snake enviado para ${friendName}!`);
}

function startSnakeGame(singleplayer = false) {
  isSnakeSingleplayer = singleplayer;
  snakeLobby.classList.add('hidden');
  snakeGameScreen.classList.remove('hidden');

  p1Snake = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
  p1Dir = { x: 1, y: 0 };
  p1Score = 0;
  p1Alive = true;

  if (!isSnakeSingleplayer && snakeLobbyPlayers.length > 1) {
    p2Snake = [{ x: 24, y: 10 }, { x: 25, y: 10 }, { x: 26, y: 10 }];
    p2Dir = { x: -1, y: 0 };
    p2Score = 0;
    p2Alive = true;
  } else {
    p2Snake = [];
    p2Alive = false;
  }

  // INICIALIZA BOTS
  bots = [];
  const numBots = parseInt(snakeBotsCountSelect ? snakeBotsCountSelect.value : '0', 10);
  for (let i = 0; i < numBots; i++) {
    const startX = Math.floor(Math.random() * (TILE_COUNT_X - 10)) + 5;
    const startY = Math.floor(Math.random() * (TILE_COUNT_Y - 10)) + 5;
    bots.push({
      id: i + 1,
      name: `Bot ${i + 1}`,
      color: BOT_COLORS[i % BOT_COLORS.length],
      snake: [{ x: startX, y: startY }, { x: startX - 1, y: startY }],
      dir: { x: 1, y: 0 },
      score: 0,
      alive: true
    });
  }

  spawnFruit();
  updateSnakeScoreUI();

  if (snakeGameInterval) clearInterval(snakeGameInterval);
  snakeGameInterval = setInterval(gameLoopSnake, 100);
}

// SUPORTE AO TECLADO: SETAS E W A S D
function handleSnakeKeydown(e) {
  if (snakeGameScreen.classList.contains('hidden')) return;

  // JOGADOR 1: SETAS E W A S D
  if (p1Alive) {
    if ((e.code === 'ArrowUp' || e.code === 'KeyW') && p1Dir.y === 0) {
      p1Dir = { x: 0, y: -1 };
    } else if ((e.code === 'ArrowDown' || e.code === 'KeyS') && p1Dir.y === 0) {
      p1Dir = { x: 0, y: 1 };
    } else if ((e.code === 'ArrowLeft' || e.code === 'KeyA') && p1Dir.x === 0) {
      p1Dir = { x: -1, y: 0 };
    } else if ((e.code === 'ArrowRight' || e.code === 'KeyD') && p1Dir.x === 0) {
      p1Dir = { x: 1, y: 0 };
    }
  }

  // JOGADOR 2: TECLAS I K J L
  if (p2Alive && !isSnakeSingleplayer) {
    if (e.code === 'KeyI' && p2Dir.y === 0) {
      p2Dir = { x: 0, y: -1 };
    } else if (e.code === 'KeyK' && p2Dir.y === 0) {
      p2Dir = { x: 0, y: 1 };
    } else if (e.code === 'KeyJ' && p2Dir.x === 0) {
      p2Dir = { x: -1, y: 0 };
    } else if (e.code === 'KeyL' && p2Dir.x === 0) {
      p2Dir = { x: 1, y: 0 };
    }
  }
}

function setupMobileSnakeControls() {
  const btnUp = document.getElementById('snake-btn-up');
  const btnDown = document.getElementById('snake-btn-down');
  const btnLeft = document.getElementById('snake-btn-left');
  const btnRight = document.getElementById('snake-btn-right');

  if (btnUp) btnUp.addEventListener('click', () => { if (p1Alive && p1Dir.y === 0) p1Dir = { x: 0, y: -1 }; });
  if (btnDown) btnDown.addEventListener('click', () => { if (p1Alive && p1Dir.y === 0) p1Dir = { x: 0, y: 1 }; });
  if (btnLeft) btnLeft.addEventListener('click', () => { if (p1Alive && p1Dir.x === 0) p1Dir = { x: -1, y: 0 }; });
  if (btnRight) btnRight.addEventListener('click', () => { if (p1Alive && p1Dir.x === 0) p1Dir = { x: 1, y: 0 }; });
}

function spawnFruit() {
  fruit = {
    x: Math.floor(Math.random() * TILE_COUNT_X),
    y: Math.floor(Math.random() * TILE_COUNT_Y)
  };
}

function gameLoopSnake() {
  updateSnakeGame();
  drawSnakeGame();
}

function updateSnakeGame() {
  // ATUALIZA JOGADOR 1
  if (p1Alive) {
    const head = { x: p1Snake[0].x + p1Dir.x, y: p1Snake[0].y + p1Dir.y };

    if (head.x < 0 || head.x >= TILE_COUNT_X || head.y < 0 || head.y >= TILE_COUNT_Y) {
      p1Alive = false;
    } else {
      p1Snake.unshift(head);
      if (head.x === fruit.x && head.y === fruit.y) {
        p1Score++;
        currentUser.coins = (currentUser.coins || 0) + 10;
        updateUserData();
        updateSnakeScoreUI();
        spawnFruit();
      } else {
        p1Snake.pop();
      }
    }
  }

  // ATUALIZA JOGADOR 2
  if (p2Alive && !isSnakeSingleplayer) {
    const head = { x: p2Snake[0].x + p2Dir.x, y: p2Snake[0].y + p2Dir.y };

    if (head.x < 0 || head.x >= TILE_COUNT_X || head.y < 0 || head.y >= TILE_COUNT_Y) {
      p2Alive = false;
    } else {
      p2Snake.unshift(head);
      if (head.x === fruit.x && head.y === fruit.y) {
        p2Score++;
        updateSnakeScoreUI();
        spawnFruit();
      } else {
        p2Snake.pop();
      }
    }
  }

  // ATUALIZA BOTS COM IA BÁSICA
  bots.forEach(bot => {
    if (!bot.alive) return;

    const head = bot.snake[0];
    let possibleDirs = [
      { x: 1, y: 0 }, { x: -1, y: 0 },
      { x: 0, y: 1 }, { x: 0, y: -1 }
    ].filter(d => !(d.x === -bot.dir.x && d.y === -bot.dir.y));

    let bestDir = bot.dir;
    let minDist = Infinity;

    possibleDirs.forEach(d => {
      const nextX = head.x + d.x;
      const nextY = head.y + d.y;
      if (nextX >= 0 && nextX < TILE_COUNT_X && nextY >= 0 && nextY < TILE_COUNT_Y) {
        const dist = Math.abs(nextX - fruit.x) + Math.abs(nextY - fruit.y);
        if (dist < minDist) {
          minDist = dist;
          bestDir = d;
        }
      }
    });

    bot.dir = bestDir;
    const newHead = { x: head.x + bot.dir.x, y: head.y + bot.dir.y };

    if (newHead.x < 0 || newHead.x >= TILE_COUNT_X || newHead.y < 0 || newHead.y >= TILE_COUNT_Y) {
      bot.alive = false;
    } else {
      bot.snake.unshift(newHead);
      if (newHead.x === fruit.x && newHead.y === fruit.y) {
        bot.score++;
        updateSnakeScoreUI();
        spawnFruit();
      } else {
        bot.snake.pop();
      }
    }
  });

  // CONDIÇÕES DE TÉRMINO DE JOGO
  const anyBotAlive = bots.some(b => b.alive);
  if (!p1Alive && (!p2Alive || isSnakeSingleplayer) && !anyBotAlive) {
    clearInterval(snakeGameInterval);
    alert('Fim de jogo! Pontuação final de ' + currentUser.name + ': ' + p1Score);
  }
}

function updateSnakeScoreUI() {
  const p1Name = currentUser ? currentUser.name : 'P1';
  snakeScoreP1.textContent = `${p1Name}: ${p1Score} Frutas (+${p1Score * 10} Moedas)`;

  if (!isSnakeSingleplayer && snakeLobbyPlayers.length > 1) {
    const p2Name = snakeLobbyPlayers[1] || 'P2';
    snakeScoreP2.textContent = `${p2Name}: ${p2Score} Frutas`;
    snakeScoreP2.style.display = 'inline';
  } else {
    snakeScoreP2.style.display = 'none';
  }

  if (snakeBotsScores) {
    snakeBotsScores.innerHTML = bots
      .map(b => `<span style="color:${b.color}">${b.name}: ${b.score}</span>`)
      .join(' | ');
  }
}

function drawSnakeGame() {
  if (!snakeCtx) return;

  snakeCtx.fillStyle = '#111827';
  snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  snakeCtx.fillStyle = '#ef4444';
  snakeCtx.beginPath();
  snakeCtx.arc(
    fruit.x * GRID_SIZE + GRID_SIZE / 2,
    fruit.y * GRID_SIZE + GRID_SIZE / 2,
    GRID_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  snakeCtx.fill();

  if (p1Alive) {
    snakeCtx.fillStyle = '#2ea043';
    p1Snake.forEach(seg => {
      snakeCtx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });
  }

  if (p2Alive && !isSnakeSingleplayer) {
    snakeCtx.fillStyle = '#3b82f6';
    p2Snake.forEach(seg => {
      snakeCtx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });
  }

  bots.forEach(bot => {
    if (bot.alive) {
      snakeCtx.fillStyle = bot.color;
      bot.snake.forEach(seg => {
        snakeCtx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      });
    }
  });
}

// NOTIFICAÇÕES TOAST
function sendNotification(targetUsername, notifData) {
  const users = JSON.parse(localStorage.getItem('nipnop_users') || '{}');
  if (!users[targetUsername]) return;

  if (!users[targetUsername].notifications) {
    users[targetUsername].notifications = [];
  }

  users[targetUsername].notifications.push(notifData);
  localStorage.setItem('nipnop_users', JSON.stringify(users));
}

function checkIncomingNotifications() {
  if (!currentUser || !currentUser.notifications) return;

  while (currentUser.notifications.length > 0) {
    const notif = currentUser.notifications.shift();
    showToastNotification(notif);
  }

  updateUserData();
}

function showToastNotification(notif) {
  const toastContainer = document.getElementById('toast-notifications');
  const toast = document.createElement('div');
  toast.className = 'toast-invite';

  toast.innerHTML = `
    <strong>${notif.message}</strong>
    <div class="toast-buttons">
      <button class="btn-primary btn-accept">Aceitar</button>
      <button class="btn-secondary btn-ignore">Ignorar</button>
    </div>
  `;

  const btnAccept = toast.querySelector('.btn-accept');
  const btnIgnore = toast.querySelector('.btn-ignore');

  btnAccept.addEventListener('click', () => {
    toast.remove();
    if (notif.type === 'coop_invite') {
      switchMainView('games');
      openGame('draw');
    } else if (notif.type === 'snake_invite') {
      switchMainView('games');
      openGame('snake');
      if (!snakeLobbyPlayers.includes(currentUser.name)) {
        snakeLobbyPlayers.push(currentUser.name);
      }
      renderSnakeLobby();
    }
  });

  btnIgnore.addEventListener('click', () => {
    toast.remove();
    if (!currentUser.ignoredNotifications) currentUser.ignoredNotifications = [];
    currentUser.ignoredNotifications.push(notif.message);
    updateUserData();
  });

  toastContainer.appendChild(toast);
}

function renderNotifications() {
  notificationsList.innerHTML = '';
  const ignored = currentUser.ignoredNotifications || [];

  if (ignored.length === 0) {
    notificationsList.innerHTML = '<li style="color: var(--text-muted);">Nenhuma notificação ignorada.</li>';
    return;
  }

  ignored.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = msg;
    notificationsList.appendChild(li);
  });
}