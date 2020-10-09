export default class Game {

    private username: string = "Alan";

    public setUsername(username: string) {
        this.username = username;
    }

    public getUsername() {
        return this.username;
    }
}
