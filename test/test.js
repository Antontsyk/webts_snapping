describe("My Name Is", () => {
    var myNameIs = function(a, b){
        return a+b;
    }
    it("should return my name", function() {
        expect(myNameIs(1,4)).toBe(5);
    });
    it("should return my name", function() {
        expect(myNameIs(1,4)).toBe( 3 );
    });

});