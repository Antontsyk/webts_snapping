import {
    getHelloWorld,
    ilOverwriteHELLO_WORLD,
    ilResetAll
} from 'import-inject-loader?HELLO_WORLD!src/injectTest/hello';

describe('getHelloWorld()', () => {
    it('should return "Hello world!"', () => {
        expect(getHelloWorld()).toBe('Hello world!');
    });

    it('should return "Mocked world!"', () => {
        ilOverwriteHELLO_WORLD('Mocked world!');
        expect(getHelloWorld()).toBe('Mocked world!');
    });

    afterEach(ilResetAll);
});