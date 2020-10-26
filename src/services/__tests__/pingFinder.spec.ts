import PingFinder from "../pingFinder";

describe("PingFinder", () => {
    let pingFinder: PingFinder;

    beforeEach(() => {
        pingFinder = new PingFinder();
    });

    it.each([
        [true, "found", "message contains ping somewhere in it"],
        [false, "not found", "regular boring old message"],
    ])("returns %s when string %s", (returnValue, result, message) => {
        const response = pingFinder.isPing(message);

        expect(response).toBe(returnValue);
    });
});
