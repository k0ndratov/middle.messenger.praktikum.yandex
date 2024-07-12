export default `
<div class="password-page">
  <form class="form" action="">
      <h1 class="h1">Сменить пароль</h1>
      <div class="field">
        <label class="label" for="">Текущий пароль</label>
        <input class="input" type="password" name="oldPassword"/>
        <span class="error-label">Неверная почта</span>
      </div>
      <div class="field">
        <label class="label" for="">Новый пароль</label>
        <input class="input" type="password" name="newPassword"/>
        <span class="error-label">Неверная почта</span>
      </div>
      <div class="field">
        <label class="label" for="">Подтвердите пароль</label>
        <input class="input" type="password" name="newPasswordSubmit"/>
        <span class="error-label">Неверная почта</span>
      </div>
      <button class="button" type="submit">Сохранить</button>
      <a href="/profile">Назад</a>
    </form>
  </div>
`;
