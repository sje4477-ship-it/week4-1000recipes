import { Link } from "react-router-dom";
import type { User } from "../services/authService";

type HeaderProps = {
  user: User | null;
  onLogout: () => void;
};

function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <Link to="/" className="text-lg font-bold text-slate-900">
        천개의 레시피
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-700">{user.displayName}님</span>
          <Link
            to="/mypage"
            className="rounded-sm border border-gray-300 bg-white px-4 py-1 text-sm font-semibold text-black shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
          >
            마이페이지
          </Link>
          <button
            type="button"
            className="rounded-sm border border-gray-300 bg-white px-4 py-1 text-sm font-semibold text-black shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
            onClick={onLogout}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="rounded-sm border border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-black shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
        >
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
