export default `<main class="login-page">
  <form class="form" action="">
    <h1 class="h1">Вход</h1>
    <div class="field">
      <label class="label" for="">Логин</label>
      <input class="input" type="text" />
      <span class="error-label">Неверный логин</span>
    </div>
    <div class="field">
      <label class="label" for="">Пароль</label>
      <input class="input" type="text" />
    </div>
    <button onclick="goToPage('chat')" class="button">Логин</button>
    <button onclick="goToPage('signin')" class="button-link">Нет аккаунта?</button>
  </form>
</main>`;
