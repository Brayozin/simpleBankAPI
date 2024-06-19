export default class Account extends Model {
    constructor(id, balance) {
        super();
        this.id = id;
        this.balance = balance;
        this.transactions = [];
    }
}
