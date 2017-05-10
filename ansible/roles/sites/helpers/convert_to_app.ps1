# Helper to convert nested virtual directories into apps with pool for IIS

[CmdletBinding()]
Param(
    [Parameter(Mandatory=$True,Position=1)]
        [string]$site_name,
    [Parameter(Mandatory=$True,Position=2)]
        [string]$physical_path,
    [Parameter(Mandatory=$True,Position=3)]
        [string]$app_pool
)

Import-Module WebAdministration

$tmp = Get-WebApplication -Site $site_name -name $physical_path.Replace('\','/')

if ($tmp -eq $null) { 
    ConvertTo-WebApplication -PSPath IIS:\Sites\$site_name\$physical_path -ApplicationPool $app_pool 
}