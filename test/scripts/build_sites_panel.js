function buildSitesPanel(current_site) {
  if ($("#sites_panel").length == 0) {
    $("#add_site_wrapper").after(`
    <hr />
		<div class="row">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<h2 class="text-info text-center"><strong>Sites</strong></h2>
			</div>
			<div class="col-md-2"></div>
		</div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="panel-group" id="sites_panel">
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
    `);
  }
  
  // Add Overall site info
  buildSiteInfo(current_site);
  
  // Add Site pools
  buildSitePools(current_site.name, current_site.pools);
  
  // Add Site dirs
  //buildSiteDirs(current_site.name, current_site.dirs);
  
  // Add Site apps
  buildSiteApps(current_site.name, current_site.apps);
}

function buildSiteInfo(current_site) {
  $("#sites_panel").append(`
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title text-center">
        <a data-toggle="collapse" href="#collapse_${current_site.name}"><strong>${current_site.name}</strong></a>
      </h4>
    </div>
    <div id="collapse_${current_site.name}" class="panel-collapse collapse">
      <div class="panel-body">
        <div class="panel-group">
          <div class="panel panel-info" id="${current_site.name}_info">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a data-toggle="collapse" href="#collapse_${current_site.name}_info">Site Information</a>
              </h4>
            </div>
            <div id="collapse_${current_site.name}_info" class="panel-collapse collapse">
              <div class="panel-body">
                <div class="form-group">
                  <label>Site Name:</label>
                  <input type="text" class="form-control" name="site_${current_site.name}_name" value="${current_site.name}" readonly>
                </div>
                <div class="form-group">
                  <label>IP Address to access site:</label>
                  <input type="text" class="form-control" name="site_${current_site.name}_ip" value="${current_site.ip}" readonly>
                </div>
                <div class="form-group">
                  <label>Port to access site by:</label>
                  <input type="text" class="form-control" name="site_${current_site.name}_port" value="${current_site.port}" readonly>
                </div>
                <div class="form-group">
                  <label>Hostname:</label>
                  <input type="text" class="form-control" name="site_${current_site.name}_host" value="${current_site.host}" readonly>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `);
}

function buildSitePools(site_name, pools) {
  $(`#${site_name}_info`).after(`
  <div class="panel panel-info" id="${site_name}_pools">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" href="#collapse_${site_name}_pools">Application Pools</a>
      </h4>
    </div>
    <div id="collapse_${site_name}_pools" class="panel-collapse collapse">
      <div class="panel-body">
        <div class="panel-group" id="site_${site_name}_pools_group"></div>
      </div>
    </div>
  </div>
  `); 
  
  $(pools).each(function(i, pool) {
    var safe_pool_name = pool.name.replace(/ /g, "_");
    
    $(`#site_${site_name}_pools_group`).append(`
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title text-center">
          <a data-toggle="collapse" href="#collapse_${site_name}_pools_${safe_pool_name}"><strong>${pool.name}</strong></a>
        </h4>
      </div>
      <div id="collapse_${site_name}_pools_${safe_pool_name}" class="panel-collapse collapse">
        <div class="panel-body">
          <div class="form-group">
            <label>Pool Name:</label>
            <input type="text" class="form-control" name="site_${site_name}_pool_${safe_pool_name}_name" value="${pool.name}" readonly>
          </div>
          <div class="form-group">
            <label>.Net Version:</label><br/>
            <label class="radio-inline">
              <input type="radio" name="site_${site_name}_pool_${safe_pool_name}_net" value="2.0">2.0
            </label>
            <label class="radio-inline">
              <input type="radio" name="site_${site_name}_pool_${safe_pool_name}_net" value="4.0">4.0
            </label>
          </div>
          <div class="form-group">
            <label>32 Bit Application Support:</label><br/>
            <label class="radio-inline">
              <input type="radio" name="site_${site_name}_pool_${safe_pool_name}_bit" value="Yes">Yes
            </label>
            <label class="radio-inline">
              <input type="radio" name="site_${site_name}_pool_${safe_pool_name}_bit" value="No">No
            </label>
          </div>
        </div>
      </div>
    </div>
    `);
    
    if (pool.net == "4.0") {
			$(`input[name="site_${site_name}_pool_${safe_pool_name}_net"][value="4.0"]`).prop("checked", true);
      $(`input[name="site_${site_name}_pool_${safe_pool_name}_net"][value="2.0"]`).prop("disabled", true);
    }
		else {
			$(`input[name="site_${site_name}_pool_${safe_pool_name}_net"][value="2.0"]`).prop("checked", true);
      $(`input[name="site_${site_name}_pool_${safe_pool_name}_net"][value="4.0"]`).prop("disabled", true);
		}
    
		if (pool.bit == "No") {
			$(`input[name="site_${site_name}_pool_${safe_pool_name}_bit"][value="No"]`).prop("checked", true);
      $(`input[name="site_${site_name}_pool_${safe_pool_name}_bit"][value="Yes"]`).prop("disabled", true);
    }
		else {
			$(`input[name="site_${site_name}_pool_${safe_pool_name}_bit"][value="Yes"]`).prop("checked", true);
      $(`input[name="site_${site_name}_pool_${safe_pool_name}_bit"][value="No"]`).prop("disabled", true);
    }
  });
}

function buildSiteDirs(site_name, dirs) {
  $(`#${site_name}_pools`).after(`
  <div class="panel panel-info" id="${site_name}_dirs">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" href="#collapse_${site_name}_dirs">Virtual Directories</a>
      </h4>
    </div>
    <div id="collapse_${site_name}_dirs" class="panel-collapse collapse">
      <div class="panel-body">
        <div class="panel-group" id="site_${site_name}_dirs_group"></div>
      </div>
    </div>
  </div>
  `);
  
  $(dirs).each(function(i, dir) {
    $(`#site_${site_name}_dirs_group`).append(`
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title text-center">
          <a data-toggle="collapse" href="#collapse_${site_name}_dirs_${dir.name}"><strong>${dir.name}</strong></a>
        </h4>
      </div>
      <div id="collapse_${site_name}_dirs_${dir.name}" class="panel-collapse collapse">
        <div class="panel-body">
          <div class="form-group">
            <label>Directory Name:</label>
            <input type="text" class="form-control" name="site_${site_name}_dir_${dir.name}_name" value="${dir.name}" readonly>
          </div>
          <div class="form-group">
            <label>Directory Path:</label>
            <input type="text" class="form-control" name="site_${site_name}_dir_${dir.name}_path" value="${dir.path}" readonly>
          </div>
        </div>
      </div>
    </div>
    `);
  });
}

function buildSiteApps(site_name, apps) {
  $(`#${site_name}_pools`).after(`
  <div class="panel panel-info" id="${site_name}_apps">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" href="#collapse_${site_name}_apps">Applications</a>
      </h4>
    </div>
    <div id="collapse_${site_name}_apps" class="panel-collapse collapse">
      <div class="panel-body">
        <div class="panel-group" id="site_${site_name}_apps_group"></div>
      </div>
    </div>
  </div>
  `);
  
  $(apps).each(function(i, app) {
    $(`#site_${site_name}_apps_group`).append(`
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title text-center">
          <a data-toggle="collapse" href="#collapse_${site_name}_apps_${app.name}"><strong>${app.name}</strong></a>
        </h4>
      </div>
      <div id="collapse_${site_name}_apps_${app.name}" class="panel-collapse collapse">
        <div class="panel-body">
          <div class="form-group">
            <label>Application Path:</label>
            <input type="text" class="form-control" name="site_${site_name}_app_${app.name}_dest" value="${app.dest}" readonly>
          </div>
          <div class="form-group">
            <label>Application Repository:</label>
            <input type="text" class="form-control" name="site_${site_name}_app_${app.name}_repo" value="${app.repo}" readonly>
          </div>
          <div class="form-group">
            <label>Repository Branch:</label>
            <input type="text" class="form-control" name="site_${site_name}_app_${app.name}_branch" value="${app.branch}" readonly>
          </div>
          <div class="form-group">
            <label>Application Pool:</label>
            <input type="text" class="form-control" name="site_${site_name}_app_${app.name}_pool" value="${app.pool}" readonly>
          </div>
        </div>
      </div>
    </div>
    `); 
  });
}
