import { Avatar, Button, Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const UserDetails = () => {
  const { profile: user } = useSelector((state) => state.user);

  const handleEditProfile = () => {
    alert("Chức năng chỉnh sửa hồ sơ sẽ được hoàn thiện sau");
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-5 rounded-[24px] border border-[#F2E8D7] bg-gradient-to-r from-[#FFFDF8] to-[#FAF5EA] p-5 shadow-[0_10px_35px_rgba(201,169,110,0.10)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <Avatar
            sx={{
              width: 84,
              height: 84,
              fontSize: 32,
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #D6B57A 0%, #C9A96E 50%, #B88A44 100%)",
            }}
          >
            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B88A44]">
              Personal Profile
            </p>

            <h1 className="text-2xl font-bold text-[#3B2B12]">
              {user?.fullName || "Người dùng"}
            </h1>

            <p className="mt-1 text-sm text-[#8B7355]">
              Quản lý thông tin tài khoản cá nhân
            </p>
          </div>
        </div>

        <Button
          onClick={handleEditProfile}
          startIcon={<EditIcon />}
          variant="contained"
          sx={{
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, #D6B57A 0%, #C9A96E 50%, #B88A44 100%)",
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Chỉnh sửa
        </Button>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-[#F2E8D7] bg-white shadow-[0_8px_30px_rgba(201,169,110,0.08)]">
        {[
          {
            icon: <PersonOutlineOutlinedIcon />,
            label: "Họ và tên",
            value: user?.fullName || "Chưa cập nhật",
          },
          {
            icon: <EmailOutlinedIcon />,
            label: "Email",
            value: user?.email || "Chưa cập nhật",
          },
          {
            icon: <PhoneOutlinedIcon />,
            label: "Số điện thoại",
            value: user?.phone || user?.mobile || "Chưa cập nhật",
          },
        ].map((item, index) => (
          <React.Fragment key={item.label}>
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7E8] text-[#B88A44]">
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#B88A44]">
                  {item.label}
                </p>

                <p className="mt-1 break-words text-base font-semibold text-[#3B2B12]">
                  {item.value}
                </p>
              </div>
            </div>

            {index < 2 && <Divider sx={{ borderColor: "#F2E8D7" }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
