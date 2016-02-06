#!/usr/bin/env bash
# HOW TO USE
# Save code to file
# Run as "SCRIPT_FILE_NAME SASS_DIRECTORY"
# e.g "./find_unused_variables.sh ./sass"
 
VAR_NAME_CHARS='A-Za-z0-9_-'

find "./src/less" -type f -name "*.less" ! -name "bootstrap-variables.less" -exec grep -o "\@[$VAR_NAME_CHARS]*" {} ';' | sort | uniq -u