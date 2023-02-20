dbMap:
    var mapFunc = function(){ 
        emit(
          {longitudeValue: Math.floor(this.location.longitude)},
          {count: 1});
    }
    
    var reduceFunc = function(longitudeValue, values) {

        var cityCount = Array.sum(values); 
        return {count: cityCount.length};
    }

    db.cities.mapReduce(
        mapFunc,
        reduceFunc,
        { out: {inline: 1}} 
    )
