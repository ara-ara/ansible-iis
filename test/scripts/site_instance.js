// Contains a single site, which is saved each time Add Site is clicked
$(document).ready(function() {
  var Sites = [];   // Will hold an array of site objects
	
	$("#add_site_button").click(function(e) {
		e.preventDefault();
    
    var current_site = new Site();	// will hold the current site until it is reset on submission
		
		// Get site specific information
		current_site.name = $('input[name="site_name"]').val();
		current_site.ip = $('input[name="site_ip"]').val();
		current_site.port = $('input[name="site_port"]').val();
		current_site.host = $('input[name="site_host"]').val();
    
    // Gather site information
    getPools(current_site);
    getDirs(current_site);
    getApps(current_site);
    
    console.log(current_site);
    
    // Add to the existing sites panel
    buildSitesPanel(current_site);
    
    // Add site to the array of sites
    Sites.push(current_site);
    
    // Clean up the form so it is blank for next added site
    cleanForm();
    
		// Reset the current site to hold new information
		current_site = new Site();
	});
  
  $("form").submit(function(e) {
    e.preventDefault();
  
    // Convert JS object to JSON
    var post_data = JSON.stringify(Sites);
    
    // Post the JSON object as sites. Needs to be decoded serverside
    if (Sites.length > 0) {
      $.ajax({
        type: "POST",
        url: "handlers/process_sites_info.php",
        data: { sites: post_data },
        success: function(data) { console.log(data); },
        error: function() { console.log("failed"); },
        dataType: "text"
      });
    }
  }); 
});