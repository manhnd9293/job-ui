docker context use default
docker build -t job-ui .
docker tag job-ui manhndtest/job-ui
docker push manhndtest/job-ui