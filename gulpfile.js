
var path = require('path');
const { watch } = require('gulp');
var gulp = require('gulp');
var fs = require('fs');
var stat = fs.stat;
const nunjucksRender = require('gulp-nunjucks-render')
const rename = require('gulp-rename')
const config = require('./gulpconfig');

// 清空文件夹和删除文件夹一次进行
var deleteFolder = module.exports.deleteFolder= function(path) {
  var files = [];
  if( fs.existsSync(path) ) {
    if(fs.lstatSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach(function(file,index){
          var curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) { // recurse
              deleteFolder(curPath);
          } else { // delete file
              console.log(curPath+'删除完成');
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
      console.log(path+'删除完成');
    }
    else {
      fs.unlinkSync(path);
      console.log(path+'删除完成');
    }
  }
};

/*
05
 * 复制目录中的所有文件包括子目录
06
 * @param{ String } 需要复制的目录
07
 * @param{ String } 复制到指定的目录
08
 */
var copy = function(src, dst) {
  var is_direc = fs.lstatSync(src).isDirectory();// true || false 判断是不是文件夹
  if(is_direc) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function(err, paths) {
      if (err) {
        throw err;
      }
      paths.forEach(function(path) {
        var _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable,
          writable;
        stat(_src, function(err, st) {
          if (err) {
            throw err;
          }
          // 判断是否为文件
          if (st.isFile()) {
            // 创建读取流
            readable = fs.createReadStream(_src);
            // 创建写入流
            writable = fs.createWriteStream(_dst);
            // 通过管道来传输流
            readable.pipe(writable);
          }
          // 如果是目录则递归调用自身
          else if (st.isDirectory()) {
            exists(_src, _dst, copy);
          }
        });
      });
    });
  }
  else {
    stat(src, function(err, st) {
      if (err) {
        throw err;
      }
      // 判断是否为文件
      if (st.isFile()) {
        // 创建读取流
        readable = fs.createReadStream(src);
        // 创建写入流
        writable = fs.createWriteStream(dst);
        // 通过管道来传输流
        readable.pipe(writable);
        console.log(src+'拷贝完成')
      }
      // 如果是目录则递归调用自身
      else if (st.isDirectory()) {
x      }
    });
  }
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function(src, dst, callback) {
  fs.exists(dst, function(exists) {
    // 已存在
    if (exists) {
      callback(src, dst);
    }
    // 不存在
    else {
      if(fs.lstatSync(src).isDirectory()){
        fs.mkdir(dst, function() {
          callback(src, dst);
          console.log(dst+'新建完成');
        });
      }
      else {
        fs.writeFile(dst,'','utf8',function(err){
          if(err){
              console.log(err)
              return false
          }
          console.log(dst+'新建完成');
          callback(src, dst);
        })
      }
    }
  });
};
function types(cb){
  const watcher = watch(['src/models/**/**']);

   //拷贝修改过的文件/Users/liumengmei/Documents/GitHub/ems-view2/src
   exists(path.join(__dirname, './src/models'), path.join(__dirname, config.typesPath+'/models'), copy);
   // 文件变化
   watcher.on('change',function(filepath, stats){
     exists(path.join(__dirname, filepath), path.join(__dirname, filepath.replace('src',config.typesPath)), copy)
   })
   // 新增文件
   watcher.on('add',function(filepath, stats) {
     exists(path.join(__dirname, filepath), path.join(__dirname, filepath.replace('src',config.typesPath)), copy)
   })
   // 新增文件夹
   watcher.on('addDir',function(filepath, stats) {
     exists(path.join(__dirname, filepath), path.join(__dirname, filepath.replace('src',config.typesPath)), copy)
   })
   // 删除文件
   watcher.on('unlink',function(filepath, stats) {
     const newPath = path.join(__dirname, filepath);
     const copyPath = path.join(__dirname, filepath.replace('src',config.typesPath));
     deleteFolder(newPath)
     deleteFolder(copyPath)
   })
   // 删除文件夹
   watcher.on('unlinkDir',function(filepath, stats) {
     const newPath = path.join(__dirname, filepath);
     const copyPath = path.join(__dirname, filepath.replace('src',config.typesPath));
     deleteFolder(newPath)
     deleteFolder(copyPath)
   })
 cb();
}

function code(cb) {
  const nunjucksRenderConfig = {
    path: 'templates/server',
    envOptions: {
      tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
      },
    },
    ext: '.js',
    data:{
      model:[{
        name:'a'
      },{
        name:'b'
      }]
    }
  }
  const tplfile = 'templates/model.ts';
  const watcher = watch([tplfile]);
  watcher.on('change',function (filepath, stats) {
    delete require.cache[path.join(__dirname+'/'+filepath)];
    const data = require(path.join(__dirname+'/'+filepath));
    for (const iterator of data) {
      // 以每个生成一个文件
      // filename filepath
      nunjucksRenderConfig.data = {model: iterator.model};
      console.log(iterator.data);
      gulp.src('./templates/tpl.njk')
      .pipe(nunjucksRender(nunjucksRenderConfig))
      .pipe(rename('index.ts'))
      .pipe(gulp.dest(config.codePath+iterator.filepath+'services/'));
      console.log(iterator.filepath+ '请求已更新')
    }
  })
  cb();
}

exports.types = types;
exports.code = code;
// exports.default = defaultTask;