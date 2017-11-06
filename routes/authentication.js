
module.exports = {

    login: function(req,res){
      res.json(req.user.id);
    },

    register: function(req,res){
      res.json(req.user.id);
    },

    isLoggedIn: function(req, res) {
      if (req.isAuthenticated()){
        res.json(true)
      } else {
        res.json(false)
      }

    }

}
