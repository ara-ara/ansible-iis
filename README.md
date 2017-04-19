**Please be sure to remove this README before merging with the master branch to keep from overwritting the project documentation.**

# Ansible IIS Sites for Tower
Ansible Tower appears to have some differences from open source Ansible. Some modules may not be supported, or take different parameters. This branch should explore how to adapt the working solution in the master branch to accommodate the quirks of Tower.

## Changes for Tower
1. win_path seems to not be supported
2. win_chocolately accepts present or absent only
3. win_iis_apppool does not seem to accept managedPipelineMode. Ignored for now as it defaults to Integrated by default