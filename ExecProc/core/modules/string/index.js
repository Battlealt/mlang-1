const Interface = require("../../interface");

module.exports = class StringUtil extends Interface {
    constructor(...args) {
        super(...args);

        const stringFunctions = {
            "indexof": (args)=>{
                this.expectArguments(2, args, "indexof", "string", true);
                
                const stmo = this.getArgumentObjectAt(args, 0);
                const char = this.getArgumentObjectAt(args, 1);
                
                this.typeAssertError("STRING", stmo, "indexof", "string");
                this.typeAssertError("STRING", char, "indexof", "string");
                
                return this.createToken("NUMBER", stmo?.value.indexOf(char?.value), this.getPositionObject());
            },
            
            "at": (args)=>{
                this.expectArguments(2, args, "at", "string", true);
                
                const stmo = this.getArgumentObjectAt(args, 0);
                const char = this.getArgumentObjectAt(args, 1);
                
                this.typeAssertError("STRING", stmo, "at", "string");
                this.typeAssertError("NUMBER", char, "at", "string");
                
                return this.createToken("STRING", stmo[char?.value] || "", this.getPositionObject());
            },
            
            "slice": (args)=>{
                this.expectArguments(2, args, "slice", "string", true);
                
                const stmo = this.getArgumentObjectAt(args, 0);
                
                const si1 = this.getArgumentObjectAt(args, 1);
                const si2 = this.getArgumentObjectAt(args, 2) || this.getTokenFrom(stmo?.value?.length);
                
                this.typeAssertError("STRING", stmo, "index", "string");
                this.typeAssertError("NUMBER", si1, "index", "string");
                this.typeAssertError("NUMBER", si2, "index", "string");
                
                return this.createToken("STRING", stmo?.value.slice(si1?.value, si2?.value), this.getPositionObject());
            },

			"substring": (args)=>{
				this.expectArguments(2, args, "substring", "string", true);
				
				const stmo = this.getArgumentObjectAt(args, 0);
				
				const si1 = this.getArgumentObjectAt(args, 1);
				const si2 = this.getArgumentObjectAt(args, 2) || this.getTokenFrom(stmo?.value?.length);
				
				this.typeAssertError("STRING", stmo, "index", "string");
				this.typeAssertError("NUMBER", si1, "index", "string");
				this.typeAssertError("NUMBER", si2, "index", "string");
				
				return this.createToken("STRING", stmo?.value.substring(si1?.value, si2?.value), this.getPositionObject());
			},

			"substr": (...args)=>{stringFunctions["substring"](...args)},
            
            "match": (args)=>{
                this.expectArguments(2, args, "match", "string", true); // spec
                
                let stmo = this.getArgumentObjectAt(args, 0);
                let stm  = this.getArgumentObjectAt(args, 1);
        
                this.typeAssertError("STRING", stmo, "match", "string"); // spec
                this.typeAssertError("STRING", stm, "match", "string"); // spec
        
                stmo = stmo.value;
                stm = stm.value;
                
                const matchWith = new RegExp(stm);

                return this.createToken("STRING", stmo.match(matchWith)?.[0].toString?.() || "", this.getPositionObject());
            }
        }

        for (let fname in stringFunctions) {
            this.createFunction("string::"+fname, stringFunctions[fname]);
        }
    }
}