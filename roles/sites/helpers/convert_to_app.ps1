# Helper to convert nested virtual directories into apps with pool for IIS

[CmdletBinding()]
Param(
    [Parameter(Mandatory=$True,Position=1)]
        [string]$virtual_path,
    [Parameter(Mandatory=$True,Position=2)]
        [string]$app_pool
)

Import-Module WebAdministration

ConvertTo-WebApplication -PSPath $virtual_path -ApplicationPool $app_pool

