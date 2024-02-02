sudo docker kill vsb
sudo docker rm vsb
sudo docker rmi vsb
sudo docker build -t vsb .
sudo docker run -d -p 6969:8000 --name vsb vsb