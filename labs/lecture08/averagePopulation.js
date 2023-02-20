db.cities.aggregate([
    {
        $match: {
            'timezone': {
                $eq: 'Europe/London'
            }
        }
    },
    {
        $group: {
            _id: 'averagePopulation',
            avgPop: {
                $avg: '$population'
            }
        }
    }
])


/*
testing things
*/

// db.cities.count([
//     {
//         $match: {
//             'timezone': {

//             }
//         }
//     }
// ])
db.cities.findOne({timezone: "Europe/Andorra"})

db.cities.find({$and: [{"timezone": "Europe/Andorra"}, {"population": {$lt:2000}}]}).pretty()

var testIT = db.cities.find().pretty()

//var mySearch = testIT.find().sort({this.location.longitude}).pretty()
while(testIT.hasNext()){
    //print(tojson(testIT.next()))
}

/*
skratch code for reduce function
*/

var i = 0;
while(i < values.length){

}
var reduceFunc = function(key, values){
    var numOccur = 0;
    values.reduce((numOccur, element) => {
        if(element == values.longValue){
           return numOccur++;
        } else {
            return numOccur;
        }
    });
}

/* Old Emit code (probs doesn't work)
    //name: this.name,
            {longValue: Math.floor(this.location.longitude)}, //key
            {count: 1} //value
*/
/* Broken reduce(s)
    var citiesCount = 0;
        for (var i = 0; i < values.length; i++){
            citiesCount++;
            
            return {'Current Count': citiesCount};
            // var data = values[i];
        //    if('total'== data){
        //         total+= data.total;
        //    } else {
        //     total += data.count;
        //    }
        }
        return;

                let countArray = [];

        values.forEach((x)=>{
            if(countArray.some((cityVal)=> {return cityVal[key.longValue] == x[key.longValue]})){// check if the longitude val is present
                countArray.forEach((y)=> {
                    if(y[key.longValue] == x[key.longValue]){
                        y["Occurs"]++;
                    }
                })
            } else {
                let a = {};
                a[key.longValue] = x[key.longValue];
                a["Occurs"] = 1;
                countArray.push(a);
            }
        })
        return countArray;
*/



/*
 emit({
            longValue : Math.floor(this.location.longitude)
        }, {
            count : 1
        });
*/
       // var longVal = Math.floor(this.location.longitude)
