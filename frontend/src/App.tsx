import React, { useState, useEffect } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ GET USER (PROFILE)
  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await fetch("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  // 🔐 LOGIN
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      getUser(); // 👈 IMPORTANT
    } else {
      alert(data.message);
    }
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, email, password })
    });

    const data = await res.json();

    alert(data.message);

    if (data.message === "User registered successfully") {
      setIsLogin(true);
    }
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 👤 PROFILE PAGE
  if (user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Welcome {user.name} 👋</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <br /><br />

          <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
          <br /><br />
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {isLogin ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}

      <br /><br />

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
}

export default App;