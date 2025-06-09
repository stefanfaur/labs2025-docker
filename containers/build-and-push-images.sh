
# go to the root of the backend containing the Dockerfile
cd ../backend
# build the image locally and tag as latest
docker build -t sfaur/labs-pizza-backend:latest .
# push the image to Docker Hub so accessible from anywhere
docker push sfaur/labs-pizza-backend:latest

# do the same for the frontend
cd ../frontend
docker build -t sfaur/labs-pizza-frontend:latest .
docker push sfaur/labs-pizza-frontend:latest
