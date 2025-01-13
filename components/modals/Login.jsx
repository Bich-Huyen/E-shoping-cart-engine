"use client";
import React, {useState} from "react";
import { loginUser } from "@/data/auth/login";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
        const userData = await loginUser({ email, password });
        console.log('Login successful:', userData);

        setStatus(true);
    } catch (error) {
      setErr('Login failed. Please try again.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="login"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Đăng nhập</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="tf-login-form">
            <form
              onSubmit={handleSubmit}
              className=""
              acceptCharset="utf-8"
            >
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name=""
                  required
                  autoComplete="abc@xyz.com"
                />
                <label className="tf-field-label" htmlFor="">
                  Email *
                </label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name=""
                  required
                  autoComplete="current-password"
                />
                <label className="tf-field-label" htmlFor="">
                  Mật khẩu *
                </label>
              </div>
              <div>
                <a
                  href="#forgotPassword"
                  data-bs-toggle="modal"
                  className="btn-link link"
                >
                  Quên mật khẩu?
                </a>
              </div>
              {err && <p style={{ color: 'red' }}>{err}</p>}
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    {...(status && { "data-bs-dismiss": "modal" })}
                    disabled={loading}
                  >
                    <span>Đăng nhập</span>
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#register"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    New customer? Create your account
                    <i className="icon icon-arrow1-top-left" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
