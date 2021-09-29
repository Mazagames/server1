if [ $DEPLOY_ENV == "not_defined" ] || [ $SERVICE_NAME == "not_defined" ] || [ $PORT == "not_defined" ]; then
  echo "Container failed to start, pls check env variables DEPLOY_ENV, SERVICE_NAME, PORT"
  exit 1
fi

exec "$@"
