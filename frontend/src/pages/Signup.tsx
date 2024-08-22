import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, loading } = useSignup();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform validation and submit the form
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    signup(form);
  };

  return (
    <div className="h-full min-h-screen w-screen flex items-center justify-center bg-transparent p-5">
      <div className="w-full max-w-xl shadow-md backdrop-blur-lg rounded-md p-6">
        <h2 className="text-4xl font-bold text-center mb-6 text-whitePrimary">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="grow"
              placeholder="Full Name"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="grow"
              placeholder="Username"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="grow"
              placeholder="Password"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="grow"
              placeholder="Confirm Password"
            />
          </label>

          <label className="block text-sm font-medium text-black/70">
            Gender:
          </label>
          <label className="inline-flex items-center mr-4 text-black/70">
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio border-black/70"
              onChange={handleChange}
              checked={form.gender === "male"}
            />
            <span className="ml-2">Male</span>
          </label>

          <label className="inline-flex items-center text-black/70">
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              className="radio border-black/70"
              checked={form.gender === "female"}
            />
            <span className="ml-2">Female</span>
          </label>

          <button
            type="submit"
            className="w-full bg-whitePrimary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="flex items-center justify-center mt-5">
          <Link to="/login" className="text-whitePrimary">
            Already have an account? Login here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
