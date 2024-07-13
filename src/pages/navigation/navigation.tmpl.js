export default `
<nav class="navigation">
  <ul class="navigation__list">
    <li class="navigation__list-item"><button onclick="goToPage('login')" class="button-link">Логин</button></li>
    <li class="navigation__list-item"><button onclick="goToPage('signin')" class="button-link">Регистрация</button></li>
    <li class="navigation__list-item"><button onclick="goToPage('chat')" class="button-link">Чат</button></li>
    <li class="navigation__list-item"><button onclick="goToPage('profile')" class="button-link">Профиль</button></li>
    <li class="navigation__list-item"><button onclick="goToPage('password')" class="button-link">Новый пароль</button></li>
    <li class="navigation__list-item"><button onclick="goToPage('404')" class="button-link">404</button></li>
    <li class="navigation__list-item"><button onclick="goToPage('500')" class="button-link">500</button></li>
  </ul>
</nav>
`;
