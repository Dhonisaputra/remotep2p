global.ENVIRONMENT = 'development';

var now = __dirname;
var splittingDir = now.split('\\');
splittingDir.pop();


var $base = splittingDir.join('\\')+'\\';
var $application_folder = $base+'application\\';
var $system_folder = $base+'system\\';



global.APPPATH = $application_folder;
global.SYSPATH = $system_folder;
global.BASEPATH = $base;

const DATAA = "asfasd";

