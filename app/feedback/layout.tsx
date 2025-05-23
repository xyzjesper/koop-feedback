"use client";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function checkSession() {
      const req = await fetch("/api/v1/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();

      if (res.error) {
        window.location.href = "/";
      }
      if (res.success) {
        return;
      }
    }
    checkSession();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      ></ToastContainer>
      {children}
    </>
  );
}
