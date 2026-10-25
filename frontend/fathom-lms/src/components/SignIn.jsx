export default function SignIn () {
  return (
    <div className="sign-in">
      <a>Teacher Signup</a>
      <label for="username">Username</label>
      <input 
        type="text" 
        id="username" 
        name="username"
        placeholder="Username..."
      />
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password"
        placeholder="Password..."
      />
    </div>
  )
}