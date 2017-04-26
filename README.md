**Please be sure to remove this README before merging with the master branch to keep from overwritting the project documentation.**

# Ansible IIS Sites for Tower
Ansible Tower appears to have some differences from open source Ansible. Some modules may not be supported, or take different parameters. This branch should explore how to adapt the working solution in the master branch to accommodate the quirks of Tower.

## Changes for Tower
1. win_path seems to not be supported ---> Temporary solution added until win_path support is added
2. win_chocolately accepts present or absent only ---> Updated to reflect this
3. win_iis_apppool does not seem to accept managedPipelineMode ---> Ignored for now as it defaults to Integrated by default

## TODO
1. Continue optimizing for Tower
2. Determine what vars can be passed at runtime as a set of extra variables
3. Integrate with Cloud Forms to create a deployable service
4. Expand Tower specific documentation

## The Tower Interface
Tower provides a GUI frontend for managing Ansible playbooks, inventories, and jobs. In doing so they introduce a new interface for declaring these things that needs to be adhered to in order for Ansible playbooks to run on the Tower platform. These can be broken into essentially four separate categories.

### Projects
The projects tab is where we define the source for our Ansible playbooks. Currently, the source for this project is at `git@code.kent.edu:IE/Ansible-IIS-Sites.git` and the dev branch is being pulled in particular. Correct credentials must also be passed to contact the repo.

### Inventory
Inventory is where we define information such as the hosts to contact and global variables our playbook relies upon. For example, in this project we keep the addresses for the Windows servers we want to contact and winrm variables exist as group vars.

### Credentials
Credentials are used for a variety of things in Tower, but perhaps most obviously their use is in connecting to our remote nodes. We can set up credentials for a vareity of scenarios and pass them to a job template to allow Ansible access to remote servers. 

### Job Templates
These are where we the command line argument essentially. Job templates require an inventory, a set of credentials, the type of job, and the playbook to be executed. These basically boil down to `ansible-playbook -i hosts playbook.yml` like would be found with open source Ansible. It's important to note that job templates are where extra variables can be defined. These may be what allows for extremely generic playbooks that can used as deployable services once wired in to Cloud Forms, but that remains to be seen.

### Jobs
This section provides runtime information from job templates that have been run. They provide detailed information about each task that runs as part of a playbook and can be reviewed to troubleshoot existing playbooks. 

## How It Works
As the intention is to make IIS web servers and sites a deployable service, all user dictated parameters have been parameterized. These are passed as extra variables, either directly or as a JSON/YAML file, at runtime. They dictate what actually gets built on the remote server. In this way all of the logic is obscured from users, making it hopefully easy to implement new sites. When this eventually gets paired with AWS deployments additional parameters will need to be passed to this template such as the IP to contact and machine credentials. These can be solved later though.

To run the playbook, simply choose the [job template](https://tower.uis.kent.edu/#/templates/job_template/16) and pass in the desired parameters as extra variables. If we have acces to a Tower-cli we could also pass in a file as the extra parameters, but I've not seen a way to do that from the GUI interface yet.

**NOTE:** The above assumes the system you're trying to connect to has already been prepared as described [here](http://docs.ansible.com/ansible/intro_windows.html#windows-system-prep). Feel free to test with a different inventory and set of machine credentials if you like. I can also provide the credentials for the machine I've been using if anyone wants to use it.

### Extra Vars
Below is the template file along with an example two websites. This hopefully is fairly straightforward, but I can add more explanation to each part if necessary. 
```yaml
# Define web server configuration here
# This includes sites, their apps, pools, and virtual directories
#
# sites 
#   * Contains an array of sites, each site is denoted by a "-" nested under the sites object
#   * Each site contains site information (name, path, host_name, etc.) as well as a list of virtual directories, app pools, and apps
#   * The site_path should always be identified relative to the root path for the webserver. In other words, do not remove the {{ root_path }} part
#   * Site names should be unique
#
# pools
#   * Pools are needed to run the apps on a site. They define things like the .NET version and 32bit compatibility. 
#   * Pool names should always follow the convention (site_name pool_name). This is to avoid conflicting pools if other websites are on the server
#   * attributes are key/value pairs delimited by "|". This convention must be followed
#  
# virtual_dirs
#   * These are your nested directories. For example, if you want a site at site1.example.com/dir1/app1, dir1 needs to be defined as a virtual directory. This is an IIS limitation and currently unavoidable.
#   * Virtual directory names must be unique if they are at the same level relative to the root directory. 
#   * Virtual directory paths should be relative to the root path. In other words they should {{ root_path }}\site_name\dir_name
#   * If your virtual directory is nested deeper than one level (i.e. site1.example.com/dir1/dir2/app2), be sure to include the full path in the dir_path section
#
# apps
#   * App names must be unique if they are at the same level relative to the root directory
#   * App destinations are relative to their site. Thus, a top level app destination will just be its name. Any nested app must include the virtual directories it's under
#   * Repository information should be straightforward, but provide the overall repo as well as the branch you wish to deploy
#   * top_level should be true if the app is directly under the site (i.e. site1/app1). If the app is nested, then top_level should be false
#
# Format is as follows...
#
# sites:
#   - site_name: site1
#     site_path: '{{ root_path }}\site1'   # Leave this for each site
#     ip_addr: 127.0.0.1
#     port_no: 80
#     host_name: site1.example.com
#     pools:
#       - pool_name: 'site1 some_identifier_if_desired'
#         attributes: 'managedRuntimeVersion:v2.0|enable32BitAppOnWin64:True'
#       - pool_name: 'site1 some_identifier_if_desired'
#         attributes: 'managedRuntimeVersion:v4.0|enable32BitAppOnWin64:False'
#     virtual_dirs:
#       - dir_name: dir1
#         dir_path: '{{ root_path }}\site1\dir1'   # Path assuming site it root
#       - dir_name: dir2
#         dir_path: '{{ root_path }}\site1\dir2'
#     apps:
#       - app_name: app1
#         app_dest: 'app1'
#         app_pool: 'a_pool_name_from_above'
#         app_repo: url_to_repo
#         app_branch: repo_branch
#         top_level: true   # True if app is at top level
#       - app_name: app2
#         app_dest: 'dir1\app2'   # Nested directory
#         app_pool: 'a_pool_name_from_above'
#         app_repo: url_to_repo
#         app_branch: repo_branch
#         top_level: false   # False since app is nested in virtual directory
#   - site_name: site2
#     ... (the rest of the site information follows)
#
# Add user configuration below following the above structure

sites:
  - site_name: site1
    site_path: '{{ root_path }}\site1'
    ip_addr: 127.0.0.1
    port_no: 80
    host_name: site1.example.com
    pools:
      - pool_name: 'site1 (.Net 2.0 - 32bit)'
        pool_attributes: 'managedRuntimeVersion:v2.0|enable32BitAppOnWin64:True'
      - pool_name: 'site1 (.Net 4.0 - 64bit)'
        pool_attributes: 'managedRuntimeVersion:v4.0|enable32BitAppOnWin64:False'
    virtual_dirs:
      - dir_name: dir1
        dir_path: '{{ root_path }}\site1\dir1'
    apps:
      - app_name: app1
        app_dest: app1
        app_pool: 'site1 (.Net 4.0 - 64bit)'
        app_repo: https://github.com/IBM/ibm.github.io.git
        app_branch: master
        top_level: true
      - app_name: app2
        app_dest: dir1\app2 
        app_pool: 'site1 (.Net 4.0 - 64bit)'
        app_repo: https://github.com/twitter/twitter.github.com.git
        app_branch: master
        top_level: false
  - site_name: site2
    site_path: '{{ root_path }}\site2'
    ip_addr: 127.0.0.1
    port_no: 80
    host_name: site2.example.com
    pools:
      - pool_name: 'site2 (.Net 2.0 - 32bit)'
        pool_attributes: 'managedRuntimeVersion:v2.0|enable32BitAppOnWin64:True'
      - pool_name: 'site2 (.Net 4.0 - 64bit)'
        pool_attributes: 'managedRuntimeVersion:v4.0|enable32BitAppOnWin64:False'
    virtual_dirs:
      - dir_name: dir1
        dir_path: '{{ root_path }}\site2\dir1'
    apps:
      - app_name: app1
        app_dest: app1
        app_pool: 'site2 (.Net 4.0 - 64bit)'
        app_repo: https://github.com/IBM/ibm.github.io.git
        app_branch: master
        top_level: true
      - app_name: app2
        app_dest: dir1\app2 
        app_pool: 'site2 (.Net 4.0 - 64bit)'
        app_repo: https://github.com/twitter/twitter.github.com.git
        app_branch: master
        top_level: false


```