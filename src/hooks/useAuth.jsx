export const useAuth = () => {
    const username = localStorage.getItem("username");
    return { isAuthenticated: !!username }; // Returns true if logged in
  };
  