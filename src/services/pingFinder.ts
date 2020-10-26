import inversify from "inversify";
const { injectable } = inversify;

@injectable()
export default class PingFinder {
    private regexp = "ping";

    public isPing(searchString: string): boolean {
        return searchString.search(this.regexp) >= 0;
    }
}
