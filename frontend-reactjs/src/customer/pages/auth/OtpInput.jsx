import React, { useRef } from "react";

/**
 * OtpInput — 6 ô nhập mã OTP
 * Props:
 *   value: string (6 ký tự)
 *   onChange: (newValue: string) => void
 */
const OtpInput = ({ value, onChange }) => {
  const inputRefs = useRef([]);
  const digits = (value || "").split("").concat(Array(6).fill("")).slice(0, 6);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const char = val[val.length - 1];
    const newDigits = [...digits];
    newDigits[idx] = char;
    onChange(newDigits.join(""));
    if (idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newDigits = [...digits];
      if (newDigits[idx]) {
        newDigits[idx] = "";
        onChange(newDigits.join(""));
      } else if (idx > 0) {
        newDigits[idx - 1] = "";
        onChange(newDigits.join(""));
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    onChange(pasted.padEnd(6, "").slice(0, 6));
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          style={{
            width: "52px",
            height: "60px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
            border: d ? "2px solid #C9A96E" : "2px solid #e0e0e0",
            borderRadius: "10px",
            outline: "none",
            background: d ? "#fffbf3" : "#fafafa",
            color: "#111",
            transition: "all 0.2s",
            boxShadow: d ? "0 0 0 3px rgba(201,169,110,0.2)" : "none",
            fontFamily: "inherit",
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
