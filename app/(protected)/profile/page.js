"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Загрузка профиля
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await AuthService.getProfile();
        setUser(data);
      } catch (err) {
        console.error("Ошибка при получении профиля:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.push("/login");
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="login-container">
      <h1 className="login-title">Профиль пользователя</h1>
      {user && (
        <div className="profile-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Имя:</strong> {user.username}
          </p>
        </div>
      )}

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
