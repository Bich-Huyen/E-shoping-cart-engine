"use client";
import React, {useState } from "react";
import Link from "next/link";
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
    <section className="flat-spacing-10">
      <div className="container">
        <div className="tf-grid-layout lg-col-2 tf-login-wrap">
          <div className="tf-login-form">
            <div id="recover">
              <h5 className="mb_24">Đặt lại mật khẩu</h5>
              <p className="mb_30">
                Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn
              </p>
              <div>
                <form onSubmit={(e) => e.preventDefault()} className="">
                  <div className="tf-field style-1 mb_15">
                    <input
                      className="tf-field-input tf-input"
                      placeholder=""
                      required
                      type="email"
                      autoComplete="abc@xyz.com"
                      id="property3"
                      name="email"
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#login" className="tf-btn btn-line">
                      Cancel
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div id="login">
              <h5 className="mb_36">Đăng nhập</h5>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="tf-field style-1 mb_15">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="abc@xyz.com"
                      id="property3"
                      name="email"
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="tf-field style-1 mb_30">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="property4"
                      name="password"
                      autoComplete="current-password"
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property4"
                    >
                      Mật khẩu *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#recover" className="tf-btn btn-line">
                      Quên mật khẩu?
                    </a>
                  </div>
                  {err && <p style={{ color: 'red' }}>{err}</p>}
                  <div className="">
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="tf-login-content">
            <h5 className="mb_36">Tôi là người mới</h5>
            <p className="mb_20">
              Đăng ký để được tiếp cận chương trình Khuyến mại sớm cùng với các sản phẩm mới,
              xu hướng và chương trình khuyến mãi được thiết kế riêng. Để từ chối, hãy nhấp vào hủy đăng ký trong email của chúng tôi.
            </p>
            <Link href={`/register`} className="tf-btn btn-line">
              Đăng ký
              <i className="icon icon-arrow1-top-left" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
