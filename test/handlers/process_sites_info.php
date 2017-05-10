<?php 
	
  function addSpaces($depth) { 
    $i = 0;
    $res = "";
    while ($i < $depth) { 
      $res .= " "; 
      ++$i;
    }
    return $res;
  }
  
  function writeSiteInfo($site, $depth, $out_file) {
    
    // Basic Site Info
    $line = "  - site_name: " . $site->name . "\n" . addSpaces($depth);
    $line .= "site_path: '{{ root_path }}\\" . $site->name . "'\n" . addSpaces($depth);
    $line .= "ip_addr: " . $site->ip . "\n" . addSpaces($depth);
    $line .= "port_no: " . $site->port . "\n" . addSpaces($depth);
    $line .= "host_name: " . $site->host . "\n";
    fwrite($out_file, $line);
    
    // Get Pools
    writePoolInfo($site, $depth, $out_file);
    
    // Get Dirs
    writeDirInfo($site, $depth, $out_file);
    
    // Get Apps
    writeAppInfo($site, $depth, $out_file);
  }
  
  function writePoolInfo($site, $depth, $out_file) {
    $line = addSpaces($depth) . "pools:\n";
    fwrite($out_file, $line);
    foreach($site->pools as $pool) {
      $bit = ($pool->bit == "Yes" ? "True" : "False");
      $line = addSpaces($depth + 2) . "- pool_name: '" . $pool->name . "'\n" . addSpaces($depth + 4);
      $line .= "pool_attributes: 'managedRuntimeVersion:v" . $pool->net . "|enable32BitAppOnWin54:";
      $line .= ($pool->bit == "No" ? "False" : "True");
      $line .= "'\n";
      fwrite($out_file, $line);
    }
  }
  
  function writeDirInfo($site, $depth, $out_file) {
    $line = addSpaces($depth) . "virtual_dirs:\n";
    fwrite($out_file, $line);
    foreach($site->dirs as $dir) {
      $line = addSpaces($depth + 2) . "- dir_name: " . $dir->name . "\n" . addSpaces($depth + 4);
      $line .= "dir_path: '{{ root_path }}\\" . $site->name . "\\" . $dir->path ."'\n";
      fwrite($out_file, $line);
    }
  }
  
  function writeAppInfo($site, $depth, $out_file) {
    $line = addSpaces($depth) . "apps:\n";
    fwrite($out_file, $line);
    foreach($site->apps as $app) {
      $line = addSpaces($depth + 2) . "- app_name: " . $app->name . "\n" . addSpaces($depth + 4);
      $line .= "app_dest: " . $app->dest . "\n" . addSpaces($depth + 4);
      $line .= "app_repo: " . $app->repo . "\n" . addSpaces($depth + 4);
      $line .= "app_branch: " . $app->branch . "\n" . addSpaces($depth + 4);
      $line .= "app_pool: '" . $app->pool . "'\n" . addSpaces($depth + 4);
      $line .= (strpos($app->dest, "\\") == false ? "top_level: true" : "top_level: false");
      $line .= "\n";
      fwrite($out_file, $line);
    }
  }
  
	// Currently just going to write to one file rather than a separate file for each request
	
	if (isset($_POST['sites']) && !empty($_POST['sites'])) {
		$json = $_POST['sites'];
   
		// Decode our JSON object
		$sites = json_decode($json);
    if (file_exists("../results/extra_vars.yml")) {
	unlink("../results/extra_vars.yml"); // Clear the previous file to ensure no conflicts
	}
		$out_file = fopen("../results/extra_vars.yml", "wb") or die("Unable to create/write to file");
    $depth = 4;
    
    fwrite($out_file, "sites:\n");
    
    foreach($sites as $site) {
      writeSiteInfo($site, $depth, $out_file);
    }
    
    // Pass our extra vars to Ansible    
    
    printf("success");
	

	$command = 'sudo /usr/local/bin/ansible-playbook -i ../../Ansible-IIS-Sites/hosts ../../Ansible-IIS-Sites/main.yml --extra-vars "@../results/extra_vars.yml"';
	shell_exec(sprintf('%s > ../results/output 2>&1 &', $command));

    fclose($out_file);

	} 
?>
