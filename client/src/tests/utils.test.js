import * as utils from '../utils';

describe("Utils tests:", () => {
    describe("Testing myIsObject(): ", () => {
        it("Should return true if parameter is an object", () => {
            expect(utils.myIsObject({a:1, b:2, c:3})).toBe(true);
        });
        it("Should return true if parameter is an empty object", () => {
            expect(utils.myIsObject({})).toBe(true);
        });
        it("Should return false if parameter is an array", () => {
            expect(utils.myIsObject([2,3,4])).toBe(false);
        });
        it("Should return false if parameter is an emtpy array", () => {
            expect(utils.myIsObject([])).toBe(false);
        });
        it("Should return false if parameter is null", () => {
            expect(utils.myIsObject(null)).toBe(false);
        });
        it("Should return false if parameter is undefined", () => {
            expect(utils.myIsObject(undefined)).toBe(false);
        });
        it("Should return false if parameter is empty", () => {
            expect(utils.myIsObject()).toBe(false);
        });
        
    })

    describe("Testing myReplaceWhiteSpace(): ", () => {
        it("Should return same string where white spaces are replaced with \"_\"", () => {
            expect(utils.myReplaceWhiteSpace("board games")).toBe("board_games");
            expect(utils.myReplaceWhiteSpace("Massive Multiplayer Online")).toBe("Massive_Multiplayer_Online");
        })
        it("Should return same string if no white spaces are found", () => {
            expect(utils.myReplaceWhiteSpace("board")).toBe("board");
            expect(utils.myReplaceWhiteSpace("Massive_Multiplayer_Online")).toBe("Massive_Multiplayer_Online");
        })
        it("Should trim leading and trailing white spaces", () => {
            expect(utils.myReplaceWhiteSpace("   board games")).toBe("board_games");
            expect(utils.myReplaceWhiteSpace("Massive_Multiplayer Online  ")).toBe("Massive_Multiplayer_Online");
            expect(utils.myReplaceWhiteSpace(" board ")).toBe("board");
        })
        it("Should return an empty string if receiving an empty string or white space", () => {
            expect(utils.myReplaceWhiteSpace("  ")).toBe("");
            expect(utils.myReplaceWhiteSpace("")).toBe("");
        })
        it("Should throw error if no string is given", () => {
            expect(()=>{utils.myReplaceWhiteSpace()}).toThrow();
            expect(()=>{utils.myReplaceWhiteSpace(["string"])}).toThrow();
            expect(()=>{utils.myReplaceWhiteSpace(null)}).toThrow();
            expect(()=>{utils.myReplaceWhiteSpace({a:1})}).toThrow();
            expect(()=>{utils.myReplaceWhiteSpace(undefined)}).toThrow();
            expect(()=>{utils.myReplaceWhiteSpace(true)}).toThrow();
            expect(()=>{utils.myReplaceWhiteSpace(1)}).toThrow();
            expect(()=>{utils.myReplaceWhiteSpace(4.5)}).toThrow();
        })
    })

    describe("Testing sorting compare functions", () => {
        const alphabeticArr = ['a','z','Z','y','b','d','c','1','2','10','1 z',"Arjona"];
        const alphaAscArr = alphabeticArr.sort(); /* ['1','1 z','10','2','Arjona','Z','a','b','c','d'] */
        const alphaDescArr = []; 
        alphaAscArr.forEach(el => alphaDescArr.unshift(el));
        const numericalArr = [2,1,0,4,5.5,5.4,5.7,6,10,20,21,-1,15];
        const numAscArr = [-1,0,1,2,4,5.4,5.5,5.7,6,10,15,20,21];
        const numDescArr = [];
        numAscArr.forEach(el => numDescArr.unshift(el));
        describe("mySortAscendingComparingFunc():", () => {
            it("Should order alphabetically from A-Z", () => {
                expect(alphabeticArr.sort((a,b) => utils.mySortAscendingComparingFunc(a,b))).toEqual(alphaAscArr);
            })
            it("Should order numbers from smaller to larger", () => {
                expect(numericalArr.sort((a,b) => utils.mySortAscendingComparingFunc(a,b))).toEqual(numAscArr);
            })
        })
        describe("mySortDescendingComparingFunc():", () => {
            it("Should order alphabetically from Z-A", () => {
                expect(alphabeticArr.sort((a,b) => utils.mySortDescendingComparingFunc(a,b))).toEqual(alphaDescArr);
            })
            it("Should order numbers from larger to smaller", () => {
                expect(numericalArr.sort((a,b) => utils.mySortDescendingComparingFunc(a,b))).toEqual(numDescArr);
            })
        })
    })
})