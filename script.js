const app = document.getElementById("app");
let password = "1234"; // Пароль для входа

function showWelcome() {
  app.innerHTML = `
    <div class="container">
      <h2 class="first-titel">Здравствуйте!</h2>
      <button class="first-button" onclick="showSend()">Оставить участие</button>
      <button class="first-button" onclick="showLogin()">Посмотреть участие</button>
    </div>`;
}
function showLogin() {
  app.innerHTML = `
    <div class="container">
      <button class="first-button" onclick="showWelcome()">Назад</button>
      <h3>Войти в кабинет</h3>
      <input type="password" id="pass" placeholder="Пароль" />
      <button onclick="login()">Войти</button>
    </div>`;
}

function login() {
  const input = document.getElementById("pass").value;
  if (input === password) showMessages();
  else alert("Неверный пароль");
}

function showMessages() {
  fetch('/messages')
    .then(r => r.json())
    .then(data => {
      app.innerHTML = `
        <div class="container">
          <button class="back-button-first" onclick="showWelcome()">Назад</button>
          <h3 class="titel-three">Участие</h3>
          ${data.map((m,i)=>`
            <div style="border:1px solid #ccc; border-radius:10px; padding:10px; margin-bottom:10px;">
              <b>${m.name}</b><br>${m.text}
              <button onclick="deleteMsg(${i})" style="background:#ddd; color:black; margin-top:5px;">×</button>
            </div>`).join('')}
        </div>`;
    });
}

function deleteMsg(index) {
  fetch(`/messages/${index}`, { method: 'DELETE' })
    .then(() => showMessages());
}

function showSend() {
  app.innerHTML = `
    <div class="container">
      <button class="back-button" onclick="showWelcome()">Назад</button>
      <h3 class="titel-three" >Отправить участие</h3>
      <input class="name-input" id="name" placeholder="Имя" />
      <textarea class="text-input" id="text" placeholder="Участие"></textarea>
      <button class="sendMsg" onclick="sendMsg()">Отправить</button>
    </div>`;
}

function sendMsg() {
  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("text").value.trim();
  if (!name || !text) return alert("Заполните все поля!");

  fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, text })
  }).then(() => {
    app.innerHTML = `
      <div class="container">
        <h3 class="done-titel">Участие отправлено!</h3>
        <button class="showwelcom" onclick="showWelcome()">На главную</button>
      </div>`;
  });
}

showWelcome();
