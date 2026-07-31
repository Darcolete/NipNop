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

// ABA GAMES - SUBVISÕES
const tabGameDraw = document.getElementById('tab-game-draw');
const tabGameSnake = document.getElementById('tab-game-snake');
const subviewDraw = document.getElementById('subview-draw');
const subviewSnake = document.getElementById('subview-snake');

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
const drawOpacityInput = document.getElementById('draw-opacity');
const drawCapSelect = document.getElementById('draw-cap');
const btnClearCanvas = document.getElementById('btn-clear-canvas');
const selectInviteFriend = document.getElementById('select-invite-friend');
const btnInviteFriend = document.getElementById('btn-invite-friend');
const btnKickUser = document.getElementById('btn-kick-user');

// ELEMENTOS SNAKE MULTIPLAYER
const snakeLobby = document.getElementById('snake-lobby');
const snakeGameScreen = document.getElementById('snake-game-screen');
const snakePlayersList = document.getElementById('snake-players-list');
const selectSnakeFriend = document.getElementById('select-snake-friend');
const btnInviteSnakeFriend = document.getElementById('btn-invite-snake-friend');
const btnStartSnakeGame = document.getElementById('btn-start-snake-game');
const snakeCanvas = document.getElementById('snake-canvas');
const snakeCtx = snakeCanvas ? snakeCanvas.getContext('2d') : null;
const snakeScoreP1 = document.getElementById('snake-score-p1');
const snakeScoreP2 = document.getElementById('snake-score-p2');

const toastNotifications = document.getElementById('toast-notifications');
const notificationsList = document.getElementById('notifications-list');

// ESTADO DA APLICAÇÃO
let currentUser = null;
let activeFriend = null;
let profileViewUser = null; 
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=e6f4ea&color=2ea043&name=';

let isDrawing = false;
let currentTool = 'pen';

// ESTADO DO JOGO SNAKE
let snakeLobbyHost = null;
let snakeLobbyPlayers = [];
let snakeGameInterval = null;
const GRID_SIZE = 20;
const TILE_COUNT_X = 30; // 600 / 20
const TILE_COUNT_Y = 20; // 400 / 20

let p1Snake = [];
let p2Snake = [];
let p1Dir = { x: 1, y: 0 };
let p2Dir = { x: -1, y: 0 };
let p1Score = 0;
let p2Score = 0;
let fruit = { x: 15, y: 10 };
let p1Alive = true;
let p2Alive = true;

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

  // Sub-abas do Hub de Games
  tabGameDraw.addEventListener('click', () => switchGameSubview('draw'));
  tabGameSnake.addEventListener('click', () => switchGameSubview('snake'));

  // Clique na Sidebar
  myProfileBtn.addEventListener('click', (e) => {
    if (e.target === currentUserAvatar) {
      openImageModal(currentUserAvatar.src);
    } else {
      profileViewUser = currentUser.name;
      switchMainView('profile');
    }
  });

  profileViewAvatar.addEventListener('click', () => {
    if (profileViewAvatar.src) {
      openImageModal(profileViewAvatar.src);
    }
  });

  btnChangeAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    changeAvatarInput.click();
  });

  changeAvatarInput.addEventListener('change', handleAvatarChange);

  profileBgColorInput.addEventListener('input', handleColorChange);
  profileNameColorSelect.addEventListener('change', handleColorChange);

  closeImageModal.addEventListener('click', () => imageModal.classList.add('hidden'));
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.classList.add('hidden');
    }
  });

  createPostForm.addEventListener('submit', handleCreatePost);

  // Eventos do Canvas Coop
  if (canvas) {
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
  }

  btnToolPen.addEventListener('click', () => setTool('pen'));
  btnToolEraser.addEventListener('click', () => setTool('eraser'));
  btnClearCanvas.addEventListener('click', clearCanvas);
  btnInviteFriend.addEventListener('click', sendCoopInvite);
  btnKickUser.addEventListener('click', kickCoopUser);

  // Snake Events
  btnInviteSnakeFriend.addEventListener('click', sendSnakeInvite);
  btnStartSnakeGame.addEventListener('click', startSnakeGame);

  window.addEventListener('keydown', handleSnakeInput);
  
  document.getElementById('btn-snake-up').addEventListener('click', () => setP1Direction(0, -1));
  document.getElementById('btn-snake-down').addEventListener('click', () => setP1Direction(0, 1));
  document.getElementById('btn-snake-left').addEventListener('click', () => setP1Direction(-1, 0));
  document.getElementById('btn-snake-right').addEventListener('click', () => setP1Direction(1, 0));
}

function toggleSidebar() {
  sidebar.classList.toggle('collapsed');
  btnToggleSidebar.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
}

function openImageModal(imgSrc) {
  if (!imgSrc) return;
  modalImageSrc.src = imgSrc;
  imageModal.classList.remove('hidden');
}

function togglePasswordVisibility(e) {
  const button = e.currentTarget;
  const targetId = button.getAttribute('data-target');
  const input = document.getElementById(targetId);

  if (input.type === 'password') {
    input.type = 'text';
    button.textContent = '🙈';
  } else {
    input.type = 'password';
    button.textContent = '👁️';
  }
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

function switchMainView(view) {
  navFeed.classList.remove('active');
  navChat.classList.remove('active');
  navGames.classList.remove('active');
  navProfile.classList.remove('active');
  navNewPost.classList.remove('active');
  navNotifications.classList.remove('active');

  viewFeed.classList.add('hidden');
  viewChat.classList.add('hidden');
  viewGames.classList.add('hidden');
  viewProfile.classList.add('hidden');
  viewNewPost.classList.add('hidden');
  viewNotifications.classList.add('hidden');

  if (view === 'feed') {
    navFeed.classList.add('active');
    viewFeed.classList.remove('hidden');
    renderFeedView();
  } else if (view === 'chat') {
    navChat.classList.add('active');
    viewChat.classList.remove('hidden');
  } else if (view === 'games') {
    navGames.classList.add('active');
    viewGames.classList.remove('hidden');
    switchGameSubview('draw');
  } else if (view === 'profile') {
    navProfile.classList.add('active');
    viewProfile.classList.remove('hidden');
    renderProfileView();
  } else if (view === 'new-post') {
    navNewPost.classList.add('active');
    viewNewPost.classList.remove('hidden');
  } else if (view === 'notifications') {
    navNotifications.classList.add('active');
    viewNotifications.classList.remove('hidden');
    renderNotifications();
  }
}

function switchGameSubview(sub) {
  tabGameDraw.classList.remove('active');
  tabGameSnake.classList.remove('active');
  subviewDraw.classList.add('hidden');
  subviewSnake.classList.add('hidden');

  if (sub === 'draw') {
    tabGameDraw.classList.add('active');
    subviewDraw.classList.remove('hidden');
    populateInviteDropdown();
  } else if (sub === 'snake') {
    tabGameSnake.classList.add('active');
    subviewSnake.classList.remove('hidden');
    setupSnakeLobby();
  }
}

function checkSession() {
  const savedUser = localStorage.getItem('nipnop_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    if (currentUser.coins === undefined) currentUser.coins = 0;
    showAppScreen();
  } else {
    showAuthScreen();
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

async function handleAvatarChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const newAvatar = await fileToBase64(file);
    currentUser.avatar = newAvatar;
    
    updateUserData();

    currentUserAvatar.src = currentUser.avatar;
    profileViewAvatar.src = currentUser.avatar;

    renderFriends();
    renderProfileView();

    alert('Foto de perfil alterada com sucesso!');
  } catch (error) {
    alert('Erro ao carregar a nova foto de perfil.');
  } finally {
    changeAvatarInput.value = '';
  }
}

function handleColorChange() {
  if (profileViewUser !== currentUser.name) return;

  currentUser.profileBg = profileBgColorInput.value;
  currentUser.nameColor = profileNameColorSelect.value;

  updateUserData();
  renderProfileView();
}

async function handleRegister(e) {
  e.preventDefault();
  const name = regUsernameInput.value.trim().toLowerCase();
  const password = regPasswordInput.value.trim();
  const avatarFile = avatarFileInput.files[0];

  if (!name || !password) return;

  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};

  if (users[name]) {
    alert('Este nome de usuário já existe! Escolha outro.');
    return;
  }

  let avatar = `${DEFAULT_AVATAR}${encodeURIComponent(name)}`;
  if (avatarFile) {
    try {
      avatar = await fileToBase64(avatarFile);
    } catch (err) {
      alert('Erro ao carregar a imagem de perfil.');
    }
  }

  currentUser = { 
    name, 
    password, 
    avatar, 
    friends: [],
    coins: 0,
    profileBg: '#f4f7f5', 
    nameColor: '#000000',
    notifications: []
  };
  users[name] = currentUser;

  localStorage.setItem('nipnop_db_users', JSON.stringify(users));
  localStorage.setItem('nipnop_user', JSON.stringify(currentUser));

  alert('Conta criada com sucesso!');
  showAppScreen();
}

function handleLogin(e) {
  e.preventDefault();
  const name = loginUsernameInput.value.trim().toLowerCase();
  const password = loginPasswordInput.value.trim();

  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};

  if (!users[name]) {
    alert('Usuário não encontrado!');
    return;
  }

  if (users[name].password !== password) {
    alert('Senha incorreta!');
    return;
  }

  currentUser = users[name];
  if (!currentUser.notifications) currentUser.notifications = [];
  if (currentUser.coins === undefined) currentUser.coins = 0;
  
  localStorage.setItem('nipnop_user', JSON.stringify(currentUser));
  showAppScreen();
}

function handleLogout() {
  localStorage.removeItem('nipnop_user');
  currentUser = null;
  activeFriend = null;
  profileViewUser = null;
  showAuthScreen();
}

function showAuthScreen() {
  authScreen.classList.remove('hidden');
  appScreen.classList.add('hidden');
}

function showAppScreen() {
  authScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
  
  currentUserName.textContent = currentUser.name;
  currentUserAvatar.src = currentUser.avatar;
  currentUserCoins.textContent = currentUser.coins || 0;

  profileViewUser = currentUser.name;
  renderFriends();
  switchMainView('feed');
  checkIncomingInvites();
}

function handleAddFriend(e) {
  e.preventDefault();
  const friendName = friendNameInput.value.trim().toLowerCase();

  if (!friendName || friendName === currentUser.name) {
    alert('Nome de amigo inválido.');
    return;
  }

  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};

  if (!users[friendName]) {
    alert('Este usuário não está cadastrado no NipNop.');
    return;
  }

  if (currentUser.friends.includes(friendName)) {
    alert('Este usuário já é seu amigo!');
    return;
  }

  currentUser.friends.push(friendName);
  updateUserData();
  renderFriends();
  friendNameInput.value = '';
}

function renderFriends() {
  friendsList.innerHTML = '';
  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};

  currentUser.friends.forEach(friend => {
    const li = document.createElement('li');
    li.className = `friend-item ${activeFriend === friend ? 'active' : ''}`;
    
    const friendData = users[friend];
    const friendAvatar = friendData ? friendData.avatar : `${DEFAULT_AVATAR}${encodeURIComponent(friend)}`;

    li.innerHTML = `
      <div class="friend-info">
        <img src="${friendAvatar}" alt="${friend}">
        <span>${friend}</span>
      </div>
      <button class="btn-profile-view" title="Ver perfil de ${friend}">👤</button>
    `;

    li.querySelector('.friend-info').addEventListener('click', () => selectFriend(friend));
    li.querySelector('.btn-profile-view').addEventListener('click', (e) => {
      e.stopPropagation();
      openUserProfile(friend);
    });

    friendsList.appendChild(li);
  });
}

function selectFriend(friendName) {
  activeFriend = friendName;
  chatHeader.textContent = `Conversa com ${friendName}`;
  chatForm.classList.remove('hidden');
  renderFriends();
  renderMessages();
  switchMainView('chat');
}

function openUserProfile(username) {
  profileViewUser = username;
  switchMainView('profile');
}

function getChatKey() {
  if (!currentUser || !activeFriend) return null;
  const ids = [currentUser.name, activeFriend].sort();
  return `nipnop_chat_${ids[0]}_${ids[1]}`;
}

function handleSendMessage(e) {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text || !activeFriend) return;

  const chatKey = getChatKey();
  const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

  const newMessage = {
    sender: currentUser.name,
    text: text,
    timestamp: new Date().getTime()
  };

  messages.push(newMessage);
  localStorage.setItem(chatKey, JSON.stringify(messages));

  messageInput.value = '';
  renderMessages();
}

function renderMessages() {
  messagesContainer.innerHTML = '';
  const chatKey = getChatKey();
  if (!chatKey) return;

  const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    const isSent = msg.sender === currentUser.name;

    msgDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    msgDiv.textContent = msg.text;

    messagesContainer.appendChild(msgDiv);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// FEED INICIAL
function renderFeedView() {
  const allPosts = JSON.parse(localStorage.getItem('nipnop_posts')) || [];
  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};

  feedPostsContainer.innerHTML = '';

  if (allPosts.length === 0) {
    feedPostsContainer.innerHTML = `<p style="color: var(--text-muted); margin-top: 2rem;">Nenhuma publicação encontrada no feed.</p>`;
    return;
  }

  allPosts.forEach(post => {
    const userData = users[post.author] || {
      name: post.author,
      avatar: `${DEFAULT_AVATAR}${encodeURIComponent(post.author)}`
    };
    renderSinglePost(post, userData, feedPostsContainer);
  });
}

async function handleCreatePost(e) {
  e.preventDefault();
  const mediaFileInput = document.getElementById('post-media-file');
  const file = mediaFileInput.files[0];
  const caption = document.getElementById('post-caption').value.trim();

  if (!file) return;

  try {
    const mediaUrl = await fileToBase64(file);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';

    const posts = JSON.parse(localStorage.getItem('nipnop_posts')) || [];

    const newPost = {
      id: 'post_' + Date.now(),
      author: currentUser.name,
      type: mediaType,
      mediaUrl: mediaUrl,
      caption: caption,
      likes: [],
      comments: [],
      createdAt: new Date().getTime()
    };

    posts.unshift(newPost);
    localStorage.setItem('nipnop_posts', JSON.stringify(posts));

    mediaFileInput.value = '';
    document.getElementById('post-caption').value = '';

    alert('Publicação criada com sucesso!');
    switchMainView('feed');
  } catch (error) {
    alert('Erro ao carregar o arquivo da publicação.');
  }
}

function getContrastingStrokeColor(hexColor) {
  if (!hexColor || hexColor.charAt(0) !== '#') return '#ffffff';
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

function renderProfileView() {
  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};
  const userData = users[profileViewUser] || {
    name: profileViewUser,
    avatar: `${DEFAULT_AVATAR}${encodeURIComponent(profileViewUser)}`,
    profileBg: '#f4f7f5',
    nameColor: '#000000',
    coins: 0
  };

  const isOwnProfile = profileViewUser === currentUser.name;

  const bgColor = userData.profileBg || '#f4f7f5';
  const nameColor = userData.nameColor || '#000000';
  const strokeColor = getContrastingStrokeColor(nameColor);

  viewProfile.style.backgroundColor = bgColor;
  profileViewAvatar.src = userData.avatar;
  profileViewName.textContent = userData.name;
  profileViewName.style.color = nameColor;
  profileViewName.style.webkitTextStroke = `0.5px ${strokeColor}`;
  profileViewCoins.textContent = userData.coins || 0;

  if (isOwnProfile) {
    btnChangeAvatar.classList.remove('hidden');
    profileCustomizePanel.classList.remove('hidden');
    profileBgColorInput.value = bgColor;
    profileNameColorSelect.value = nameColor;
  } else {
    btnChangeAvatar.classList.add('hidden');
    profileCustomizePanel.classList.add('hidden');
  }

  const allPosts = JSON.parse(localStorage.getItem('nipnop_posts')) || [];
  const userPosts = allPosts.filter(post => post.author === profileViewUser);

  profileViewStats.textContent = `${userPosts.length} Publicação${userPosts.length !== 1 ? 'ões' : ''}`;

  postsContainer.innerHTML = '';

  if (userPosts.length === 0) {
    postsContainer.innerHTML = `<p style="color: var(--text-muted); margin-top: 2rem;">Nenhuma publicação para exibir.</p>`;
    return;
  }

  userPosts.forEach(post => {
    renderSinglePost(post, userData, postsContainer);
  });
}

function renderSinglePost(post, userData, container) {
  const postCard = document.createElement('div');
  postCard.className = 'post-card outlined-element';

  const isLiked = post.likes.includes(currentUser.name);

  let mediaHTML = post.type === 'video'
    ? `<video src="${post.mediaUrl}" controls class="post-media"></video>`
    : `<img src="${post.mediaUrl}" alt="Post" class="post-media">`;

  let commentsHTML = post.comments.map(c => `
    <li><strong>${c.author}:</strong> ${c.text}</li>
  `).join('');

  postCard.innerHTML = `
    <div class="post-header">
      <img src="${userData.avatar}" alt="${userData.name}">
      <span>${userData.name}</span>
    </div>
    ${mediaHTML}
    ${post.caption ? `<div class="post-caption"><strong>${userData.name}</strong> ${post.caption}</div>` : ''}
    <div class="post-actions">
      <button class="btn-like ${isLiked ? 'liked' : ''}" data-post-id="${post.id}">
        ${isLiked ? '❤️' : '🤍'} <span>${post.likes.length}</span>
      </button>
    </div>
    <div class="post-comments">
      <ul class="comments-list">${commentsHTML}</ul>
      <form class="comment-form" data-post-id="${post.id}">
        <input type="text" placeholder="Adicione um comentário..." required>
        <button type="submit" class="btn-primary">Enviar</button>
      </form>
    </div>
  `;

  const postImg = postCard.querySelector('img.post-media');
  if (postImg) {
    postImg.style.cursor = 'pointer';
    postImg.addEventListener('click', () => openImageModal(post.mediaUrl));
  }

  postCard.querySelector('.btn-like').addEventListener('click', () => toggleLikePost(post.id));

  postCard.querySelector('.comment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const text = input.value.trim();
    if (text) {
      addCommentToPost(post.id, text);
    }
  });

  container.appendChild(postCard);
}

function toggleLikePost(postId) {
  let posts = JSON.parse(localStorage.getItem('nipnop_posts')) || [];
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex !== -1) {
    const likes = posts[postIndex].likes;
    const userIndex = likes.indexOf(currentUser.name);

    if (userIndex === -1) {
      likes.push(currentUser.name);
    } else {
      likes.splice(userIndex, 1);
    }

    localStorage.setItem('nipnop_posts', JSON.stringify(posts));
    if (!viewFeed.classList.contains('hidden')) renderFeedView();
    if (!viewProfile.classList.contains('hidden')) renderProfileView();
  }
}

function addCommentToPost(postId, text) {
  let posts = JSON.parse(localStorage.getItem('nipnop_posts')) || [];
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex !== -1) {
    posts[postIndex].comments.push({
      author: currentUser.name,
      text: text,
      timestamp: new Date().getTime()
    });

    localStorage.setItem('nipnop_posts', JSON.stringify(posts));
    if (!viewFeed.classList.contains('hidden')) renderFeedView();
    if (!viewProfile.classList.contains('hidden')) renderProfileView();
  }
}

function updateUserData() {
  currentUserCoins.textContent = currentUser.coins || 0;
  localStorage.setItem('nipnop_user', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};
  users[currentUser.name] = currentUser;
  localStorage.setItem('nipnop_db_users', JSON.stringify(users));
}

// LOUSA COLLABORATIVE (CANVAS)
function initCanvas() {
  if (!ctx) return;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
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

function stopDrawing() {
  isDrawing = false;
  if (ctx) ctx.beginPath();
}

function draw(e) {
  if (!isDrawing || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = drawSizeInput.value;
  ctx.lineCap = drawCapSelect.value;

  if (currentTool === 'eraser') {
    ctx.strokeStyle = '#ffffff';
    ctx.globalAlpha = 1.0;
  } else {
    ctx.strokeStyle = drawColorInput.value;
    ctx.globalAlpha = parseFloat(drawOpacityInput.value);
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvas() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function populateInviteDropdown() {
  selectInviteFriend.innerHTML = '<option value="">Selecione Amigo</option>';
  currentUser.friends.forEach(friend => {
    const opt = document.createElement('option');
    opt.value = friend;
    opt.textContent = friend;
    selectInviteFriend.appendChild(opt);
  });
}

function sendCoopInvite() {
  const friend = selectInviteFriend.value;
  if (!friend) return alert('Selecione um amigo para convidar!');

  let pendingInvites = JSON.parse(localStorage.getItem('nipnop_pending_invites')) || [];
  pendingInvites.push({
    from: currentUser.name,
    to: friend,
    type: 'draw',
    timestamp: Date.now()
  });

  localStorage.setItem('nipnop_pending_invites', JSON.stringify(pendingInvites));
  alert(`Convite de lousa enviado para ${friend}!`);
}

function kickCoopUser() {
  const userToKick = prompt('Digite o nome do usuário para expulsar da sala:');
  if (userToKick) {
    alert(`Usuário ${userToKick} foi removido da sala coop.`);
  }
}

// SISTEMA DE NOTIFICAÇÕES TOAST
function checkIncomingInvites() {
  let pendingInvites = JSON.parse(localStorage.getItem('nipnop_pending_invites')) || [];
  const myInvites = pendingInvites.filter(inv => inv.to === currentUser.name);

  if (myInvites.length > 0) {
    myInvites.forEach(inv => showToastInvite(inv));
    const remaining = pendingInvites.filter(inv => inv.to !== currentUser.name);
    localStorage.setItem('nipnop_pending_invites', JSON.stringify(remaining));
  }
}

function showToastInvite(invite) {
  const toast = document.createElement('div');
  toast.className = 'toast-invite';
  const gameText = invite.type === 'snake' ? 'jogo Snake' : 'Lousa Coop';

  toast.innerHTML = `
    <span><strong>${invite.from}</strong> convidou você para o ${gameText}!</span>
    <div class="toast-buttons">
      <button class="btn-primary btn-accept">Entrar</button>
      <button class="btn-secondary btn-ignore">Ignorar</button>
    </div>
  `;

  toast.querySelector('.btn-accept').addEventListener('click', () => {
    toast.remove();
    switchMainView('games');
    if (invite.type === 'snake') {
      switchGameSubview('snake');
      joinSnakeLobby(invite.from);
    } else {
      switchGameSubview('draw');
    }
  });

  toast.querySelector('.btn-ignore').addEventListener('click', () => {
    toast.remove();
    if (!currentUser.notifications) currentUser.notifications = [];
    currentUser.notifications.push(`Convite para ${gameText} de ${invite.from} ignorado.`);
    updateUserData();
  });

  toastNotifications.appendChild(toast);
}

function renderNotifications() {
  notificationsList.innerHTML = '';
  const notifications = currentUser.notifications || [];

  if (notifications.length === 0) {
    notificationsList.innerHTML = `<li>Nenhuma notificação por enquanto.</li>`;
    return;
  }

  notifications.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    notificationsList.appendChild(li);
  });
}

// JOGO SNAKE MULTIPLAYER
function setupSnakeLobby() {
  snakeLobby.classList.remove('hidden');
  snakeGameScreen.classList.add('hidden');

  if (!snakeLobbyHost) {
    snakeLobbyHost = currentUser.name;
    snakeLobbyPlayers = [currentUser.name];
  }

  updateSnakeLobbyUI();
  populateSnakeInviteDropdown();
}

function updateSnakeLobbyUI() {
  snakePlayersList.innerHTML = '';
  snakeLobbyPlayers.forEach(player => {
    const li = document.createElement('li');
    li.textContent = `${player} ${player === snakeLobbyHost ? '👑 (Criador)' : ''}`;
    snakePlayersList.appendChild(li);
  });

  if (currentUser.name === snakeLobbyHost) {
    btnStartSnakeGame.classList.remove('hidden');
  } else {
    btnStartSnakeGame.classList.add('hidden');
  }
}

function populateSnakeInviteDropdown() {
  selectSnakeFriend.innerHTML = '<option value="">Selecione Amigo</option>';
  currentUser.friends.forEach(friend => {
    const opt = document.createElement('option');
    opt.value = friend;
    opt.textContent = friend;
    selectSnakeFriend.appendChild(opt);
  });
}

function sendSnakeInvite() {
  const friend = selectSnakeFriend.value;
  if (!friend) return alert('Selecione um amigo para convidar!');

  let pendingInvites = JSON.parse(localStorage.getItem('nipnop_pending_invites')) || [];
  pendingInvites.push({
    from: currentUser.name,
    to: friend,
    type: 'snake',
    timestamp: Date.now()
  });

  localStorage.setItem('nipnop_pending_invites', JSON.stringify(pendingInvites));
  alert(`Convite de Snake enviado para ${friend}!`);
}

function joinSnakeLobby(hostName) {
  snakeLobbyHost = hostName;
  if (!snakeLobbyPlayers.includes(currentUser.name)) {
    snakeLobbyPlayers.push(currentUser.name);
  }
  updateSnakeLobbyUI();
}

function startSnakeGame() {
  if (currentUser.name !== snakeLobbyHost) {
    return alert('Apenas quem criou a sala pode iniciar!');
  }

  snakeLobby.classList.add('hidden');
  snakeGameScreen.classList.remove('hidden');

  // Inicializa posições das cobras
  p1Snake = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
  p2Snake = [{ x: 24, y: 10 }, { x: 25, y: 10 }, { x: 26, y: 10 }];
  
  p1Dir = { x: 1, y: 0 };
  p2Dir = { x: -1, y: 0 };
  
  p1Score = 0;
  p2Score = 0;
  p1Alive = true;
  p2Alive = true;

  spawnFruit();
  updateSnakeScores();

  if (snakeGameInterval) clearInterval(snakeGameInterval);
  snakeGameInterval = setInterval(gameLoopSnake, 120);
}

function spawnFruit() {
  fruit = {
    x: Math.floor(Math.random() * TILE_COUNT_X),
    y: Math.floor(Math.random() * TILE_COUNT_Y)
  };
}

function setP1Direction(x, y) {
  if (p1Dir.x === -x && x !== 0) return;
  if (p1Dir.y === -y && y !== 0) return;
  p1Dir = { x, y };
}

function handleSnakeInput(e) {
  if (snakeGameScreen.classList.contains('hidden')) return;

  // Jogador 1 (Setas)
  if (e.key === 'ArrowUp') setP1Direction(0, -1);
  else if (e.key === 'ArrowDown') setP1Direction(0, 1);
  else if (e.key === 'ArrowLeft') setP1Direction(-1, 0);
  else if (e.key === 'ArrowRight') setP1Direction(1, 0);

  // Jogador 2 (WASD - para jogos locais de 2 pessoas no mesmo teclado)
  if (e.key === 'w' || e.key === 'W') {
    if (p2Dir.y !== 1) p2Dir = { x: 0, y: -1 };
  } else if (e.key === 's' || e.key === 'S') {
    if (p2Dir.y !== -1) p2Dir = { x: 0, y: 1 };
  } else if (e.key === 'a' || e.key === 'A') {
    if (p2Dir.x !== 1) p2Dir = { x: -1, y: 0 };
  } else if (e.key === 'd' || e.key === 'D') {
    if (p2Dir.x !== -1) p2Dir = { x: 1, y: 0 };
  }
}

function gameLoopSnake() {
  if (!p1Alive && !p2Alive) {
    endSnakeGame(null, 'Ambos os jogadores bateram e perderam!');
    return;
  }

  // Movimento Jogador 1
  if (p1Alive) {
    const headP1 = { x: p1Snake[0].x + p1Dir.x, y: p1Snake[0].y + p1Dir.y };

    // Colisão Parede P1
    if (headP1.x < 0 || headP1.x >= TILE_COUNT_X || headP1.y < 0 || headP1.y >= TILE_COUNT_Y) {
      p1Alive = false;
    }

    // Colisão Corpo Próprio P1
    if (checkSelfCollision(headP1, p1Snake)) {
      p1Alive = false;
    }

    // Colisão Corpo P2
    if (checkSelfCollision(headP1, p2Snake)) {
      p1Alive = false;
    }

    if (p1Alive) {
      p1Snake.unshift(headP1);
      if (headP1.x === fruit.x && headP1.y === fruit.y) {
        p1Score++;
        spawnFruit();
        if (p1Score >= 25) {
          endSnakeGame(currentUser.name, `Parabéns! ${currentUser.name} pegou 25 frutas e venceu!`);
          return;
        }
      } else {
        p1Snake.pop();
      }
    }
  }

  // Movimento Jogador 2
  if (p2Alive && snakeLobbyPlayers.length > 1) {
    const headP2 = { x: p2Snake[0].x + p2Dir.x, y: p2Snake[0].y + p2Dir.y };

    // Colisão Parede P2
    if (headP2.x < 0 || headP2.x >= TILE_COUNT_X || headP2.y < 0 || headP2.y >= TILE_COUNT_Y) {
      p2Alive = false;
    }

    // Colisão Corpo Próprio P2
    if (checkSelfCollision(headP2, p2Snake)) {
      p2Alive = false;
    }

    // Colisão Corpo P1
    if (checkSelfCollision(headP2, p1Snake)) {
      p2Alive = false;
    }

    if (p2Alive) {
      p2Snake.unshift(headP2);
      if (headP2.x === fruit.x && headP2.y === fruit.y) {
        p2Score++;
        spawnFruit();
        if (p2Score >= 25) {
          const winnerName = snakeLobbyPlayers[1] || 'Jogador 2';
          endSnakeGame(winnerName, `Parabéns! ${winnerName} pegou 25 frutas e venceu!`);
          return;
        }
      } else {
        p2Snake.pop();
      }
    }
  }

  updateSnakeScores();
  drawSnakeGame();
}

function checkSelfCollision(head, body) {
  return body.some(segment => segment.x === head.x && segment.y === head.y);
}

function updateSnakeScores() {
  const p1Name = snakeLobbyPlayers[0] || 'P1';
  const p2Name = snakeLobbyPlayers[1] || 'P2';
  snakeScoreP1.textContent = `${p1Name}: ${p1Score}/25 Frutas`;
  snakeScoreP2.textContent = `${p2Name}: ${p2Score}/25 Frutas`;
}

function drawSnakeGame() {
  if (!snakeCtx) return;

  // Fundo
  snakeCtx.fillStyle = '#111827';
  snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  // Fruta
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

  // Cobra P1 (Verde)
  if (p1Alive) {
    snakeCtx.fillStyle = '#2ea043';
    p1Snake.forEach((seg, idx) => {
      snakeCtx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });
  }

  // Cobra P2 (Azul)
  if (p2Alive && snakeLobbyPlayers.length > 1) {
    snakeCtx.fillStyle = '#3b82f6';
    p2Snake.forEach((seg, idx) => {
      snakeCtx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });
  }
}

function endSnakeGame(winnerName, message) {
  clearInterval(snakeGameInterval);
  snakeGameInterval = null;

  if (winnerName && winnerName === currentUser.name) {
    currentUser.coins = (currentUser.coins || 0) + 100;
    updateUserData();
    alert(`${message}\nVocê ganhou 100 moedas! 🪙`);
  } else {
    alert(message);
  }

  // Retorna os jogadores à sala de espera
  setupSnakeLobby();
}