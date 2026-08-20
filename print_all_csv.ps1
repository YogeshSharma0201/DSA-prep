$lines = Get-Content fraz_sheet.csv
$structured = @()
$currentTopic = ""
$currentSubtopic = ""
$currentDiff = ""

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i].Trim()
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    if ($line -match '^,DSA Sheet' -or $line -match '^,CHECKOUT' -or $line -match '^,HOW TO' -or $line -match '^,JOIN TELEGRAM') { continue }
    
    # Check if this line is a topic header
    # e.g. ",Arrays,Editorials " or ",RECURSION," or ",DYNAMIC PROGRAMING," or ",STRINGS," etc.
    Write-Host ("Line {0:D3}: {1}" -f $i, $line)
}
