// script.js
const PASSWORD = '1234';
const mainScreen = document.getElementById('main-screen');
const pwScreen = document.getElementById('password-screen');
const msgScreen = document.getElementById('message-screen');
const confScreen = document.getElementById('confirm-screen');
const viewScreen = document.getElementById('view-screen');

// Кнопки
document.getElementById('btn-send').onclick = () => {
  mainScreen.classList.add('hidden');
  msgScreen.classList.remove('hidden');
};
document.getElementById('btn-view').onclick = () => {
  mainScreen.classList.add('hidden');
  pwScreen.classList.remove('hidden');
};
document.getElementById('btn-ok').onclick = () => {
  const pw = document.getElementById('password-input').value;
  if (pw === PASSWORD) {
    pwScreen.classList.add('hidden');
    showMessages();  // функция загрузки и показа сообщений
    viewScreen.classList.remove('hidden');
  } else {
    document.getElementById('pw-error').textContent = 'Неверный пароль';
  }
};
document.getElementById('btn-submit').onclick = async () => {
  const name = document.getElementById('name-input').value;
  const text = document.getElementById('text-input').value;
  if (!name || !text) return;
  // Отправляем данные на сервер (JSON)
  await fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, text })
  });
  msgScreen.classList.add('hidden');
  confScreen.classList.remove('hidden');
};
document.getElementById('btn-confirm').onclick = () => {
  confScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
};

// Функция загрузки и отображения сообщений
async function showMessages() {
  const res = await fetch('/messages'); // предполагается серверный endpoint
  const data = await res.json();
  const list = document.getElementById('messages-list');
  list.innerHTML = '';
  data.forEach((msg, index) => {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.innerHTML = `
      <h3>${msg.name}</h3>
      <p>${msg.text}</p>
      <button onclick="deleteMsg(${index})">&times;</button>
    `;
    list.appendChild(card);
  });
}

// Удаление сообщения по индексу
async function deleteMsg(index) {
  await fetch(`/messages/${index}`, { method: 'DELETE' });
  showMessages();
}
