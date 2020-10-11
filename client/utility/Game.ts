export default class Game {

    private username = "Alan";

    public setUsername(username: string): void {
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }
}
