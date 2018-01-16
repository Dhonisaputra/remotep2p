
'use strict';

/*
 *---------------------------------------------------------------
 * SYSTEM FOLDER NAME
 *---------------------------------------------------------------
 *
 * This variable must contain the name of your "system" folder.
 * Include the path if the folder is not in the same  directory
 * as this file.
 *
 */
var system_path = 'system';

/*
 *---------------------------------------------------------------
 * SYSTEM FOLDER NAME
 *---------------------------------------------------------------
 *
 * This variable must contain the name of your "system" folder.
 * Include the path if the folder is not in the same  directory
 * as this file.
 *
 */
 /*
 *---------------------------------------------------------------
 * APPLICATION FOLDER NAME
 *---------------------------------------------------------------
 *
 * If you want this front controller to use a different "application"
 * folder then the default one you can set its name here. The folder
 * can also be renamed or relocated anywhere on your server.  If
 * you do, use a full server path. For more info please see the user guide:
 * http://codeigniter.com/user_guide/general/managing_apps.html
 *
 * NO TRAILING SLASH!
 *
 */
var application_folder = 'application';

global.SELFDIR 	= __dirname+'/';

global.SELF 	= global.SELFDIR+'index.js';

global.EXT 		= '.js';

global.BASEPATH = global.SELFDIR+system_path+'/';

global.FCPATH 	= global.SELFDIR+system_path;

global.SYSDIR 	= global.BASEPATH;

global.APPPATH 	= global.SELFDIR+application_folder+'/';

global.PORT 	= 3000;

global.$_REQUEST = {};

require(global.BASEPATH+'core/Akar.js')

