import { type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, type User } from "../services/authService";

type LoginPageProps = {
  onLoginSuccess: (user: User) => void;
};

function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const user = await login(username, password);
      onLoginSuccess(user);
      navigate("/");
    } catch {
      setErrorMessage(
        "로그인에 실패했습니다. 아이디와 비밀번호를 확인해 주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-12 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="text-lg font-bold text-slate-900">로그인</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          아이디
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base font-normal text-black outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          비밀번호
          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base font-normal text-black outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
          />
        </label>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-black shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
