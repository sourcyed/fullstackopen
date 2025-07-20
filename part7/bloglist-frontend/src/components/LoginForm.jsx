const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Log in to application
        </h2>

        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            data-testid="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            data-testid="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 cursor-pointer transition"
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
