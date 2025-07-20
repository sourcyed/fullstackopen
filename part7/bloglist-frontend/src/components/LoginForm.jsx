const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <p>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </p>
        <p>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </p>
        <p>
          <input type="submit" value="login" />
        </p>
      </form>
    </div>
  )
}

export default LoginForm
