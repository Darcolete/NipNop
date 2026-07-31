// ELEMETOS DO DOM
const authScreen = document.getElementById('auth-screen');
const appScreen = document.getElementById('app-screen');
const registerForm = document.getElementById('register-form');
const usernameInput = document.getElementById('username');
const avatarUrlInput = document.getElementById('avatar-url');

const currentUserAvatar = document.getElementById('current-user-avatar');
const currentUserName = document.getElementById('current-user-name');
const btnLogout = document.getElementById('btn-logout');

const addFriendForm = document.getElementById('add-friend-form');
const friendNameInput = document.getElementById('friend-name');
const friendsList = document.getElementById('friends-list');

const chatHeader = document.getElementById('chat-title');
const messagesContainer = document.getElementById('messages-container');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

// ESTADO DA APLICAÇÃO
let currentUser = null;
let activeFriend = null;
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=3b82f6&color=fff&name=';

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  setupEventListeners();
});

function setupEventListeners() {
  registerForm.addEventListener('submit', handleRegister);
  btnLogout.addEventListener('click', handleLogout);
  addFriendForm.addEventListener('submit', handleAddFriend);
  chatForm.addEventListener('submit', handleSendMessage);
}

// PERSISTÊNCIA DA SESSÃO
function checkSession() {
  const savedUser = localStorage.getItem('nipnop_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showAppScreen();
  } else {
    showAuthScreen();
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = usernameInput.value.trim();
  const avatar = avatarUrlInput.value.trim() || `${DEFAULT_AVATAR}${encodeURIComponent(name)}`;

  if (!name) return;

  currentUser = { name, avatar, friends: [] };
  
  // Salva novos usuários no DB local se não existirem
  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};
  if (!users[name]) {
    users[name] = currentUser;
    localStorage.setItem('nipnop_db_users', JSON.stringify(users));
  } else {
    currentUser = users[name];
  }

  localStorage.setItem('nipnop_user', JSON.stringify(currentUser));
  showAppScreen();
}

function handleLogout() {
  localStorage.removeItem('nipnop_user');
  currentUser = null;
  activeFriend = null;
  showAuthScreen();
}

// GERENCIAMENTO DA INTERFACE
function showAuthScreen() {
  authScreen.classList.remove('hidden');
  appScreen.classList.add('hidden');
}

function showAppScreen() {
  authScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
  
  currentUserName.textContent = currentUser.name;
  currentUserAvatar.src = currentUser.avatar;

  renderFriends();
}

// SISTEMA DE AMIGOS
function handleAddFriend(e) {
  e.preventDefault();
  const friendName = friendNameInput.value.trim();

  if (!friendName || friendName === currentUser.name) {
    alert('Nome de amigo inválido.');
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

  currentUser.friends.forEach(friend => {
    const li = document.createElement('li');
    li.className = `friend-item ${activeFriend === friend ? 'active' : ''}`;
    
    // Gera avatar para os amigos
    const friendAvatar = `${DEFAULT_AVATAR}${encodeURIComponent(friend)}`;

    li.innerHTML = `
      <img src="${friendAvatar}" alt="${friend}">
      <span>${friend}</span>
    `;

    li.addEventListener('click', () => selectFriend(friend));
    friendsList.appendChild(li);
  });
}

function selectFriend(friendName) {
  activeFriend = friendName;
  chatHeader.textContent = `Conversa com ${friendName}`;
  chatForm.classList.remove('hidden');
  renderFriends();
  renderMessages();
}

// SISTEMA DE BATE-PAPO
function getChatKey() {
  if (!currentUser || !activeFriend) return null;
  // Cria uma chave única para a conversa entre dois usuários (ordem alfabética)
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

  // Rola automaticamente para a última mensagem
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// UTILITÁRIO DE DADOS
function updateUserData() {
  localStorage.setItem('nipnop_user', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('nipnop_db_users')) || {};
  users[currentUser.name] = currentUser;
  localStorage.setItem('nipnop_db_users', JSON.stringify(users));
}