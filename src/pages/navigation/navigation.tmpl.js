export default `
<nav>
  <ul class="flex-row">
    <li><button onclick="goToPage('login')" class="button-link">Логин</button></li>
    <li><button onclick="goToPage('signin')" class="button-link">Регистрация</button></li>
    <li><button onclick="goToPage('chat')" class="button-link">Чат</button></li>
    <li><button onclick="goToPage('profile')" class="button-link">Профиль</button></li>
    <li><button onclick="goToPage('password')" class="button-link">Новый пароль</button></li>
    <li><button onclick="goToPage('404')" class="button-link">404</button></li>
    <li><button onclick="goToPage('500')" class="button-link">500</button></li>
  </ul>
</nav>
`;
