const { MarkovMachine } = require("./markov.js")

describe("testMarkoMachine", function () {
    test("test if the words is combined from chain", function() {
        const mm = new MarkovMachine("this cat in the hat");
        expect(mm.words).toEqual(['this', 'cat', 'in', 'the', 'hat']);
    });
    test("test if 'chains' splits the words from 'words'", function () {
        const mm = new MarkovMachine("this cat in the hat");
        expect(mm.chains).toEqual(new Map([
            ['this', ['cat']],
            ['cat', ['in']],
            ['in', ['the']],
            ['the', ['hat']],
            ['hat', [null]]
        ]));
    });

    test('test if duplicate words are combined to 1 array', function() {
        let mm = new MarkovMachine("the cat in the hat");

        expect(mm.chains).toEqual(new Map([
            ["the", ["cat", "hat"]],
            ["cat", ["in"]],
            ["in", ["the"]],
            ["hat", [null]]
        ]));
    });
})
