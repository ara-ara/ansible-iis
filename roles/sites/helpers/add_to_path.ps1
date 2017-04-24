# Idempotently add something to the machine path
[CmdletBinding()]
Param(
    [Parameter(Mandatory=$True,Position=1)]
        [string]$path_to_add
)

$res = cmd.exe /c echo %path% | find /C /I `"$path_to_add`"

if ($res -eq 0) {
    $current_path = [Environment]::GetEnvironmentVariable("PATH","Machine")
   
    if ($current_path[$current_path.Length - 1] -eq ";") {
        [Environment]::SetEnvironmentVariable("PATH","$current_path$path_to_add", "Machine")
    }

    else {
        [Environment]::SetEnvironmentVariable("PATH","$current_path;$path_to_add", "Machine")
    }
}