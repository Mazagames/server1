set -e
function ensure_success {
        return_status="$1"
        error_message="$2"
        if [ "$return_status" -ne 0  ];then
                echo "$error_message"
                exit
        fi  
}

yarn install --production=false --force --frozen-lockfile
ensure_success "$?" "error installing npms"

yarn build
ensure_success "$?" "error in build"
