import React from "react";

const StepProgress = ({ currentPage }) => {
const UserIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>

);

const PencilIcon = (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
</svg>

);

const CreditCardIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="size-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect
      width="18"
      height="12"
      x="3"
      y="6"
      rx="2"
      ry="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
  </svg>
);

// แล้วเอามาใช้ใน steps แบบนี้:
const steps = [
  { id: 1, title: "Store Information", baseIcon: UserIcon },
  { id: 2, title: "Verify Identity", baseIcon: PencilIcon },
  { id: 3, title: "Account Payment", baseIcon: CreditCardIcon },
];

  const getStatus = (index) => {
    if (index < currentPage) return "completed";
    if (index === currentPage) return "in-progress";
    return "pending";
  };

  const CheckIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


  const statusStyles = {
    completed: {
      icon: CheckIcon,
      border: "border-green-500",
      bg: "bg-green-500",
      text: "text-green-700",
      line: "bg-green-500",
    },
    "in-progress": {
      icon: null,
      border: "border-purple-500",
      bg: "bg-white",
      text: "text-purple-600",
      line: "bg-purple-500",
    },
    pending: {
      icon: null,
      border: "border-gray-300",
      bg: "bg-white",
      text: "text-gray-400",
      line: "bg-gray-300",
    },
  };

  return (
    <div className="flex items-center justify-between max-w-5xl px-2 my-6">
      {steps.map((step, index) => {
        const status = getStatus(index);
        const style = statusStyles[status];
        const nextStep = steps[index + 1];
        const nextLineColor = nextStep ? statusStyles[getStatus(index + 1)].line : "bg-transparent";

        return (
          <div key={step.id} className="flex-1 relative flex flex-col items-center">
            <div
              className={`${style.bg} ${style.border} border-4 rounded-full w-10 h-10 flex items-center justify-center z-10 relative`}
              aria-label={`${step.title} - ${status}`}
              role="img"
            >
              {status === "completed" ? (
                <span className={`text-lg ${style.text}`}>{style.icon}</span>
              ) : (
                <span className={`text-lg ${style.text}`}>{step.baseIcon}</span>
              )}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`absolute top-6 right-0 h-1 ${nextLineColor}`}
                style={{ width: "100%", left: "50%", transform: "translateX(0%)" }}
              />
            )}

            <div className="text-center mt-3">
              <p className="text-xs font-semibold text-gray-500 tracking-widest">
                STEP {step.id}
              </p>
              <p className="text-sm font-semibold text-gray-800">{step.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
