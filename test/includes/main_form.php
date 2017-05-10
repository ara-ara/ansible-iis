<div class="row">
	<div class="col-md-2"></div>
	<div class="col-md-8">
		<h2 class="text-info text-center"><strong>Create New Site</strong></h2>
	</div>
	<div class="col-md-2"></div>
</div>
<div class="row">
	<div class="col-md-2"></div>
	<div class="col-md-8">	
		<div class="panel-group">
			<div class="panel panel-info">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" href="#collapse_info">Site Information</a>
					</h4>
				</div>
				<div id="collapse_info" class="panel-collapse collapse in">
					<div class="panel-body">
						<div class="form-group">
							<label>Site Name:</label>
							<input type="text" class="form-control" name="site_name" placeholder="Enter site name">
						</div>
						<div class="form-group">
							<label>IP Address to access site:</label>
							<input type="text" class="form-control" name="site_ip" placeholder="Enter ip address (leave blank for any)">
						</div>
						<div class="form-group">
							<label>Port to acces site by:</label>
							<input type="text" class="form-control" name="site_port" placeholder="Enter port number (leave blank for default 80)">
						</div>
						<div class="form-group">
							<label>Hostname:</label>
							<input type="text" class="form-control" name="site_host" placeholder="Enter hostname">
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-info">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" href="#collapse_pools">Application Pools</a>
					</h4>
				</div>
				<div id="collapse_pools" class="panel-collapse collapse">
					<div class="panel-body">
						<div class="form-group">
							<label>Pool Name:</label>
							<input type="text" class="form-control" name="pools_name" placeholder="site1 pool1">
						</div>
						<div class="form-group">
							<label>.Net Version:</label><br/>
							<label class="radio-inline">
								<input type="radio" name="pools_net" value="2.0" checked="">2.0
							</label>
							<label class="radio-inline">
								<input type="radio" name="pools_net" value="4.0" checked="checked">4.0
							</label>
						</div>
						<div class="form-group">
							<label>32 Bit Application Support:</label><br/>
							<label class="radio-inline">
								<input type="radio" name="pools_bit" value="Yes" checked="">Yes
							</label>
							<label class="radio-inline">
								<input type="radio" name="pools_bit" value="No" checked="checked">No
							</label>
						</div>
						<div class="row" id="add_pool_wrapper">
							<div class="col-md-4"></div>
							<div class="col-md-4">
								<button id="add_pool" type="button" class="btn btn-info btn-sm btn-block">Add App Pool</button>
							</div>
							<div class="col-md-4"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-info" style="display:none">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" href="#collapse_dirs">Virtual Directories</a>
					</h4>
				</div>
				<div id="collapse_dirs" class="panel-collapse collapse">
					<div class="panel-body">
						<div class="form-group">
							<label>Directory Name:</label>
							<input type="text" class="form-control" name="dir_name" placeholder="Enter directory name">
						</div>
						<div class="form-group">
							<label>Directory Path:</label>
							<input type="text" class="form-control" name="dir_path" placeholder="site_name\dir_name">
						</div>
						<div class="row" id="add_dir_wrapper">
							<div class="col-md-4"></div>
							<div class="col-md-4">
								<button id="add_dir" type="button" class="btn btn-info btn-sm btn-block">Add Virtual Directory</button>
							</div>
							<div class="col-md-4"></div>
						</div>
					</div>
				</div>
			</div>		
			<div class="panel panel-info" id="site_apps_wrapper" style="display:none">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" href="#collapse_apps">Applications</a>
					</h4>
				</div>
				<div id="collapse_apps" class="panel-collapse collapse">
					<div class="panel-body">
						<div class="form-group">
							<label>Application Path (URL to app):</label>
							<input type="text" class="form-control" name="app_dest" placeholder="Enter destination relative to site as root">
						</div>
						<div class="form-group">
							<label>Application Repository:</label>
							<input type="url" class="form-control" name="app_repo" placeholder="Enter repository URL">
						</div>
						<div class="form-group">
							<label>Repository Branch:</label>
							<input type="text" class="form-control" name="app_branch" placeholder="Enter branch name">
						</div>
            <div class="form-group" id="pool_select_wrapper">
            </div>
						<div class="row" id="add_app_wrapper">
							<div class="col-md-4"></div>
							<div class="col-md-4">
								<button id="add_app" type="button" class="btn btn-info btn-sm btn-block">Add Application</button>
							</div>
							<div class="col-md-4"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-2"></div>
	<div id="add_site_wrapper" class="row">
		<div class="col-md-4"></div>
		<div class="col-md-2">
			<button id="add_site_button" type="button" class="btn btn-info btn-sm btn-block">Add Site</button>				
		</div>
		<div class="col-md-2">
			<input id="submit" type="submit" class="btn btn-info btn-sm btn-block" value="Submit" />
		</div>
		<div class="col-md-4"></div>
	</div>
</div>
<br />