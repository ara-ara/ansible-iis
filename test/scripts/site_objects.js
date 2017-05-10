// Hold a site
function Site() {
	this.name = "";
	this.ip = "";
	this.port = "";
	this.host = "";
	this.pools = [];
	this.dirs = [];
	this.apps = [];
}

Site.prototype.add_pool = function(pool) {
	this.pools.push(pool);
}

Site.prototype.add_dir = function(dir) {
	this.dirs.push(dir);
}

Site.prototype.add_app = function(app) {
	this.apps.push(app);
}

// Hold a pool
function Pool(name, net, bit) {
	this.name = name;
	this.net = net;
	this.bit = bit;
}

// Hold a virtual directory
function VirtualDir(name, path) {
	this.name = name;
	this.path = path;
}

// Hold an app
function App(name, dest, repo, branch, pool) {
	this.name = name;
	this.dest = dest;
	this.repo = repo;
	this.branch = branch;
  this.pool = pool;
}

function getPools(current_site) {
  $('#pools_wrapper *').filter('.panel-group').each(function() {
    
    var pool_name = $(this).find('[name$=_name]').val();   
    var pool_net = $(this).find('[name$=_net]:checked').val();
    var pool_bit = $(this).find('[name$=_bit]:checked').val();
    
    current_site.pools.push(new Pool(pool_name, pool_net, pool_bit));
  });
}

function getDirs(current_site) {
  $('#apps_wrapper *').filter('.panel-group').each(function() {
    
    // Get array of directories from root
    var full_path = ($(this).find('[name$=_dest]').val());
    var path_array = full_path.split("/");
    
    // Dump the hostname
    path_array.shift();  
    
    // Top level apps. Don't need a virtual directory, so exit function
    if (path_array.length == 1) {
      return;
    }
    
    // All others
    else {
      // Dump the app name since this is handled in getApps
      path_array.pop();
      
      // Loop through array to add a virtual directory for each item left
      // each virtual dir is in relation to those above it
      for (i = 0; i < path_array.length; ++i) {
        dir_name = path_array[i];
        dir_path = "";
      
        for (j = 0; j <= i; ++j) {
          dir_path += path_array[j];
          
          if (j != i)
            dir_path += "\\";
        }
        
        // Add the virtual dir and continue
        current_site.dirs.push(new VirtualDir(dir_name, dir_path));
      }
    }
  });
}

function getApps(current_site) {
  $('#apps_wrapper *').filter('.panel-group').each(function() {
    var app_path = $(this).find('[name$=_dest]').val().split("/");
    var app_repo = $(this).find('[name$=_repo]').val();
    var app_branch = $(this).find('[name$=_branch]').val();
    var app_pool = $(this).find('[name$=_pool]').val();
    
    // Dump hostname and reform destination string as Windows path
    app_path.shift();
    app_dest = "";
    for (i = 0; i < app_path.length; ++i) {
      app_dest += app_path[i];
      
      if (i != app_path.length - 1) {
        app_dest += "\\";
      }
    }
    
    app_name = app_path.pop();

    current_site.apps.push(new App(app_name, app_dest, app_repo, app_branch, app_pool));
  });
}

function cleanForm() {
    // Clear input fields
  $('input[name="site_name"]').val("");
  $('input[name="site_ip"]').val("");
  $('input[name="site_port"]').val("");
  $('input[name="site_host"]').val("");
  
  // Remove dynamically created wrappers
  $('#pools_title').prev('hr').remove();
  $('#pools_title').remove();
  $('#pools_wrapper').remove();
  $('#dirs_title').prev('hr').remove();
  $('#dirs_title').remove();
  $('#dirs_wrapper').remove();
  $('#apps_title').prev('hr').remove();
  $('#apps_title').remove();
  $('#apps_wrapper').remove();
  $('select').prev('label').remove();
  $('select').remove();
  $('#site_apps_wrapper').hide();
}