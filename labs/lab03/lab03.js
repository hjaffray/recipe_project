import fs from 'fs';
import zlib from 'zlib';

class lab03 {

  syncFileRead(filename) {
    var data = fs.readFileSync(filename);
    return data.toString();
  }

  asyncFileRead(filename, callback) {
        fs.readFile(filename, function (err, data){
          if (err) return console.error(err);
          callback(data.toString());
      });
  }

  compressFileStream(input, output) {
        var outputStream = fs.createReadStream(input)
            .pipe(zlib.createGzip())
            .pipe(fs.createWriteStream(output));

        return outputStream;
  }

  decompressFileStream(input, output) {
        var outputStream = fs.createReadStream(input)
            .pipe(zlib.createGunzip())
            .pipe(fs.createWriteStream(output));
        return outputStream;
  }

  listDirectoryContents(directory, callback) {
        fs.readdir(directory, function(err, data){
            if(err) return console.error(err);
            callback(data);
        });
  }
}

export {lab03};
