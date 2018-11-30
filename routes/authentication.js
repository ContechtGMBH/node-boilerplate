export const login = (req, res) => {
  res.json(req.user.id);
}

export const register = (req, res) => {
  res.json(req.user.id);
}

export const isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    res.json(true)
  } else {
    res.json(false)
  }

}
