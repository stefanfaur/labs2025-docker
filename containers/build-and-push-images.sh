
# ------------------------------------------------------------------------------
## USE THIS IF YOU ARE WORKING ON AN ARM64 MACHINE(mostly Apple Silicon Macs)

# create a new builder instance
# this is needed to build multi-arch images
# this makes sure that the images can run on both amd64 architecture
# which we're using on AWS
docker buildx create --name multiarch-builder --use

docker buildx build \
  --platform linux/amd64\
  --tag sfaur/labs-pizza-backend:latest \
  --push \
  ../backend

docker buildx build \
  --platform linux/amd64 \
  --tag sfaur/labs-pizza-frontend:latest \
  --push \
  ../frontend

# ------------------------------------------------------------------------------
## USE THIS IF YOU ARE WORKING ON AN AMD64 MACHINE(pretty much everything else)

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