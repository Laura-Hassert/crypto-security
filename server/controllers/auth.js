const bcrypt = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const authenticated = bcrypt.compareSync(password, users[i].passHash)
          if (authenticated) {
            let userToReturn = { ... users[i]}
            delete userToReturn.passHash
            res.status(200).send(userToReturn)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const { username, firstName, lastName, email, password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const newHash = bcrypt.hashSync(password, salt);
        const newReg = {
          email,
          firstName,
          lastName,
          passHash: newHash,
          username
        }

        users.push(newReg)
        res.status(200).send(users)
    }
}