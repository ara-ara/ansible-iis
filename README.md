**Please be sure to remove this README before merging with the master branch to keep from overwritting the project documentation.**

# Ansible IIS Sites for Tower
Ansible Tower appears to have some differences from open source Ansible. Some modules may not be supported, or take different parameters. This branch should explore how to adapt the working solution in the master branch to accommodate the quirks of Tower.

## Changes for Tower
1. win_path seems to not be supported
2. win_chocolately accepts present or absent only
3. win_iis_apppool does not seem to accept managedPipelineMode. Ignored for now as it defaults to Integrated by default

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
