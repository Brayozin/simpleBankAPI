
var accounts = {};




exports.getBalance = (req, res) => {
  try {
    const id = req.query.account_id;
    if (!accounts[id]) {
      res.status(404).json(0);
    } else {
      res.status(200).json(accounts[id].balance);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


/**
 * @param {Request} req
 * events: deposit, withdraw, transfer, cc
 */
exports.handleEvents = (req, res) => {
  try {
    const { type, origin, destination, amount } = req.body;

    switch (type) {
      case "deposit":
        accounts[destination] = accounts[destination] || {
          id: destination,
          balance: 0,
        };
        accounts[destination].balance += amount;
        res.status(201).json({ destination: accounts[destination] });
        break;
      case "withdraw":
        if (!accounts[origin]) {
          res.status(404).json(0);
        } else {
          accounts[origin].balance -= amount;
          res.status(201).json({ origin: accounts[origin] });
        }
        break;
      case "transfer":
        const originAccount = accounts[origin];
        if (!originAccount) {
          res.status(404).json(0);
        } else {
          originAccount.balance -= amount;

          accounts[destination] = accounts[destination] || {
            id: destination,
            balance: 0,
          };
          accounts[destination].balance += amount;
          res.status(201).json({
            origin: originAccount,
            destination: accounts[destination],
          });
        }
        break;
      case "cc":
        if (!accounts[destination]) {
          res.status(404).json(0);
        } else {
          accounts[destination].balance += amount;
          res.status(201).json({ destination: accounts[destination] });
        }
        break;
      default:
        res.status(400).json({ message: "Invalid event type" });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.resetAccounts = (req, res) => {
  try {
    accounts = [];
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
