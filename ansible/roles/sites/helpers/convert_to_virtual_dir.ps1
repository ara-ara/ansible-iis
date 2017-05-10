# Helper script to set up virtual directories correctly in IIS
# Ansible does not allow passing of path to win_iis_virtualdirectory
# Thus this is necessary

[CmdletBinding()]
Param(
    [Parameter(Mandatory=$True,Position=1)]
        [string]$site_name,
    [Parameter(Mandatory=$True,Position=2)]
        [string]$dir_path,
    [Parameter(Mandatory=$True,Position=3)]
        [string]$dir_name
)

Import-Module WebAdministration


# Retrive relative site path
[System.Collections.ArrayList] $site_path_array = $dir_path.Split("\")
$index = $site_path_array.IndexOf($site_name)
$site_path_array.RemoveRange(0, $index)
$site_path_array.RemoveAt($site_path_array.Count - 1)
$site_path = $site_path_array -join "/"

# Convert Directory to Virtual Directory
New-WebVirtualDirectory -Site $site_path -Name $dir_name -PhysicalPath $dir_path -Force
