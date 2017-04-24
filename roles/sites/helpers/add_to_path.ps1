# Idempotently add something to the machine path
[CmdletBinding()]
Param(
    [Parameter(Mandatory=$True,Position=1)]
        [string]$path_to_add
)

$current_path = [Environment]::GetEnvironmentVariable("PATH","Machine")

if (!($current_path.Contains($path_to_add))) {
    $current_path = [Environment]::GetEnvironmentVariable("PATH","Machine")
       
    if ($current_path[$current_path.Length - 1] -eq ";") {
        $new_path = $current_path + $path_to_add
        [Environment]::SetEnvironmentVariable("PATH",$new_path, "Machine")
    }

    else {
        $new_path = $current_path + ";" + $path_to_add
        [Environment]::SetEnvironmentVariable("PATH",$new_path, "Machine")
    }
}