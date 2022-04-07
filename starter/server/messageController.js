const bcrypt = require("bcryptjs");
let chats = [];

module.exports = {
  createMessage: (req, res) => {
    const { pin, message } = req.body;

    // console.log(pin, message, chats);
    for (let i = 0; i < chats.length; i++) {
      let existing = bcrypt.compareSync(pin, chats[i].pinHash);

      if (existing) {
        chats[i].messages.push(message);
        let messageToReturn = { ...chats[i] };
        delete messageToReturn.pinHash;
        res.status(200).send(messageToReturn);
        return;
      }
    }

    let salt = bcrypt.genSaltSync(5);
    // console.log(salt);
    let pinHash = bcrypt.hashSync(pin, salt);
    console.log(pin, pinHash);

    const newChat = {
      pinHash,
      messages: [message],
    };

    chats.push(newChat);
    let messageToReturn = { ...newChat };
    delete messageToReturn.pinHash;
    res.status(200).send(messageToReturn);
  },
};
