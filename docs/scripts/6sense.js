let _6si = {
    visitorDataStub: {
        "company": {
            "revenue_range": "$10M - $25M",
            "country": "United States",
            "city": "San Francisco",
            "employee_range": "50 - 99",
            "domain": "6sense.com",
            "name": "6sense",
            "industry": "Software and Technology",
            "state": "California",
            "region": "Northern America"
        },
        "segments": [
            "Comapny Visted last 30d",
            "Companies researching COmpetitors",
            "Companies using SF"
        ],
        "scores": {
            ["PRODUCT 1"]: {
                "profile_fit": "Weak",
                "buying_stage": "Target",
                "profile_score": "9",
                "intent_score": "0"
            },
            ["PRODUCT 2"]: {
                "profile_fit": "Strong",
                "buying_stage": "Purchase",
                "profile_score": "9",
                "intent_score": "0"
            }
        }
    },

    push(args){
        let cb = args[2];
        cb(this.visitorDataStub);
        // console.log(args);
        // setTimeout(cb, 1000, this.visitorDataStub);
    }
}

window._6si = _6si;