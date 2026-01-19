import React, { useState, useRef } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../helper/AuthContext";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { POST_APIS } from "../../../connection";
import { Toast } from "primereact/toast";

export default function AdminLogin() {
  const toast = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await ApiService(POST_APIS.login, {
        method: "POST",
        body: { email: adminEmail, password: adminPassword },
      });
      
      if (response.isSuccess && response.data) {
        const role = response.data.role;
        if (role === "admin") {
          const loginSuccess = login(response.data); // Update context with user data
          if (loginSuccess) {
            toast.current.show({
              severity: "success",
              summary: "Login Successful",
              detail: response.message || "Welcome back, Admin!",
            });
            navigate("/admin/dashboard");
          }
        } else {
          toast.current.show({
            severity: "error",
            summary: "Access Denied",
            detail: "This account does not have admin privileges.",
          });
        }
      } else {
        toast.current.show({
          severity: "error",
          summary: "Login Failed",
          detail: response.message || "Invalid credentials.",
        });
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Login Error",
        detail: err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <Toast ref={toast} />
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-orange-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-sm text-gray-500 mt-2">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showAdminPassword ? "text" : "password"}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowAdminPassword(!showAdminPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showAdminPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed cursor-pointer shadow-sm"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
