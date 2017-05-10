// Adds app pools to the Application Pools section when Add App Pool button is clicked
$(document).ready(function() {
	var add_button = $("#add_pool");
	var wrapper = $("#add_pool_wrapper");
	
	$(add_button).click(function(e) {
		e.preventDefault();
		
		// Retrieve values from pools form
		var pool_name = $('input[name="pools_name"]').val();
		var pool_net = $('input[name="pools_net"]:checked').val();
		var pool_bit = $('input[name="pools_bit"]:checked').val();		
		var safe_pool_name = pool_name.replace(/ /g,"_");
		
		// Don't allow unnamed pools
		if (pool_name == "")
			return;
		
		if ($('[name="site_name"]').val() == "")
			return;
		
		// Add check for unique pool names here
		
		// Reset the data to default state for input part of form
		$('input[name="pools_name"]').val("");
		$('input[name="pools_net"][value="4.0"]').prop("checked", true);
		$('input[name="pools_bit"][value="No"]').prop("checked", true);
		
		// If the panel group that holds the pools does not exist, create inner wrapper and section title
		if ($("#pools_title").length == 0) {
      
      // Display the apps panel when first pool is created
      showAppsPanel($('input[name="site_host"]').val());
			
			// Add header and inner wrapper to the application pools section
			$(wrapper).after(`
			<hr />
			<div class="row" id="pools_title">
				<div class="col-md-2"></div>
				<div class="col-md-8">
					<h4 class="text-info text-center"><strong>Pools</strong></h4>
				</div>
				<div class="col-md-2"></div>
			</div>
			<div class="panel-group" id="pools_wrapper">
			</div>
			`);
		}
		
		// Append the new pool to the inner wrapper
		$("#pools_wrapper").append(`
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4 class="panel-title text-center">
					<a data-toggle="collapse" href="#pool_${safe_pool_name}"><strong>${pool_name}</strong></a>
				</h4>
			</div>
			<div id="pool_${safe_pool_name}" class="panel-collapse collapse">
				<div class="panel-body">
					<div class="panel-group">
						<div class="panel-body">
							<div class="form-group">
								<label>Pool Name:</label>
								<input type="text" class="form-control" name="pool_${safe_pool_name}_name" value="${pool_name}" readonly>
							</div>
							<div class="form-group">
								<label>.Net Version:</label><br/>
								<label class="radio-inline">
									<input type="radio" name="pool_${safe_pool_name}_net" value="2.0">2.0
								</label>
								<label class="radio-inline">
									<input type="radio" name="pool_${safe_pool_name}_net" value="4.0">4.0
								</label>
							</div>
							<div class="form-group">
								<label>32 Bit Application Support:</label><br/>
								<label class="radio-inline">
									<input type="radio" name="pool_${safe_pool_name}_bit" value="Yes">Yes
								</label>
								<label class="radio-inline">
									<input type="radio" name="pool_${safe_pool_name}_bit" value="No">No
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`);
		
		// Adjust the checkboxes for the new pool correctly
		if (pool_net == "4.0") {
			$(`input[name="pool_${safe_pool_name}_net"][value="4.0"]`).prop("checked", true);
      $(`input[name="pool_${safe_pool_name}_net"][value="2.0"]`).prop("disabled", true);
    }
		else {
			$(`input[name="pool_${safe_pool_name}_net"][value="2.0"]`).prop("checked", true);
      $(`input[name="pool_${safe_pool_name}_net"][value="4.0"]`).prop("disabled", true);
		}
    
		if (pool_bit == "No") {
			$(`input[name="pool_${safe_pool_name}_bit"][value="No"]`).prop("checked", true);
      $(`input[name="pool_${safe_pool_name}_bit"][value="Yes"]`).prop("disabled", true);
    }
		else {
			$(`input[name="pool_${safe_pool_name}_bit"][value="Yes"]`).prop("checked", true);
      $(`input[name="pool_${safe_pool_name}_bit"][value="No"]`).prop("disabled", true);
    }
    
    // Add the pool as a select option
    build_pool_select(pool_name);
	});	
});

// Will be used to add the pool to the add app select dropdown menu
function build_pool_select(name) {
  // Create the select item
  if ($("select").length == 0) {
    $("#pool_select_wrapper").append(`<label>Application Pool:</label><select class="form-control" name="pool_select"></select>`);
  }
  
  // Add a pool to the select statement
  $("select").append(`<option value="${name}">${name}</option>`);
}

// Display apps panel and grab hostname as part of 
function showAppsPanel(name) {
  $("#site_apps_wrapper").show(); 
  $('input[name="app_dest"]').val(`${name}/`);
}
