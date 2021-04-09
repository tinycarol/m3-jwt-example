import LogoutButton from "./LogoutButton";

export default function UserInfo({ user, onLogout }) {
  if (!user) {
    return null;
  }
  return (
    <span className="navbar-text">
      Hello {user.username}!
      <LogoutButton user={user} onLogout={onLogout} />
    </span>
  );
}
