# Idempotently add something to the machine path
[CmdletBinding()]
Param(
    [Parameter(Mandatory=$True,Position=1)]
        [string]$path_to_add
)


$res = echo %path% | find /C /I "C:\Program Files\Git\cmd"

if ($res -eq 0) {
    $current_path = [Environment]::GetEnvironmentVariable("PATH","Machine")
    [Environment]::SetEnvironmentVariable("PATH","$current_path;$path_to_add", "Machine")
}