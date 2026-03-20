import React, { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../main'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData, setSelectedUser } from '../redux/userSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      )

      dispatch(setUserData(res.data))
      dispatch(setSelectedUser(null))

      setEmail("")
      setPassword("")
      setErr("")
      navigate("/")

    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-200">
      <div className="w-full max-w-[400px] bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
        
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Login to Chatly
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <p className="text-red-500 text-sm">{err}</p>}

          <button
            className="bg-blue-500 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p
          className="text-sm text-center cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? <span className="text-blue-500">Sign up</span>
        </p>
      </div>
    </div>
  )
}

export default Login