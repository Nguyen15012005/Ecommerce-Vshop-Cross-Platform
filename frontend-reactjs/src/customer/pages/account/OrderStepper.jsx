import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const steps = [
  { name: "Đã đặt hàng", description: "Đơn hàng đã được tạo", value: "PLACED" },
  {
    name: "Đã xác nhận",
    description: "Shop đang chuẩn bị hàng",
    value: "CONFIRMED",
  },
  {
    name: "Đang giao",
    description: "Đơn hàng đã được vận chuyển",
    value: "SHIPPED",
  },
  {
    name: "Sắp đến",
    description: "Đơn hàng đang trên đường đến bạn",
    value: "ARRIVING",
  },
  { name: "Đã giao", description: "Giao hàng thành công", value: "DELIVERED" },
];

const canceledStep = [
  { name: "Đã đặt hàng", description: "Đơn hàng đã được tạo", value: "PLACED" },
  { name: "Đã hủy", description: "Đơn hàng đã bị hủy", value: "CANCELLED" },
];

const OrderStepper = ({ orderStatus = "SHIPPED" }) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  const currentStep = statusStep.findIndex(
    (step) => step.value === orderStatus,
  );

  return (
    <Box className="mx-auto my-6 w-full">
      <div>
        {statusStep.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isCancelled = step.value === "CANCELLED";
          const isLast = index === statusStep.length - 1;

          return (
            <div key={step.value} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300
                  ${
                    isCancelled && isActive
                      ? "border-red-500 bg-red-500 text-white"
                      : isActive
                        ? "border-[#C9A96E] bg-gradient-to-br from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-white shadow-[0_10px_24px_rgba(201,169,110,0.35)]"
                        : isCompleted
                          ? "border-[#C9A96E] bg-[#FFF7E8] text-[#B88A44]"
                          : "border-[#EADFCB] bg-[#FFFCF6] text-[#C9A96E]"
                  }
                `}
                >
                  {isCancelled && isActive ? (
                    <CancelIcon fontSize="small" />
                  ) : isCompleted || isActive ? (
                    <CheckCircleIcon fontSize="small" />
                  ) : (
                    <FiberManualRecordIcon sx={{ fontSize: 12 }} />
                  )}
                </div>

                {!isLast && (
                  <div
                    className={`h-16 w-[2px] transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-b from-[#C9A96E] to-[#B88A44]"
                        : "bg-[#EADFCB]"
                    }`}
                  />
                )}
              </div>

              <div className="w-full pb-6">
                <div
                  className={`rounded-2xl border px-4 py-3 transition-all duration-300
                  ${
                    isCancelled && isActive
                      ? "border-red-100 bg-red-50"
                      : isActive
                        ? "border-[#C9A96E] bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44] text-white shadow-[0_10px_24px_rgba(201,169,110,0.25)]"
                        : isCompleted
                          ? "border-[#F2E8D7] bg-[#FFF7E8]"
                          : "border-[#F2E8D7] bg-white"
                  }
                `}
                >
                  <p
                    className={`font-bold ${
                      isCancelled && isActive
                        ? "text-red-600"
                        : isActive
                          ? "text-white"
                          : isCompleted
                            ? "text-[#B88A44]"
                            : "text-[#6B4F1D]"
                    }`}
                  >
                    {step.name}
                  </p>

                  <p
                    className={`mt-1 text-xs ${
                      isActive
                        ? "text-[#FFF7E8]"
                        : isCompleted
                          ? "text-[#8B7355]"
                          : "text-[#8B7355]"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default OrderStepper;
