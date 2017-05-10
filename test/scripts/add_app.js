// Adds apps to the section when Add Virtual Directory is clicked
$(document).ready(function() {
	var add_button = $("#add_app");
	var wrapper = $("#add_app_wrapper");
	
	$(add_button).click(function(e) {
		e.preventDefault();
		
		// Retrieve values from app form
		var app_dest = $('input[name="app_dest"]').val();
		var app_repo = $('input[name="app_repo"]').val();
		var app_branch = $('input[name="app_branch"]').val();
    var app_pool = $("select option:selected").val();
    var app_name = app_dest.split("/").pop();
			
		// Don't allow unnamed apps
		if (app_dest == "" || app_repo == "" || app_branch == "")
			return;

		// Reset the data to default state for input part of form
		$('input[name="app_dest"]').val($('input[name="site_host"]').val());
		$('input[name="app_repo"]').val("");
		$('input[name="app_branch"]').val("");
    $('select').prop("selected", false);
		
		// If the panel group that holds the apps does not exist, create inner wrapper and section title
		if ($("#apps_title").length == 0) {
			
			// Add header and inner wrapper to the apps section
			$(wrapper).after(`
			<hr />
			<div class="row" id="apps_title">
				<div class="col-md-2"></div>
				<div class="col-md-8">
					<h4 class="text-info text-center"><strong>Apps</strong></h4>
				</div>
				<div class="col-md-2"></div>
			</div>
			<div class="panel-group" id="apps_wrapper">
			</div>
			`);
		}
		
		// Append the new app to the inner wrapper
		$("#apps_wrapper").append(`
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4 class="panel-title text-center">
					<a data-toggle="collapse" href="#app_${app_name}"><strong>${app_name}</strong></a>
				</h4>
			</div>
			<div id="app_${app_name}" class="panel-collapse collapse">
				<div class="panel-body">
					<div class="panel-group">
						<div class="panel-body">
							<div class="form-group">
								<label>Application Path:</label>
								<input type="text" class="form-control" name="app_${app_name}_dest" value="${app_dest}" readonly>
							</div>
							<div class="form-group">
								<label>Application Repository:</label>
								<input type="url" class="form-control" name="app_${app_name}_repo" value="${app_repo}" readonly>
							</div>
							<div class="form-group">
								<label>Repository Branch:</label>
								<input type="text" class="form-control" name="app_${app_name}_branch" value="${app_branch}" readonly>
							</div>
              <div class="form-group">
                <label>Application Pool:</label>
                <input type="text" class="form-control" name="app_${app_name}_pool" value="${app_pool}" readonly>
              </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`);
	});	
});