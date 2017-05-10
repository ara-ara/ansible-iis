<?php 


?>

<!DOCTYPE html>
<html lang="en-US">
<head>
	<title>Get Site Information</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container">
		<form action="/create_function.php" method="post">
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
									<input type="text" class="form-control" name="site[name]" placeholder="Enter site name">
								</div>
								<div class="form-group">
									<label>IP Address to access site:</label>
									<input type="text" class="form-control" name="site[ip]" placeholder="Enter ip address (leave blank for any)">
								</div>
								<div class="form-group">
									<label>Port to access site by:</label>
									<input type="text" class="form-control" name="site[port]" placeholder="Enter port number (leave blank for default 80)">
								</div>
								<div class="form-group">
									<label>Hostname:</label>
									<input type="text" class="form-control" name="site[host]" placeholder="Enter hostname">
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
									<input type="text" class="form-control" name="site[pools][name]" placeholder="site_name pool_name">
								</div>
								<div class="form-group">
									<label>.Net Version:</label><br/>
									<label class="radio-inline">
										<input type="radio" name="site[pools][net]" value="2.0">2.0
									</label>
									<label class="radio-inline">
										<input type="radio" name="site[pools][net]" value="4.0" checked>4.0
									</label>
								</div>
								<div class="form-group">
									<label>32 Bit Application Support:</label><br/>
									<label class="radio-inline">
										<input type="radio" name="site[pools][bit]" value="Yes">Yes
									</label>
									<label class="radio-inline">
										<input type="radio" name="site[pools][bit]" value="No" checked>No
									</label>
								</div>
								<div class="row" id="add_pool_wrapper">
									<div class="col-md-4"></div>
									<div class="col-md-4">
										<button id="add_pool" type="button" class="btn btn-info btn-sm btn-block">Add App Pool</button>
									</div>
									<div class="col-md-4"></div>
								</div>
								<hr />
								<div class="row">
									<div class="col-md-2"></div>
									<div class="col-md-8">
										<h4 class="text-info text-center"><strong>Pools</strong></h4>
									</div>
									<div class="col-md-2"></div>
								</div>	
								<div class="panel-group">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title text-center">
												<a data-toggle="collapse" href="#collapse_pools_pool1"><strong>Pool 1</strong></a>
											</h4>
										</div>
										<div id="collapse_pools_pool1" class="panel-collapse collapse">
											<div class="panel-body">
												<div class="panel-group">
													<div class="panel-body">
														<div class="form-group">
															<label>Pool Name:</label>
															<input type="text" class="form-control" name="site[pools][name]" placeholder="site_name pool_name">
														</div>
														<div class="form-group">
															<label>.Net Version:</label><br/>
															<label class="radio-inline">
																<input type="radio" name="site[pools][net]" value="2.0">2.0
															</label>
															<label class="radio-inline">
																<input type="radio" name="site[pools][net]" value="4.0" checked>4.0
															</label>
														</div>
														<div class="form-group">
															<label>32 Bit Application Support:</label><br/>
															<label class="radio-inline">
																<input type="radio" name="site[pools][bit]" value="Yes">Yes
															</label>
															<label class="radio-inline">
																<input type="radio" name="site[pools][bit]" value="No" checked>No
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="panel-group">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title text-center">
												<a data-toggle="collapse" href="#collapse_pools_pool1"><strong>Pool 1</strong></a>
											</h4>
										</div>
										<div id="collapse_pools_pool1" class="panel-collapse collapse">
											<div class="panel-body">
												<div class="panel-group">
													<div class="panel-body">
														<div class="form-group">
															<label>Pool Name:</label>
															<input type="text" class="form-control" name="site[pools][name]" placeholder="site_name pool_name">
														</div>
														<div class="form-group">
															<label>.Net Version:</label><br/>
															<label class="radio-inline">
																<input type="radio" name="site[pools][net]" value="2.0">2.0
															</label>
															<label class="radio-inline">
																<input type="radio" name="site[pools][net]" value="4.0" checked>4.0
															</label>
														</div>
														<div class="form-group">
															<label>32 Bit Application Support:</label><br/>
															<label class="radio-inline">
																<input type="radio" name="site[pools][bit]" value="Yes">Yes
															</label>
															<label class="radio-inline">
																<input type="radio" name="site[pools][bit]" value="No" checked>No
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel panel-info">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" href="#collapse_dirs">Virtual Directories</a>
							</h4>
						</div>
						<div id="collapse_dirs" class="panel-collapse collapse">
							<div class="panel-body">
								<div class="form-group">
									<label>Directory Name:</label>
									<input type="text" class="form-control" name="site[dirs][name]" placeholder="Enter directory name">
								</div>
								<div class="form-group">
									<label>Directory Path:</label>
									<input type="text" class="form-control" name="site[dirs][path]" placeholder="site_name\dir_name">
								</div>
								<div class="row">
									<div class="col-md-4"></div>
									<div class="col-md-4">
										<button type="button" class="btn btn-info btn-sm btn-block">Add Virtual Directory</button>
									</div>
									<div class="col-md-4"></div>
								</div>
								<hr />
								<div class="row">
									<div class="col-md-2"></div>
									<div class="col-md-8">
										<h4 class="text-info text-center"><strong>Directories</strong></h4>
									</div>
									<div class="col-md-2"></div>
								</div>	
								<div class="panel-group">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title text-center">
												<a data-toggle="collapse" href="#collapse_dirs_dir1"><strong>Dir 1</strong></a>
											</h4>
										</div>
										<div id="collapse_dirs_dir1" class="panel-collapse collapse">
											<div class="panel-body">
												<div class="panel-group">
													<div class="panel-body">
														<div class="form-group">
															<label>Directory Name:</label>
															<input type="text" class="form-control" name="site[dirs][name]" placeholder="Enter directory name">
														</div>
														<div class="form-group">
															<label>Directory Path:</label>
															<input type="text" class="form-control" name="site[dirs][path]" placeholder="site_name\dir_name">
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>		
					<div class="panel panel-info">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" href="#collapse_apps">Applications</a>
							</h4>
						</div>
						<div id="collapse_apps" class="panel-collapse collapse">
							<div class="panel-body">
								<div class="form-group">
									<label>Application Name:</label>
									<input type="text" class="form-control" name="site[apps][name]" placeholder="Enter app name">
								</div>
								<div class="form-group">
									<label>Application Destination:</label>
									<input type="text" class="form-control" name="site[apps][dest]" placeholder="Enter destination relative to site as root">
								</div>
								<div class="form-group">
									<label>Application Repository:</label>
									<input type="url" class="form-control" name="site[apps][repo]" placeholder="Enter repository URL">
								</div>
								<div class="form-group">
									<label>Repository Branch:</label>
									<input type="text" class="form-control" name="site[apps][branch]" placeholder="Enter branch name">
								</div>
								<div class="row">
									<div class="col-md-4"></div>
									<div class="col-md-4">
										<button type="button" class="btn btn-info btn-sm btn-block">Add Application</button>
									</div>
									<div class="col-md-4"></div>
								</div>
								<hr />
								<div class="row">
									<div class="col-md-2"></div>
									<div class="col-md-8">
										<h4 class="text-info text-center"><strong>Apps</strong></h4>
									</div>
									<div class="col-md-2"></div>
								</div>	
								<div class="panel-group">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h4 class="panel-title text-center">
												<a data-toggle="collapse" href="#collapse_apps_app1"><strong>App 1</strong></a>
											</h4>
										</div>
										<div id="collapse_apps_app1" class="panel-collapse collapse">
											<div class="panel-body">
												<div class="panel-group">
													<div class="panel-body">
														<div class="form-group">
															<label>Application Name:</label>
															<input type="text" class="form-control" name="site[apps][name]" placeholder="Enter app name">
														</div>
														<div class="form-group">
															<label>Application Destination:</label>
															<input type="text" class="form-control" name="site[apps][dest]" placeholder="Enter destination relative to site as root">
														</div>
														<div class="form-group">
															<label>Application Repository:</label>
															<input type="url" class="form-control" name="site[apps][repo]" placeholder="Enter repository URL">
														</div>
														<div class="form-group">
															<label>Repository Branch:</label>
															<input type="text" class="form-control" name="site[apps][branch]" placeholder="Enter branch name">
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2"></div>
		</div>
		<div class="row" id="add_site">
			<div class="col-md-4"></div>
			<div class="col-md-2">
				<button type="button" class="btn btn-info btn-sm btn-block">Add New Site</button>				
			</div>
			<div class="col-md-2">
				<button type="button" class="btn btn-info btn-sm btn-block">Submit</button>
			</div>
			<div class="col-md-4"></div>
		</div>
		</form>
	</div>
</body>
</html>