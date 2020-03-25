echo 'Beginning deployment of Agriworks frontend'
yarn build
echo 'Copying build to remote server...'
scp -i $HOME/.ssh/agriworks -r ../dist/ ubuntu@ec2-18-216-197-71.us-east-2.compute.amazonaws.com:/home/ubuntu
echo 'Copy complete.'
echo 'Restarting remote server...'
ssh -i $HOME/.ssh/agriworks ubuntu@ec2-18-216-197-71.us-east-2.compute.amazonaws.com 'bash' < restartRemoteServer.sh
echo 'Deployment complete.'
