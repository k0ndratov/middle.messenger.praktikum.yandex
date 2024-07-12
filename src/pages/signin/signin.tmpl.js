export default `<div class="signin-page">
  <form class="form" action="">
    <h1 class="h1">Регистрация</h1>
    <div class="field">
      <label class="label" for=""> Почта </label>
      <input class="input" type="email" name="email"/>
      <span class="error-label">Неверная почта</span>
    </div>
    <div class="field">
      <label class="label" for=""> Логин </label>
      <input class="input" type="text" name="login" />
    </div>
    <div class="field">
      <label class="label" for=""> Имя </label>
      <input class="input" type="text" name="first_name" />
    </div>
    <div class="field">
      <label class="label" for=""> Фамилия </label>
      <input class="input" type="text" name="second_name" />
    </div>
    <div class="field">
      <label class="label" for=""> Телефон </label>
      <input class="input" type="phone" name="phone" />
    </div>
    <div class="field">
      <label class="label" for=""> Пароль </label>
      <input class="input" type="password" name="password" />
    </div>
    <div class="field">
      <label class="label" for=""> Пароль (еще раз) </label>
      <input class="input" type="password" name="password_confirm" />
    </div>
    <button class="button" type="submit">Зарегистрироваться</button>
    <a href="/login">Войти</a>
  </form>
</div>`;
