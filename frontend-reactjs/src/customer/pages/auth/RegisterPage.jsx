import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  sendRegisterOtp,
  registerUser,
  resetOtpState,
} from "../../../store/authSlice";
import OtpInput from "./OtpInput";

// ─── Tái dùng style đã inject ở LoginPage (nếu chưa có mới inject) ─────────────
const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap');
  .dz-auth-page * { box-sizing: border-box; }
  .dz-auth-page {
    min-height:100vh; font-family:'Be Vietnam Pro',sans-serif;
    background:#0a0a0a; display:flex; align-items:stretch;
  }
  .dz-auth-left {
    flex:1; display:none; position:relative; overflow:hidden;
    background:linear-gradient(160deg,#111 0%,#1a1611 60%,#0a0a0a 100%);
  }
  @media(min-width:900px){ .dz-auth-left{display:flex;align-items:center;justify-content:center;} }
  .dz-auth-left-inner { position:relative;z-index:2;padding:60px;max-width:480px; }
  .dz-logo-mark { display:flex;align-items:center;gap:14px;margin-bottom:56px; }
  .dz-logo-letters { display:flex;flex-direction:column;line-height:1; }
  .dz-logo-d { font-size:52px;font-family:Georgia,serif;color:#C9A96E;line-height:0.85; }
  .dz-logo-z { font-size:52px;font-family:Georgia,serif;color:#C9A96E;line-height:0.85;margin-left:14px; }
  .dz-logo-text h2 { font-size:22px;font-weight:700;letter-spacing:5px;color:#fff;margin:0 0 4px 0; }
  .dz-logo-text span { font-size:11px;letter-spacing:4px;color:#888;text-transform:uppercase; }
  .dz-auth-tagline { font-size:38px;font-weight:800;color:#fff;line-height:1.2;margin-bottom:20px; }
  .dz-auth-tagline em { color:#C9A96E;font-style:normal; }
  .dz-auth-desc { font-size:15px;color:#777;line-height:1.7; }
  .dz-circle { position:absolute;border-radius:50%;border:1px solid rgba(201,169,110,0.12); }
  .dz-c1 { width:420px;height:420px;top:-80px;right:-120px; }
  .dz-c2 { width:260px;height:260px;bottom:60px;right:40px;border-color:rgba(201,169,110,0.07); }
  .dz-c3 { width:140px;height:140px;bottom:-30px;left:40px;border-color:rgba(201,169,110,0.1); }
  .dz-auth-right {
    width:100%;max-width:520px;margin:0 auto;display:flex;flex-direction:column;
    justify-content:center;padding:40px 28px;background:#fff;
  }
  @media(min-width:900px){ .dz-auth-right{padding:60px 56px;} }
  .dz-form-logo-mobile { display:flex;align-items:center;gap:10px;margin-bottom:36px; }
  @media(min-width:900px){ .dz-form-logo-mobile{display:none;} }
  .dz-form-logo-mobile .dz-d { font-size:38px;font-family:Georgia,serif;color:#C9A96E;line-height:0.85; }
  .dz-form-logo-mobile .dz-z { font-size:38px;font-family:Georgia,serif;color:#C9A96E;line-height:0.85;margin-left:10px; }
  .dz-form-logo-mobile h3 { font-size:16px;font-weight:700;letter-spacing:3px;color:#111;margin:0; }
  .dz-form-heading { font-size:30px;font-weight:800;color:#111;margin:0 0 6px 0; }
  .dz-form-sub { font-size:14px;color:#888;margin:0 0 32px 0;line-height:1.6; }
  .dz-form-sub strong { color:#C9A96E; }
  .dz-field { margin-bottom:20px; }
  .dz-label { display:block;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#555;margin-bottom:8px; }
  .dz-input-wrap { position:relative; }
  .dz-input-icon { position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:18px;pointer-events:none; }
  .dz-input {
    width:100%;padding:14px 14px 14px 46px;font-size:15px;font-family:inherit;font-weight:500;
    border:1.5px solid #e5e5e5;border-radius:10px;outline:none;background:#fafafa;color:#111;
    transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;
  }
  .dz-input:focus { border-color:#C9A96E;box-shadow:0 0 0 3px rgba(201,169,110,0.15);background:#fff; }
  .dz-input.error { border-color:#e53e3e; }
  .dz-error-msg { font-size:12px;color:#e53e3e;margin-top:6px;font-weight:500; }
  .dz-btn-primary {
    width:100%;padding:15px;background:#111;color:#C9A96E;border:1.5px solid #111;
    border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;
    letter-spacing:0.5px;transition:background 0.2s,color 0.2s,box-shadow 0.2s,transform 0.15s;
    display:flex;align-items:center;justify-content:center;gap:8px;
  }
  .dz-btn-primary:hover:not(:disabled) {
    background:#C9A96E;color:#111;border-color:#C9A96E;
    box-shadow:0 6px 20px rgba(201,169,110,0.35);transform:translateY(-1px);
  }
  .dz-btn-primary:disabled { opacity:0.55;cursor:not-allowed; }
  .dz-spinner {
    width:17px;height:17px;border:2px solid rgba(201,169,110,0.4);
    border-top-color:#C9A96E;border-radius:50%;animation:dz-spin 0.75s linear infinite;flex-shrink:0;
  }
  @keyframes dz-spin { to{transform:rotate(360deg);} }
  .dz-divider { display:flex;align-items:center;gap:12px;margin:24px 0; }
  .dz-divider-line { flex:1;height:1px;background:#ececec; }
  .dz-divider-text { font-size:13px;color:#aaa;white-space:nowrap; }
  .dz-link-btn { background:none;border:none;padding:0;cursor:pointer;font-family:inherit;font-size:14px;font-weight:700;color:#C9A96E;text-decoration:underline;transition:color 0.2s; }
  .dz-link-btn:hover { color:#a8833c; }
  .dz-link-btn:disabled { opacity:0.5;cursor:not-allowed; }
  .dz-back-btn { background:none;border:none;padding:0 0 20px 0;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;color:#888;display:flex;align-items:center;gap:6px;transition:color 0.2s; }
  .dz-back-btn:hover { color:#333; }
  .dz-otp-icon { text-align:center;font-size:54px;margin-bottom:4px; }
  .dz-terms { margin-top:28px;font-size:11px;color:#bbb;text-align:center;line-height:1.6; }
  .dz-terms a { color:#C9A96E;text-decoration:none; }
  .dz-terms a:hover { text-decoration:underline; }
  .dz-steps { display:flex;align-items:center;gap:8px;margin-bottom:28px; }
  .dz-step { display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600; }
  .dz-step-dot { width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700; }
  .dz-step.active .dz-step-dot { background:#111;color:#C9A96E; }
  .dz-step.done .dz-step-dot { background:#C9A96E;color:#111; }
  .dz-step.inactive .dz-step-dot { background:#f0f0f0;color:#aaa; }
  .dz-step.active .dz-step-label { color:#111; }
  .dz-step.inactive .dz-step-label { color:#bbb; }
  .dz-step.done .dz-step-label { color:#C9A96E; }
  .dz-step-line { flex:1;height:1px;background:#e5e5e5; }
  .dz-step-line.gold { background:#C9A96E; }
`;
if (!document.head.querySelector("#dz-auth-styles")) {
  styleEl.id = "dz-auth-styles";
  document.head.appendChild(styleEl);
}

// ─── RegisterPage ─────────────────────────────────────────────────────────────
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registerOtpSent,
    sendRegisterOtpLoading,
    sendRegisterOtpError,
    registerLoading,
    registerError,
    isAuthenticated,
  } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [success, setSuccess] = useState(false);

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

  // Cleanup
  useEffect(
    () => () => {
      dispatch(resetOtpState());
    },
    [dispatch],
  );

  // Validate form bước 1
  const validateStep1 = () => {
    const newErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2)
      newErrors.fullName = "Vui lòng nhập họ tên (ít nhất 2 ký tự).";
    if (!phone.trim() || !/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone.replace(/\s+/g, "")))
      newErrors.phone = "Vui lòng nhập số điện thoại hợp lệ.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;
    dispatch(sendRegisterOtp({ email }));
    setCountdown(60);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    dispatch(registerUser({ email, fullName, phone, otp }));
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setOtp("");
    dispatch(sendRegisterOtp({ email }));
    setCountdown(60);
  };

  const handleBack = () => {
    dispatch(resetOtpState());
    setOtp("");
  };

  const step = registerOtpSent ? 2 : 1;

  return (
    <div className="dz-auth-page">
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
            Bắt đầu hành trình <em>phong cách</em> của bạn
          </p>
          <p className="dz-auth-desc">
            Tạo tài khoản để mở khóa bộ sưu tập thời trang mới nhất, nhận ưu đãi
            độc quyền và theo dõi đơn hàng dễ dàng mọi lúc, mọi nơi.
          </p>

          {/* Feature list */}
          <div
            style={{
              marginTop: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {[
              { icon: "🎁", text: "Ưu đãi chào mừng thành viên mới" },
              { icon: "🚚", text: "Miễn phí vận chuyển đơn từ 500K" },
              { icon: "⭐", text: "Tích điểm đổi quà hấp dẫn" },
            ].map((item) => (
              <div
                key={item.text}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ fontSize: "22px" }}>{item.icon}</span>
                <span style={{ fontSize: "14px", color: "#888" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
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
            <span className="dz-step-label">Thông tin</span>
          </div>
          <div className={`dz-step-line ${step >= 2 ? "gold" : ""}`} />
          <div className={`dz-step ${step === 2 ? "active" : "inactive"}`}>
            <div className="dz-step-dot">2</div>
            <span className="dz-step-label">Xác minh OTP</span>
          </div>
        </div>

        {!registerOtpSent ? (
          /* ── Bước 1: Thông tin ── */
          <>
            <h1 className="dz-form-heading">Tạo tài khoản</h1>
            <p className="dz-form-sub">
              Điền thông tin bên dưới để bắt đầu hành trình phong cách của bạn.
            </p>

            <form onSubmit={handleSendOtp}>
              {/* Họ tên */}
              <div className="dz-field">
                <label className="dz-label">Họ và tên</label>
                <div className="dz-input-wrap">
                  <span className="dz-input-icon">👤</span>
                  <input
                    id="register-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    placeholder="Nguyễn Văn A"
                    className={`dz-input${errors.fullName ? " error" : ""}`}
                    autoComplete="name"
                    autoFocus
                  />
                </div>
                {errors.fullName && (
                  <p className="dz-error-msg">{errors.fullName}</p>
                )}
              </div>

              {/* Điện thoại */}
              <div className="dz-field">
                <label className="dz-label">Số điện thoại</label>
                <div className="dz-input-wrap">
                  <span className="dz-input-icon">📱</span>
                  <input
                    id="register-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="0912345678"
                    className={`dz-input${errors.phone ? " error" : ""}`}
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && (
                  <p className="dz-error-msg">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="dz-field">
                <label className="dz-label">Địa chỉ Email</label>
                <div className="dz-input-wrap">
                  <span className="dz-input-icon">✉️</span>
                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="example@gmail.com"
                    className={`dz-input${errors.email || sendRegisterOtpError ? " error" : ""}`}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="dz-error-msg">{errors.email}</p>}
                {sendRegisterOtpError && (
                  <p className="dz-error-msg">{sendRegisterOtpError}</p>
                )}
              </div>

              <button
                id="register-send-otp-btn"
                type="submit"
                className="dz-btn-primary"
                disabled={
                  sendRegisterOtpLoading || !email.trim() || !fullName.trim() || !phone.trim()
                }
              >
                {sendRegisterOtpLoading ? (
                  <>
                    <div className="dz-spinner" /> Đang gửi mã OTP...
                  </>
                ) : (
                  "Gửi mã OTP →"
                )}
              </button>
            </form>

            <div className="dz-divider">
              <span className="dz-divider-line" />
              <span className="dz-divider-text">đã có tài khoản?</span>
              <span className="dz-divider-line" />
            </div>

            <p style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
              <Link to="/login" className="dz-link-btn">
                Đăng nhập ngay
              </Link>
            </p>
          </>
        ) : (
          /* ── Bước 2: OTP ── */
          <>
            <button className="dz-back-btn" onClick={handleBack}>
              ← Quay lại
            </button>
            <div className="dz-otp-icon">📮</div>
            <h1 className="dz-form-heading">Xác minh email</h1>
            <p className="dz-form-sub">
              Mã 6 số đã gửi tới <strong>{email}</strong>. Hãy kiểm tra hộp thư
              của bạn (bao gồm mục Spam).
            </p>

            {/* Preview tên sẽ đăng ký */}
            <div
              style={{
                background: "#fffbf3",
                border: "1px solid #f0e0b0",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "20px" }}>👤</span>
              <div>
                <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>
                  Đăng ký cho
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#111",
                  }}
                >
                  {fullName}
                </p>
              </div>
            </div>

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: "24px" }}>
                <OtpInput value={otp} onChange={setOtp} />
                {registerError && (
                  <p
                    className="dz-error-msg"
                    style={{ textAlign: "center", marginTop: "12px" }}
                  >
                    {registerError}
                  </p>
                )}
              </div>

              <button
                id="register-verify-btn"
                type="submit"
                className="dz-btn-primary"
                disabled={registerLoading || otp.length !== 6}
              >
                {registerLoading ? (
                  <>
                    <div className="dz-spinner" /> Đang tạo tài khoản...
                  </>
                ) : (
                  "Tạo tài khoản"
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
          Bằng cách đăng ký, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
          &amp; <a href="#">Chính sách bảo mật</a> của DailyZone.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
