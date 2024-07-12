export default `
  <div class="profile-page">
  <form class="form" action="">
  <img class="avatar" src="./avatar-stub.svg" alt="avatar">
      <h1 class="h1">Иван</h1>
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
        <label class="label" for=""> Имя в чате </label>
        <input class="input" type="text" name="display_name" />
      </div>
      <div class="field">
        <label class="label" for=""> Телефон </label>
        <input class="input" type="phone" name="phone" />
      </div>
      <button class="button" type="submit">Сохранить</button>
      <a href="/password">Изменить пароль</a>
      <a href="/login">Выйти</a>
    </form>
  </div>
`;
