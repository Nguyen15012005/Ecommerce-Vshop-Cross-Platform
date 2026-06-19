import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifySellerEmail } from "../../../store/authSlice";

const VerifySellerPage = () => {
  const { otp } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (otp) {
      dispatch(verifySellerEmail(otp))
        .unwrap()
        .then(() => {
          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [otp, dispatch]);

  return (
    <div style={{
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0a0a',
      fontFamily: "'Be Vietnam Pro', sans-serif"
    }}>
      <div style={{
        background: '#fff',
        padding: '50px 40px',
        borderRadius: '16px',
        maxWidth: '460px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        {loading ? (
          <>
            <div style={{
              width: '40px', 
              height: '40px', 
              border: '3px solid rgba(201,169,110,0.3)',
              borderTopColor: '#C9A96E',
              borderRadius: '50%',
              margin: '0 auto 24px',
              animation: 'spin 1s linear infinite'
            }} />
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', margin: '0 0 10px' }}>
              Đang xác minh...
            </h2>
            <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>
              Vui lòng chờ trong giây lát.
            </p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </>
        ) : success ? (
          <>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111', margin: '0 0 12px' }}>
              Xác thực thành công!
            </h2>
            <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
              Email của bạn đã được xác minh. Bây giờ bạn có thể đăng nhập vào Kênh Người Bán để thiết lập gian hàng và bắt đầu kinh doanh.
            </p>
            <Link to="/seller/login" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                padding: '14px',
                background: '#111',
                color: '#C9A96E',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Đến Kênh Người Bán
              </button>
            </Link>
          </>
        ) : (
          <>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>❌</div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111', margin: '0 0 12px' }}>
              Xác thực thất bại
            </h2>
            <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
              {error || "Đã có lỗi xảy ra. Liên kết xác thực có thể đã hết hạn hoặc không hợp lệ."}
            </p>
            <Link to="/seller/register" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                padding: '14px',
                background: '#f5f5f5',
                color: '#111',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Quay lại Đăng ký
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifySellerPage;
