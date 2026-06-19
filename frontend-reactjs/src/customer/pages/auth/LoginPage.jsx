import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  sendLoginOtp,
  loginWithOtp,
  resetOtpState,
} from "../../../store/authSlice";
import OtpInput from "./OtpInput";

// ─── Inject keyframes ─────────────────────────────────────────────────────────
const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap');

  .dz-auth-page * { box-sizing: border-box; }

  .dz-auth-page {
    min-height: 100vh;
    font-family: 'Be Vietnam Pro', sans-serif;
    background: #0a0a0a;
    display: flex;
    align-items: stretch;
  }

  /* left decorative panel */
  .dz-auth-left {
    flex: 1;
    display: none;
    position: relative;
    overflow: hidden;
    background: linear-gradient(160deg, #111 0%, #1a1611 60%, #0a0a0a 100%);
  }
  @media(min-width:900px){ .dz-auth-left { display:flex; align-items:center; justify-content:center; } }

  .dz-auth-left-inner {
    position: relative;
    z-index: 2;
    padding: 60px;
    max-width: 480px;
  }

  .dz-logo-mark {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 56px;
  }
  .dz-logo-letters {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }
  .dz-logo-d {
    font-size: 52px;
    font-family: Georgia, serif;
    color: #C9A96E;
    line-height: 0.85;
  }
  .dz-logo-z {
    font-size: 52px;
    font-family: Georgia, serif;
    color: #C9A96E;
    line-height: 0.85;
    margin-left: 14px;
  }
  .dz-logo-text h2 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 5px;
    color: #fff;
    margin: 0 0 4px 0;
  }
  .dz-logo-text span {
    font-size: 11px;
    letter-spacing: 4px;
    color: #888;
    text-transform: uppercase;
  }

  .dz-auth-tagline {
    font-size: 38px;
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  .dz-auth-tagline em {
    color: #C9A96E;
    font-style: normal;
  }
  .dz-auth-desc {
    font-size: 15px;
    color: #777;
    line-height: 1.7;
  }

  /* decorative circles */
  .dz-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.12);
  }
  .dz-c1 { width:420px;height:420px;top:-80px;right:-120px; }
  .dz-c2 { width:260px;height:260px;bottom:60px;right:40px; border-color: rgba(201,169,110,0.07); }
  .dz-c3 { width:140px;height:140px;bottom:-30px;left:40px; border-color: rgba(201,169,110,0.1); }

  /* right form panel */
  .dz-auth-right {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 28px;
    background: #fff;
  }
  @media(min-width:900px){
    .dz-auth-right { padding: 60px 56px; }
  }

  .dz-form-logo-mobile {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }
  @media(min-width:900px){ .dz-form-logo-mobile { display:none; } }

  .dz-form-logo-mobile .dz-d { font-size:38px;font-family:Georgia,serif;color:#C9A96E;line-height:0.85; }
  .dz-form-logo-mobile .dz-z { font-size:38px;font-family:Georgia,serif;color:#C9A96E;line-height:0.85;margin-left:10px; }
  .dz-form-logo-mobile h3 { font-size:16px;font-weight:700;letter-spacing:3px;color:#111;margin:0; }

  .dz-form-heading {
    font-size: 30px;
    font-weight: 800;
    color: #111;
    margin: 0 0 6px 0;
  }
  .dz-form-sub {
    font-size: 14px;
    color: #888;
    margin: 0 0 32px 0;
    line-height: 1.6;
  }
  .dz-form-sub strong { color: #C9A96E; }

  /* Input */
  .dz-field { margin-bottom: 20px; }
  .dz-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #555;
    margin-bottom: 8px;
  }
  .dz-input-wrap { position: relative; }
  .dz-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    pointer-events: none;
  }
  .dz-input {
    width: 100%;
    padding: 14px 14px 14px 46px;
    font-size: 15px;
    font-family: inherit;
    font-weight: 500;
    border: 1.5px solid #e5e5e5;
    border-radius: 10px;
    outline: none;
    background: #fafafa;
    color: #111;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .dz-input:focus {
    border-color: #C9A96E;
    box-shadow: 0 0 0 3px rgba(201,169,110,0.15);
    background: #fff;
  }
  .dz-input.error { border-color: #e53e3e; }

  .dz-error-msg {
    font-size: 12px;
    color: #e53e3e;
    margin-top: 6px;
    font-weight: 500;
  }

  /* Primary button */
  .dz-btn-primary {
    width: 100%;
    padding: 15px;
    background: #111;
    color: #C9A96E;
    border: 1.5px solid #111;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .dz-btn-primary:hover:not(:disabled) {
    background: #C9A96E;
    color: #111;
    border-color: #C9A96E;
    box-shadow: 0 6px 20px rgba(201,169,110,0.35);
    transform: translateY(-1px);
  }
  .dz-btn-primary:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  /* Spinner */
  .dz-spinner {
    width: 17px;
    height: 17px;
    border: 2px solid rgba(201,169,110,0.4);
    border-top-color: #C9A96E;
    border-radius: 50%;
    animation: dz-spin 0.75s linear infinite;
    flex-shrink: 0;
  }
  @keyframes dz-spin { to { transform: rotate(360deg); } }

  /* Divider */
  .dz-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
  }
  .dz-divider-line { flex:1; height:1px; background:#ececec; }
  .dz-divider-text { font-size:13px; color:#aaa; white-space:nowrap; }

  /* Link button */
  .dz-link-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    color: #C9A96E;
    text-decoration: underline;
    transition: color 0.2s;
  }
  .dz-link-btn:hover { color: #a8833c; }
  .dz-link-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Back button */
  .dz-back-btn {
    background: none;
    border: none;
    padding: 0 0 20px 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    color: #888;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }
  .dz-back-btn:hover { color: #333; }

  /* OTP section */
  .dz-otp-icon { text-align: center; font-size: 54px; margin-bottom: 4px; }

  /* Footer note */
  .dz-terms {
    margin-top: 28px;
    font-size: 11px;
    color: #bbb;
    text-align: center;
    line-height: 1.6;
  }
  .dz-terms a { color: #C9A96E; text-decoration: none; }
  .dz-terms a:hover { text-decoration: underline; }

  /* Step indicator */
  .dz-steps {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 28px;
  }
  .dz-step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  .dz-step-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
  }
  .dz-step.active .dz-step-dot { background: #111; color: #C9A96E; }
  .dz-step.done .dz-step-dot { background: #C9A96E; color: #111; }
  .dz-step.inactive .dz-step-dot { background: #f0f0f0; color: #aaa; }
  .dz-step.active .dz-step-label { color: #111; }
  .dz-step.inactive .dz-step-label { color: #bbb; }
  .dz-step.done .dz-step-label { color: #C9A96E; }
  .dz-step-line { flex: 1; height: 1px; background: #e5e5e5; }
  .dz-step-line.gold { background: #C9A96E; }
`;
if (!document.head.querySelector("#dz-auth-styles")) {
  styleEl.id = "dz-auth-styles";
  document.head.appendChild(styleEl);
}

// ─── LoginPage ────────────────────────────────────────────────────────────────
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    otpSent,
    sendOtpLoading,
    sendOtpError,
    loginLoading,
    loginError,
    isAuthenticated,
  } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  // Đếm ngược gửi lại OTP
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Cleanup khi rời trang
  useEffect(
    () => () => {
      dispatch(resetOtpState());
    },
    [dispatch],
  );

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    setEmailError("");
    dispatch(sendLoginOtp({ email }));
    setCountdown(60);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    dispatch(loginWithOtp({ email, otp }));
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setOtp("");
    dispatch(sendLoginOtp({ email }));
    setCountdown(60);
  };

  const handleBack = () => {
    dispatch(resetOtpState());
    setOtp("");
  };

  const step = otpSent ? 2 : 1;

  return (
    <div className="dz-auth-page mt-5 -mb-5">
      {/* ── Left decorative panel ── */}
      <div className="dz-auth-left">
        <div className="dz-circle dz-c1" />
        <div className="dz-circle dz-c2" />
        <div className="dz-circle dz-c3" />
        <div className="dz-auth-left-inner">
          <div className="dz-logo-mark">
            <div className="dz-logo-letters">
              <span className="dz-logo-d">D</span>
              <span className="dz-logo-z">Z</span>
            </div>
            <div className="dz-logo-text">
              <h2>DAILY ZONE</h2>
              <span>Style your life</span>
            </div>
          </div>
          <p className="dz-auth-tagline">
            Chào mừng <em>trở lại</em> cùng DailyZone
          </p>
          <p className="dz-auth-desc">
            Đăng nhập để truy cập tủ đồ, theo dõi đơn hàng và nhận những ưu đãi
            độc quyền được cá nhân hóa dành riêng cho bạn.
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="dz-auth-right">
        {/* Logo mobile */}
        <div className="dz-form-logo-mobile">
          <div className="dz-logo-letters">
            <span className="dz-d">D</span>
            <span className="dz-z">Z</span>
          </div>
          <div>
            <h3>DAILY ZONE</h3>
          </div>
        </div>

        {/* Step indicator */}
        <div className="dz-steps">
          <div
            className={`dz-step ${step >= 1 ? (step > 1 ? "done" : "active") : "inactive"}`}
          >
            <div className="dz-step-dot">{step > 1 ? "✓" : "1"}</div>
            <span className="dz-step-label">Email</span>
          </div>
          <div className={`dz-step-line ${step >= 2 ? "gold" : ""}`} />
          <div className={`dz-step ${step === 2 ? "active" : "inactive"}`}>
            <div className="dz-step-dot">2</div>
            <span className="dz-step-label">Xác minh OTP</span>
          </div>
        </div>

        {!otpSent ? (
          /* ── Bước 1: Email ── */
          <>
            <h1 className="dz-form-heading">Đăng nhập</h1>
            <p className="dz-form-sub">
              Nhập email của bạn, chúng tôi sẽ gửi mã OTP để xác nhận danh tính.
            </p>

            <form onSubmit={handleSendOtp}>
              <div className="dz-field">
                <label className="dz-label">Địa chỉ Email</label>
                <div className="dz-input-wrap">
                  <span className="dz-input-icon">✉️</span>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="example@gmail.com"
                    className={`dz-input${emailError || sendOtpError ? " error" : ""}`}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                {emailError && <p className="dz-error-msg">{emailError}</p>}
                {sendOtpError && <p className="dz-error-msg">{sendOtpError}</p>}
              </div>

              <button
                id="login-send-otp-btn"
                type="submit"
                className="dz-btn-primary"
                disabled={sendOtpLoading || !email.trim()}
              >
                {sendOtpLoading ? (
                  <>
                    <div className="dz-spinner" /> Đang gửi...
                  </>
                ) : (
                  "Gửi mã OTP →"
                )}
              </button>
            </form>

            <div className="dz-divider">
              <span className="dz-divider-line" />
              <span className="dz-divider-text">hoặc</span>
              <span className="dz-divider-line" />
            </div>

            <p style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="dz-link-btn"
                style={{ textDecoration: "underline" }}
              >
                Đăng ký ngay
              </Link>
            </p>
          </>
        ) : (
          /* ── Bước 2: OTP ── */
          <>
            <button className="dz-back-btn" onClick={handleBack}>
              ← Quay lại
            </button>
            <div className="dz-otp-icon">📬</div>
            <h1 className="dz-form-heading">Nhập mã OTP</h1>
            <p className="dz-form-sub">
              Mã 6 số đã được gửi tới <strong>{email}</strong>. Vui lòng kiểm
              tra hộp thư đến.
            </p>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "24px" }}>
                <OtpInput value={otp} onChange={setOtp} />
                {loginError && (
                  <p
                    className="dz-error-msg"
                    style={{ textAlign: "center", marginTop: "12px" }}
                  >
                    {loginError}
                  </p>
                )}
              </div>

              <button
                id="login-verify-btn"
                type="submit"
                className="dz-btn-primary"
                disabled={loginLoading || otp.length !== 6}
              >
                {loginLoading ? (
                  <>
                    <div className="dz-spinner" /> Đang xác minh...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>

            <p
              style={{
                textAlign: "center",
                marginTop: "16px",
                fontSize: "13px",
                color: "#999",
              }}
            >
              Không nhận được mã?{" "}
              <button
                className="dz-link-btn"
                onClick={handleResend}
                disabled={countdown > 0}
                style={{
                  opacity: countdown > 0 ? 0.5 : 1,
                  cursor: countdown > 0 ? "not-allowed" : "pointer",
                }}
              >
                {countdown > 0 ? `Gửi lại (${countdown}s)` : "Gửi lại"}
              </button>
            </p>
          </>
        )}

        <p className="dz-terms">
          Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
          &amp; <a href="#">Chính sách bảo mật</a> của DailyZone.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
