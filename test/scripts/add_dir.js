// Adds virtual directories to the section when Add Virtual Directory is clicked
$(document).ready(function() {
	var add_button = $("#add_dir");
	var wrapper = $("#add_dir_wrapper");
	
	$(add_button).click(function(e) {
		e.preventDefault();
		
		// Retrieve values from dirs form
		var dir_name = $('input[name="dir_name"]').val();
		var dir_path = $('input[name="dir_path"]').val();
		
		// Don't allow unnamed dirs
		if (dir_name == "" || dir_path == "")
			return;

		// Reset the data to default state for input part of form
		$('input[name="dir_name"]').val("");
		$('input[name="dir_path"]').val("");
		
		// If the panel group that holds th dirs does not exist, create inner wrapper and section title
		if ($("#dirs_title").length == 0) {
			
			// Add header and inner wrapper to the application pools section
			$(wrapper).after(`
			<hr />
			<div class="row" id="dirs_title">
				<div class="col-md-2"></div>
				<div class="col-md-8">
					<h4 class="text-info text-center"><strong>Directories</strong></h4>
				</div>
				<div class="col-md-2"></div>
			</div>
			<div class="panel-group" id="dirs_wrapper">
			</div>
			`);
		}
		
		// Append the new pool to the inner wrapper
		$("#dirs_wrapper").append(`
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4 class="panel-title text-center">
					<a data-toggle="collapse" href="#dir_${dir_name}"><strong>${dir_name}</strong></a>
				</h4>
			</div>
			<div id="dir_${dir_name}" class="panel-collapse collapse">
				<div class="panel-body">
					<div class="panel-group">
						<div class="panel-body">
							<div class="form-group">
								<label>Directory Name:</label>
								<input type="text" class="form-control" name="dir_${dir_name}_name" value="${dir_name}" readonly>
							</div>
							<div class="form-group">
								<label>Directory Path:</label>
								<input type="text" class="form-control" name="dir_${dir_name}_path" value="${dir_path}" readonly>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`);
	});	
});