import React, { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../main'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { userName, email, password },
        { withCredentials: true }
      )

      dispatch(setUserData(res.data))

      setUserName("")
      setEmail("")
      setPassword("")
      setErr("")

      // realistic flow → go to profile setup
      navigate("/profile")

    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-200">
      <div className="w-full max-w-[400px] bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
        
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Create Account
        </h1>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

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
            className="bg-green-500 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p
          className="text-sm text-center cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? <span className="text-blue-500">Login</span>
        </p>
      </div>
    </div>
  )
}

export default SignUp