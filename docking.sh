sudo docker kill VSB
sudo docker rm VSB
sudo docker rmi VSB
sudo docker build -t VSB .
sudo docker run -d -p 6969:8000 --name VSB VSB